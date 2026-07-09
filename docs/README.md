# CyberShield AI – Real-Time DDoS Threat Intelligence & SOC

## Overview
CyberShield AI is an enterprise-grade, full-stack web application designed for Security Operations Centers (SOC). It provides real-time monitoring, visualization, and AI-driven analytics of network traffic and DDoS attack patterns.

**Note**: This project is intended strictly for cybersecurity monitoring and education. It does not facilitate or assist in cyberattacks. All data used is either simulated or sourced from public threat intelligence.

## Features
- **Live Global Mapping**: Interactive 3D visualization using Globe.gl to map source and destination attack vectors in real-time.
- **AI Analytics**: Real-time heuristic risk scoring, threat categorization, and anomaly detection.
- **SOC Dashboard**: A professional, futuristic cyberpunk-styled dashboard displaying live attack feeds, protocol distributions, and packet rate trends.
- **Reporting**: Backend generation of comprehensive CSV reports for historical threat analysis.
- **Secure Authentication**: Role-based access control with JWT authentication and bcrypt password hashing.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Three.js, Globe.gl, Recharts, React Router.
- **Backend**: Python, FastAPI, WebSockets, SQLAlchemy, Passlib, JWT.
- **Database**: PostgreSQL (persisting users and threat events).
- **Deployment**: Docker & Docker Compose.

## Installation and Setup

Ensure you have Docker and Docker Compose installed on your system.

1. Clone the repository and navigate to the project root:
   ```bash
   cd CyberShield-AI
   ```

2. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - **Frontend UI**: [http://localhost:5173](http://localhost:5173)
   - **Backend API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

## Usage
1. Navigate to the Frontend UI.
2. Click "Initialize Clearance" to register a new SOC Analyst account.
3. Once authenticated, you will be redirected to the main dashboard.
4. Observe the live 3D globe and the real-time attack feed on the right panel.
5. Review the AI Analytics charts (Protocol Distribution and Packet Rate) for threat trends.
6. Use the `/api/reports/csv` endpoint to download historical data.
