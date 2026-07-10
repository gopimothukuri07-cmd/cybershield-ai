import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import type { ThreatEvent } from './Dashboard';

interface GlobeMapProps {
  events: ThreatEvent[];
}

// Map of all countries in simulator to lat/lng coordinates
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
  "JP": { lat: 36.2048, lng: 138.2529 },
  "KR": { lat: 35.9078, lng: 127.7669 },
  "UA": { lat: 48.3794, lng: 31.1656 },
  "IR": { lat: 32.4279, lng: 53.6880 },
  "NG": { lat: 9.0820, lng: 8.6753 }
};

const GlobeMap: React.FC<GlobeMapProps> = ({ events }) => {
  const globeEl = useRef<HTMLDivElement>(null);
  const globeInstance = useRef<any>(null);

  useEffect(() => {
    if (globeEl.current && !globeInstance.current) {
      // Create globe instance with rich visual style matching live cyber threat maps
      globeInstance.current = new Globe(globeEl.current)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundColor('rgba(0,0,0,0)')
        
        // Neon atmosphere glow (Kaspersky style)
        .showAtmosphere(true)
        .atmosphereColor('#00f0ff')
        .atmosphereAltitude(0.18)
        
        // Arc configuration (attack vectors)
        .arcColor('color')
        .arcDashLength(0.5)
        .arcDashGap(0.2)
        .arcDashInitialGap(() => Math.random())
        .arcDashAnimateTime(1200)
        .arcStroke(0.6)
        
        // Ring configuration (target blasts)
        .ringColor(() => '#ff003c')
        .ringMaxRadius('maxR')
        .ringPropagationSpeed('propagationSpeed')
        .ringRepeatPeriod('repeatPeriod');

      // Super smooth auto-rotate
      globeInstance.current.controls().autoRotate = true;
      globeInstance.current.controls().autoRotateSpeed = 0.6;
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
      // Map events to attack arcs
      const arcsData = events.map(event => {
        const source = COUNTRY_COORDS[event.source_country];
        const target = COUNTRY_COORDS[event.target_country];
        
        if (!source || !target) return null;
        
        // High severity attacks use neon red, others use neon purple
        const arcColor = event.severity === 'Critical' || event.severity === 'High' 
          ? '#ff003c' 
          : '#b026ff';
        
        return {
          startLat: source.lat,
          startLng: source.lng,
          endLat: target.lat,
          endLng: target.lng,
          color: arcColor
        };
      }).filter(Boolean);

      // Map events to target ripple rings
      const ringsData = events.map(event => {
        const target = COUNTRY_COORDS[event.target_country];
        if (!target) return null;
        
        // Ripple size matches attack severity
        const maxR = event.severity === 'Critical' ? 6 
                   : event.severity === 'High' ? 4 
                   : 2;
                   
        return {
          lat: target.lat,
          lng: target.lng,
          maxR: maxR,
          propagationSpeed: 1.5,
          repeatPeriod: 1000
        };
      }).filter(Boolean);

      globeInstance.current.arcsData(arcsData);
      globeInstance.current.ringsData(ringsData);
    }
  }, [events]);

  return <div ref={globeEl} className="w-full h-full" />;
};

export default GlobeMap;
