# CyberShield AI - Database ER Diagram

Below is the Entity-Relationship (ER) diagram for the PostgreSQL database utilized by CyberShield AI.

```mermaid
erDiagram
    USERS {
        int id PK
        string username UK
        string email UK
        string hashed_password
        string role "Admin, Analyst, Viewer"
        boolean is_active
    }

    THREAT_EVENTS {
        int id PK
        string source_country
        string target_country
        string source_ip
        string destination_ip
        string protocol
        string attack_type
        string severity "Low, Medium, High, Critical"
        int confidence
        int packet_rate
        datetime timestamp
    }

    USERS ||--o{ THREAT_EVENTS : "monitors"
```

## Description
1. **USERS Table**: Stores analyst credentials. Role-based access ensures only authorized personnel can view the dashboard. Passwords are encrypted via bcrypt.
2. **THREAT_EVENTS Table**: The core table accumulating network traffic events from the simulator. This is queried heavily by the AI Analytics endpoints to generate the historical metrics and CSV reports.
