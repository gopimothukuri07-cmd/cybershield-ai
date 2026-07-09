# CyberShield AI - Architecture Document

## High-Level System Architecture

```mermaid
graph TD
    subgraph Client [Frontend (React + Vite)]
        UI[User Interface]
        Globe[3D Globe / Three.js]
        Charts[Recharts Analytics]
        WS_Client[WebSocket Client]
    end

    subgraph Server [Backend (FastAPI)]
        API[REST API Router]
        Auth[JWT Authentication]
        WS_Server[WebSocket Endpoint]
        Sim[Traffic Simulator Background Task]
    end

    subgraph Data [Data Layer]
        PG[(PostgreSQL DB)]
    end

    UI -->|HTTP POST /login| Auth
    UI -->|HTTP GET /api/reports| API
    WS_Client <-->|ws://live| WS_Server
    
    Sim -->|Pushes Event| WS_Server
    Sim -->|Saves Event| PG
    API -->|Queries Stats| PG
    Auth -->|Queries Users| PG
```

## Component Details

### 1. The Traffic Simulator
A Python `asyncio` loop running independently alongside the FastAPI server. It generates mock network traffic dictionaries (containing Source IP, Dest IP, Protocol, Attack Type) and simultaneously commits them to PostgreSQL and broadcasts them via the WebSocket manager.

### 2. The Real-Time Pipeline
We bypass traditional HTTP polling by utilizing WebSockets. The FastAPI `ConnectionManager` maintains a list of active client sockets. When the simulator yields a new event, it is encoded as JSON and fired out to all active clients instantly.

### 3. The 3D Engine
The React frontend utilizes `globe.gl`. As WebSocket events arrive, the React state updates. The `GlobeMap` component watches this state array and computes geographic Arcs connecting the `source_country` coordinates to the `target_country` coordinates, assigning colors based on the `severity` field of the payload.
