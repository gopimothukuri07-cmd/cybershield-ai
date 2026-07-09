# CyberShield AI - Viva Questions & Answers

**Q1: What is the main objective of CyberShield AI?**
**A1:** To provide a real-time, centralized Security Operations Center (SOC) dashboard that visualizes, monitors, and analyzes simulated network traffic to detect DDoS threats using an intuitive 3D interface and AI-driven analytics.

**Q2: How does the real-time data streaming work in this project?**
**A2:** The Python (FastAPI) backend runs an asynchronous background task (`asyncio`) that generates simulated threat events. These events are instantly broadcast to the React frontend via native WebSockets, allowing the UI to update without constant HTTP polling.

**Q3: How is user security and authentication handled?**
**A3:** Authentication is managed using JSON Web Tokens (JWT). When a user logs in, their password is verified against a bcrypt hash stored in the PostgreSQL database. If successful, the backend issues a JWT, which the frontend stores and attaches to the `Authorization` header of subsequent API requests.

**Q4: Explain the role of Docker in this project.**
**A4:** Docker is used to containerize the application, ensuring consistency across different environments. `docker-compose` orchestrates the multi-container setup, bridging the FastAPI backend, React frontend, PostgreSQL, and Redis instances onto a unified virtual network.

**Q5: How did you implement the 3D globe visualization?**
**A5:** We utilized `globe.gl`, a wrapper around `Three.js`. It renders a WebGL sphere mapping country coordinates. As WebSocket events arrive, the component dynamically draws animated arcs from the source country to the target country based on the threat's severity.
