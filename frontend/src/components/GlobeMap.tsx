import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import type { ThreatEvent } from './Dashboard';

interface GlobeMapProps {
  events: ThreatEvent[];
}

// Full coordinate map for all simulator countries
const COUNTRY_COORDS: Record<string, { lat: number; lng: number }> = {
  US: { lat: 37.0902, lng: -95.7129 },
  CN: { lat: 35.8617, lng: 104.1954 },
  RU: { lat: 61.524, lng: 105.3188 },
  BR: { lat: -14.235, lng: -51.9253 },
  DE: { lat: 51.1657, lng: 10.4515 },
  IN: { lat: 20.5937, lng: 78.9629 },
  FR: { lat: 46.2276, lng: 2.2137 },
  GB: { lat: 55.3781, lng: -3.436 },
  CA: { lat: 56.1304, lng: -106.3468 },
  AU: { lat: -25.2744, lng: 133.7751 },
  JP: { lat: 36.2048, lng: 138.2529 },
  KR: { lat: 35.9078, lng: 127.7669 },
  UA: { lat: 48.3794, lng: 31.1656 },
  IR: { lat: 32.4279, lng: 53.688 },
  NG: { lat: 9.082, lng: 8.6753 },
};

const GlobeMap: React.FC<GlobeMapProps> = ({ events }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || globeRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    globeRef.current = new Globe(containerRef.current)
      // Photorealistic NASA Blue Marble high-res daytime Earth
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      // Specular ocean reflections
      .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
      // Transparent stars background
      .backgroundColor('rgba(0,0,0,0)')
      // Beautiful neon-blue atmosphere glow (like Kaspersky)
      .showAtmosphere(true)
      .atmosphereColor('#1a7fff')
      .atmosphereAltitude(0.22)
      // Globe dimensions
      .width(width)
      .height(height)
      // Arc configuration (attack lines)
      .arcColor('color')
      .arcDashLength(0.45)
      .arcDashGap(0.15)
      .arcDashInitialGap(() => Math.random())
      .arcDashAnimateTime(1400)
      .arcStroke(0.7)
      // Target impact rings
      .ringColor(() => '#ff003c')
      .ringMaxRadius('maxR')
      .ringPropagationSpeed('propagationSpeed')
      .ringRepeatPeriod('repeatPeriod');

    // Smooth slow auto-rotation
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 0.5;
    globeRef.current.controls().enableZoom = true;

    const handleResize = () => {
      if (globeRef.current && containerRef.current) {
        globeRef.current
          .width(containerRef.current.clientWidth)
          .height(containerRef.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;

    const arcsData = events
      .map((event) => {
        const source = COUNTRY_COORDS[event.source_country];
        const target = COUNTRY_COORDS[event.target_country];
        if (!source || !target) return null;

        // Color by severity
        const color =
          event.severity === 'Critical'
            ? '#ff003c'
            : event.severity === 'High'
            ? '#ff6b00'
            : '#b026ff';

        return {
          startLat: source.lat,
          startLng: source.lng,
          endLat: target.lat,
          endLng: target.lng,
          color,
        };
      })
      .filter(Boolean);

    const ringsData = events
      .map((event) => {
        const target = COUNTRY_COORDS[event.target_country];
        if (!target) return null;

        const maxR =
          event.severity === 'Critical' ? 7 : event.severity === 'High' ? 5 : 3;

        return {
          lat: target.lat,
          lng: target.lng,
          maxR,
          propagationSpeed: 1.8,
          repeatPeriod: 900,
        };
      })
      .filter(Boolean);

    globeRef.current.arcsData(arcsData).ringsData(ringsData);
  }, [events]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default GlobeMap;
