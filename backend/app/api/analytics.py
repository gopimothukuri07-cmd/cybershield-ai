from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
import io
import csv
from app.db.database import get_db
from app.models.threat import ThreatEvent
from app.api.auth import get_current_user

router = APIRouter()

@router.get("/statistics")
def get_statistics(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    total_threats = db.query(ThreatEvent).count()
    critical_threats = db.query(ThreatEvent).filter(ThreatEvent.severity == "Critical").count()
    
    # Calculate a simple "AI Threat Level" based on percentage of critical threats
    threat_level = "Low"
    if total_threats > 0:
        critical_ratio = critical_threats / total_threats
        if critical_ratio > 0.2:
            threat_level = "Critical"
        elif critical_ratio > 0.1:
            threat_level = "High"
        elif critical_ratio > 0.05:
            threat_level = "Medium"
            
    return {
        "total_threats": total_threats,
        "critical_threats": critical_threats,
        "system_health": 100 - (critical_threats % 20), # Mock health
        "threat_level": threat_level
    }

@router.get("/top-countries")
def get_top_countries(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    # Group by source country
    top_sources = db.query(
        ThreatEvent.source_country, 
        func.count(ThreatEvent.id).label('count')
    ).group_by(ThreatEvent.source_country).order_by(func.count(ThreatEvent.id).desc()).limit(5).all()
    return [{"country": t.source_country, "count": t.count} for t in top_sources]

@router.get("/reports/csv")
def download_csv_report(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    events = db.query(ThreatEvent).order_by(ThreatEvent.timestamp.desc()).limit(1000).all()
    
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "ID", "Timestamp", "Source IP", "Source Country", 
        "Dest IP", "Dest Country", "Protocol", "Attack Type", 
        "Severity", "Confidence", "Packet Rate"
    ])
    
    for e in events:
        writer.writerow([
            e.id, e.timestamp, e.source_ip, e.source_country,
            e.destination_ip, e.target_country, e.protocol, e.attack_type,
            e.severity, e.confidence, e.packet_rate
        ])
        
    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]), 
        media_type="text/csv", 
        headers={"Content-Disposition": "attachment; filename=threat_report.csv"}
    )

