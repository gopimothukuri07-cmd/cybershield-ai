import React, { useEffect, useRef, useState, useMemo } from 'react';
import Globe from 'globe.gl';
import { ThreatEvent } from './Dashboard';

interface GlobeMapProps {
  events: ThreatEvent[];
}

// A simple map of country to lat/lng for demo purposes
const COUNTRY_COORDS: Record<string, { lat: number, lng: number }> = {
  "US": { lat: 37.0902, lng: -95.7129 },
  "CN": { lat: 35.8617, lng: 104.1954 },
  "RU": { lat: 61.5240, lng: 105.3188 },
  "BR": { lat: -14.2350, lng: -51.9253 },
  "DE": { lat: 51.1657, lng: 10.4515 },
  "IN": { lat: 20.5937, lng: 78.9629 },
  "FR": { lat: 46.2276, lng: 2.2137 },
  "GB": { lat: 55.3781, lng: -3.4360 },
  "CA": { lat: 56.1304, lng: -106.3468 },
  "AU": { lat: -25.2744, lng: 133.7751 },
};

const GlobeMap: React.FC<GlobeMapProps> = ({ events }) => {
  const globeEl = useRef<HTMLDivElement>(null);
  const globeInstance = useRef<any>(null);

  useEffect(() => {
    if (globeEl.current && !globeInstance.current) {
      globeInstance.current = Globe()(globeEl.current)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundColor('rgba(0,0,0,0)')
        .arcColor(() => '#ff003c')
        .arcDashLength(0.4)
        .arcDashGap(0.2)
        .arcDashInitialGap(() => Math.random())
        .arcDashAnimateTime(1500)
        .arcStroke(0.5);

      // Auto-rotate
      globeInstance.current.controls().autoRotate = true;
      globeInstance.current.controls().autoRotateSpeed = 1.0;
    }

    const handleResize = () => {
      if (globeInstance.current && globeEl.current) {
        globeInstance.current.width(globeEl.current.clientWidth);
        globeInstance.current.height(globeEl.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (globeInstance.current) {
      // Map events to arcs
      const arcsData = events.map(event => {
        const source = COUNTRY_COORDS[event.source_country];
        const target = COUNTRY_COORDS[event.target_country];
        
        if (!source || !target) return null;
        
        return {
          startLat: source.lat,
          startLng: source.lng,
          endLat: target.lat,
          endLng: target.lng,
          color: event.severity === 'Critical' ? '#ff003c' : '#b026ff'
        };
      }).filter(Boolean);

      globeInstance.current.arcsData(arcsData);
    }
  }, [events]);

  return <div ref={globeEl} className="w-full h-full" />;
};

export default GlobeMap;
