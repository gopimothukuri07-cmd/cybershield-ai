from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.db.database import Base

class ThreatEvent(Base):
    __tablename__ = "threat_events"

    id = Column(Integer, primary_key=True, index=True)
    source_country = Column(String, index=True)
    target_country = Column(String, index=True)
    source_ip = Column(String, index=True)
    destination_ip = Column(String, index=True)
    protocol = Column(String)
    attack_type = Column(String, index=True)
    severity = Column(String, index=True)
    confidence = Column(Integer)
    packet_rate = Column(Integer)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
