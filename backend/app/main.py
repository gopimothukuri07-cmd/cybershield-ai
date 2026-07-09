from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
import random
from typing import List
from datetime import datetime

app = FastAPI(
    title="CyberShield AI API",
    description="CyberShield AI - Real-Time DDoS Threat Intelligence",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store for stats (no DB required for standalone run)
threat_store = []

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in list(self.active_connections):
            try:
                await connection.send_text(message)
            except Exception:
                self.active_connections.remove(connection)

manager = ConnectionManager()

@app.get("/")
def read_root():
    return {"status": "ok", "message": "CyberShield AI is Live"}

@app.get("/api/analytics/statistics")
def get_statistics():
    total = len(threat_store)
    critical = sum(1 for e in threat_store if e.get("severity") == "Critical")
    ratio = (critical / total) if total > 0 else 0
    if ratio > 0.2:
        level = "Critical"
    elif ratio > 0.1:
        level = "High"
    elif ratio > 0.05:
        level = "Medium"
    else:
        level = "Low"
    return {
        "total_threats": total,
        "critical_threats": critical,
        "system_health": max(60, 100 - critical % 30),
        "threat_level": level
    }

@app.get("/api/analytics/top-countries")
def get_top_countries():
    from collections import Counter
    counts = Counter(e.get("source_country") for e in threat_store)
    return [{"country": k, "count": v} for k, v in counts.most_common(5)]

@app.websocket("/ws/live")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

async def traffic_simulator():
    countries = ["US", "CN", "RU", "BR", "DE", "IN", "FR", "GB", "CA", "AU", "JP", "KR", "UA", "IR", "NG"]
    attack_types = ["SYN Flood", "UDP Flood", "HTTP GET Flood", "Ping of Death", "Slowloris", "DNS Amplification", "NTP Amplification"]

    while True:
        event = {
            "source_country": random.choice(countries),
            "target_country": random.choice(countries),
            "source_ip": f"{random.randint(1,255)}.{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(1,255)}",
            "destination_ip": f"{random.randint(1,255)}.{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(1,255)}",
            "protocol": random.choice(["TCP", "UDP", "ICMP"]),
            "attack_type": random.choice(attack_types),
            "severity": random.choice(["Low", "Medium", "High", "Critical"]),
            "confidence": random.randint(60, 100),
            "packet_rate": random.randint(1000, 1000000),
            "timestamp": datetime.utcnow().isoformat()
        }
        threat_store.append(event)
        if len(threat_store) > 5000:
            threat_store.pop(0)
        await manager.broadcast(json.dumps(event))
        await asyncio.sleep(random.uniform(0.3, 1.5))

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(traffic_simulator())
