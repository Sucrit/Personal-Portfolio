import React, { useMemo, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import './FantasyBackground.css';

const FantasyBackground: React.FC = () => {
  const idleRef = useRef(0);
  const { scrollY } = useScroll();
  const starX = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const svgW = 1920;
      const svgH = 1080;
      
      const scale = Math.max(w / svgW, h / svgH);
      const scaledSvgW = svgW * scale;
      const scaledSvgH = svgH * scale;
      
      const offsetX = (w - scaledSvgW) / 2;
      const offsetY = (h - scaledSvgH) / 2;

      const svgX = (e.clientX - offsetX) / scale;
      const svgY = (e.clientY - offsetY) / scale;

      mouseX.set(svgX);
      mouseY.set(svgY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useAnimationFrame((_t, delta) => {
    idleRef.current += delta * 0.003; 
    
    const scrollOffset = scrollY.get() * 0.08; 
    const x = (idleRef.current + scrollOffset) % 1920;
    starX.set(x);
  });

  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      cx: Math.random() * 1920,
      cy: Math.random() * 800,
      r: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 5 + 's',
      opacity: Math.random() * 0.5 + 0.5
    }));
  }, []);

  // Mountain generation
  const mountainLayers = useMemo(() => {
    const layers = [];
    let seed = 12345;
    
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const createPath = (
      baseY: number, 
      amplitude: number, 
      roughness: number, 
      treeHeight: number,
      frequency: number,
      density: number = 1.0,
      flattenStart: boolean = false,
      hasCity: boolean = false
    ) => {
      let d = `M0,${baseY}`;
      let x = 0;
      const buildings: { d: string }[] = [];
      const windows: {x: number, y: number, w: number, h: number, delay: number, duration: number, animationType: 'none' | 'toggle' | 'flicker' | 'slowBlink', isOn: boolean, color?: string, isCabin?: boolean}[] = [];
      
      let lighthouseBuilt = false;
      let lighthouseGlow: { cx: number, cy: number, rx: number, ry: number } | null = null;
      let cabinAnimCount = 0; 
      
      while (x <= 1930) {
        let currentAmp = amplitude;
        if (flattenStart && x < 600) {
           currentAmp = amplitude * (x / 600);
        }

        const globalShape = Math.sin(x * frequency) * currentAmp 
                          + Math.cos(x * frequency * 2.3) * (currentAmp * 0.4)
                          + Math.sin(x * frequency * 5.7) * (currentAmp * 0.15);
        
        const noise = (random() - 0.5) * roughness;
        
        const y = baseY + globalShape + noise;
        
        if (hasCity) {
           if (!lighthouseBuilt && x >= 1660) {
                lighthouseBuilt = true;
                
                const lhW = 18; 
                const lhH = 70;
                const lhY = y + 5;

                let lhPath = `M${x},${lhY} V${lhY-10} H${x+lhW} V${lhY} Z`;

                const towerBaseY = lhY - 10;
                const towerTopY = lhY - lhH;
                const insetBot = 2;
                const insetTop = 5;
                lhPath += ` M${x+insetBot},${towerBaseY} L${x+insetTop},${towerTopY} H${x+lhW-insetTop} L${x+lhW-insetBot},${towerBaseY} Z`;

                const galleryY = towerTopY;
                const galleryH = 3.5;
                lhPath += ` M${x+insetTop-1.5},${galleryY} V${galleryY-galleryH} H${x+lhW-insetTop+1.5} V${galleryY} Z`;

                const lanternW = 8.5;
                const lanternH = 9.5;
                const lanternX = x + (lhW - lanternW) / 2;
                const lanternY = galleryY - galleryH;
                lhPath += ` M${lanternX},${lanternY} V${lanternY-lanternH} H${lanternX+lanternW} V${lanternY} Z`;

                const roofY = lanternY - lanternH;
                lhPath += ` M${lanternX-0.7},${roofY} L${x+lhW/2},${roofY-7} L${lanternX+lanternW+0.7},${roofY} Z`;
                lhPath += ` M${x+lhW/2},${roofY-7} V${roofY-10} H${x+lhW/2+0.7} V${roofY-7} Z`;

                buildings.push({ d: lhPath });

                const doorW = 4.2;
                const doorH = 7;
                windows.push({
                   x: x + (lhW-doorW)/2, y: towerBaseY - doorH, w: doorW, h: doorH,
                   animationType: 'none', isOn: true, delay: 0, duration: 0
                });

                const winW = 2.8;
                const winH = 3.5;
                const winX = x + (lhW - winW) / 2;
                const lhColor = "#ffaa00";
                const positions = [17, 34, 51];
                positions.forEach(offset => {
                  windows.push({
                    x: winX, y: towerBaseY - offset, w: winW, h: winH,
                    animationType: 'none', isOn: true, delay: 0, duration: 0, color: lhColor
                  });
                });

                windows.push({
                   x: lanternX + 0.7, y: lanternY - lanternH + 0.7, w: lanternW - 1.4, h: lanternH - 1.4,
                   animationType: 'none', isOn: true, delay: 0, duration: 0, color: "#fffeb0"
                });
                lighthouseGlow = { cx: x + lhW/2, cy: lanternY - lanternH/2, rx: 40, ry: 40 };
           }

           if (x > 1500 && x < 1850 && Math.abs(x - 1670) > 40) {
               if (random() > 0.4) {
                   const yOffset = 15 + random() * 50; 
                   
                   const count = Math.floor(1 + random() * 2.5);
                   for(let k=0; k<count; k++) {
                       const spacing = k * (3 + random() * 3);
                       const wSize = 1.8 + random() * 1.5;  
                       
                       let animType: 'none' | 'slowBlink' = 'none';
                       if (cabinAnimCount < 2 && random() > 0.85) {
                           animType = 'slowBlink';
                           cabinAnimCount++;
                       }

                       windows.push({
                           x: x + spacing,
                           y: y + yOffset + (random() * 3), 
                           w: wSize,
                           h: wSize, // Square-ish
                           animationType: animType,
                           isOn: true,
                           delay: 0,
                           duration: animType === 'slowBlink' ? 10 : 0,   
                           color: random() > 0.5 ? "#ffaa55" : "#ffcc77",   
                           isCabin: true
                       });
                   }
               }
           }

           if (x < 850) {
           if (random() > 0.05) {
               const buildingW = 12 + random() * 18; 
               const buildingH = 20 + random() * 45;
               const groundY = y + 3;   
               
               let buildingPath = "";
               const buildType = random();  

               const pushWindow = (wx: number, wy: number, ww: number, wh: number) => {
                  const rand = random();
                  const isOn = rand > 0.5;
                  
                  let animationType: 'none' | 'toggle' | 'flicker' = 'none';
                  if (isOn) {
                      const animRand = random();
                          if (animRand > 0.7) animationType = 'flicker';
                          else if (animRand > 0.4) animationType = 'toggle';
                  }

                        windows.push({
                          x: wx, y: wy, w: ww, h: wh,
                          animationType,
                          isOn,
                          delay: animationType !== 'none' ? random() * 18 : 0,
                          duration: animationType === 'flicker' ? 20 + random() * 12 : 32 + random() * 24
                        });
               };

               if (buildType < 0.3 && buildingH > 30) {
                   const stepH = buildingH * 0.4;
                   const topW = buildingW * 0.6;
                   const margin = (buildingW - topW) / 2;
                   
                   buildingPath += `M${x},${groundY} V${groundY - (buildingH - stepH)} H${x + margin} V${groundY - buildingH} H${x + buildingW - margin} V${groundY - (buildingH - stepH)} H${x + buildingW} V${groundY} Z`;
                   
                   const rows = Math.floor((buildingH - stepH)/5);
                   const cols = Math.floor(buildingW/4);
                   for(let r=0; r<rows; r++) {
                       for(let c=0; c<cols; c++) {
                           pushWindow(x+2+c*4, groundY - (buildingH - stepH) + 4 + r*4, 1.5, 2);
                       }
                   }
               }
               else if (buildType < 0.5) {
                   const antennaH = 10 + random() * 10;
                   buildingPath += `M${x},${groundY} V${groundY - buildingH} H${x + buildingW/2 - 1} V${groundY - buildingH - antennaH} H${x + buildingW/2 + 1} V${groundY - buildingH} H${x+buildingW} V${groundY} Z`;
                   
                   const rows = Math.floor(buildingH/5);
                   const cols = Math.floor(buildingW/4);
                   for(let r=0; r<rows; r++) {
                       for(let c=0; c<cols; c++) {
                           pushWindow(x+2+c*4, groundY - buildingH + 4 + r*5, 1.5, 2);
                       }
                   }
               }
               else if (buildType < 0.7) {
                   const shortH = buildingH * 0.8;
                   if (random() > 0.5) {
                       buildingPath += `M${x},${groundY} V${groundY - buildingH} L${x + buildingW},${groundY - shortH} V${groundY} Z`;
                   } else {
                       buildingPath += `M${x},${groundY} V${groundY - shortH} L${x + buildingW},${groundY - buildingH} V${groundY} Z`;
                   }
                   
                   const rows = Math.floor(shortH/5);
                   const cols = Math.floor(buildingW/4);
                   for(let r=0; r<rows; r++) {
                       for(let c=0; c<cols; c++) {
                           pushWindow(x+2+c*4, groundY - shortH + 4 + r*5, 1.5, 1.5);
                       }
                   }
               }
               else {
                   buildingPath += `M${x},${groundY} V${groundY - buildingH} H${x + buildingW} V${groundY} Z`;
                   
                   const rows = Math.floor(buildingH/6);
                   const cols = Math.floor(buildingW/5);
                   for(let r=0; r<rows; r++) {
                       for(let c=0; c<cols; c++) {
                           pushWindow(x+3+c*5, groundY - buildingH + 5 + r*6, 2, 2);
                       }
                   }
               }
               
               buildings.push({ d: buildingPath });
           }
        }
      }

      let effectiveTreeH = treeHeight;
        if (hasCity && x > 850) {
           effectiveTreeH = 6; 
        }

        if (effectiveTreeH > 0) {
          const baseW = effectiveTreeH * (0.6 + random() * 0.5);
          const treeW = Math.max(3, baseW);

          const treeH = effectiveTreeH * (0.8 + random() * 0.5); 
          const centerX = x + treeW / 2;
          
          const segments = Math.floor(treeH / 2.5) + 3;
          
          d += ` L${x},${y}`; 
          
          for (let i = 0; i < segments; i++) {
            const ratio = i / segments;
            const nextRatio = (i + 1) / segments;
            
            const currentY = y - treeH * ratio;
            const nextY = y - treeH * nextRatio;
            
            const currentHalfW = (treeW / 2) * Math.pow(1 - ratio, 1.15);
            const nextHalfW = (treeW / 2) * Math.pow(1 - nextRatio, 1.15);

            const jitter = (random() - 0.5) * 1.5; 
            
            const nextTipX = centerX - (nextHalfW + jitter);

            if (i === 0) {
              d += ` L${nextTipX},${nextY}`;
            } else {
              const notchY = currentY - (currentY - nextY) * (0.35 + random() * 0.2);
              const indentFactor = 0.5 + random() * 0.25; 
              const notchX = centerX - (currentHalfW * indentFactor + jitter); 
              
              d += ` L${notchX},${notchY}`;
              d += ` L${nextTipX},${nextY}`;
            }
          }
          
          d += ` L${centerX},${y - treeH}`;

          for (let i = segments - 1; i >= 0; i--) {
            const ratio = i / segments;
            const nextRatio = (i + 1) / segments;
            
            const currentY = y - treeH * ratio;   
            const nextY = y - treeH * nextRatio;  
            
            const currentHalfW = (treeW / 2) * Math.pow(1 - ratio, 1.15);
            
            const jitter = (random() - 0.5) * 1.5;
            
            const bottomTipX = centerX + (currentHalfW + jitter);

            if (i === 0) {
               d += ` L${bottomTipX},${currentY}`;
            } else {
               const notchY = currentY - (currentY - nextY) * (0.35 + random() * 0.2);
               const indentFactor = 0.5 + random() * 0.25;
               const notchX = centerX + (currentHalfW * indentFactor + jitter);
               
               d += ` L${notchX},${notchY}`;
               d += ` L${bottomTipX},${currentY}`;
            }
          }

          x += treeW * density; 
        } else {
          const step = (hasCity && x < 850) ? 8 : 20;
          x += step;
          d += ` L${x},${y}`;
        }
      }
      
      d += ` V1080 H0 Z`;
      return { d, windows, buildings, lighthouseGlow };
    };

    const l2 = createPath(790, 110, 4, 0, 0.0025, 1.0, true, true);
    layers.push({
      d: l2.d,
      windows: l2.windows,
      buildings: l2.buildings,
      fill: '#1b223d',
      key: 'layer2',
      lighthouseGlow: l2.lighthouseGlow   
    });

    layers.push({
      d: createPath(820, 70, 10, 20, 0.0035, 0.8).d,  
      windows: [],
      buildings: [],
      fill: '#14182e',
      key: 'layer3'
    });

    layers.push({
      d: createPath(920, 50, 5, 45, 0.003, 0.7).d,  
      windows: [],
      buildings: [],
      fill: '#0d1021',
      key: 'layer4'
    });

    layers.push({
      d: createPath(1020, 30, 5, 80, 0.004, 0.65).d,  
      windows: [],
      buildings: [],
      fill: '#05060e',
      key: 'layer5'
    });

    return layers;
  }, []);

  // Beam math
  const lhLayer = mountainLayers.find(l => l.lighthouseGlow);
  const lhCx = lhLayer?.lighthouseGlow?.cx || 0;
  const lhCy = lhLayer?.lighthouseGlow?.cy || 0;

    const beamValues = useTransform([mouseX, mouseY], ([mx, my]) => {
      if (!lhCx || !lhCy) return { inner: "", core: "" };
     
     const dx = (mx as number) - lhCx;
     const dy = (my as number) - lhCy;
     const dist = Math.sqrt(dx*dx + dy*dy);
     
    if (dist < 5) return { inner: "", core: "" };

     const angle = Math.atan2(dy, dx);
     const perpAngle = angle + Math.PI / 2;
     
     const geometryDist = dist * 1.05;
     
     const endX = lhCx + Math.cos(angle) * geometryDist;
     const endY = lhCy + Math.sin(angle) * geometryDist;

     const getPath = (startW: number, endWBase: number) => { 
        const oxStart = Math.cos(perpAngle) * (startW / 2);
        const oyStart = Math.sin(perpAngle) * (startW / 2);
        
        const endW = endWBase * 1.4; 
        
        const oxEnd = Math.cos(perpAngle) * (endW / 2);
        const oyEnd = Math.sin(perpAngle) * (endW / 2);

        const pStart1x = lhCx + oxStart;
        const pStart1y = lhCy + oyStart;
        const pStart2x = lhCx - oxStart;
        const pStart2y = lhCy - oyStart;

        const pEnd1x = endX + oxEnd;
        const pEnd1y = endY + oyEnd;
        const pEnd2x = endX - oxEnd;
        const pEnd2y = endY - oyEnd;

        return `M${pStart1x},${pStart1y} L${pEnd1x},${pEnd1y} L${pEnd2x},${pEnd2y} L${pStart2x},${pStart2y} Z`;
     };

     const innerPath = getPath(6, 60 + dist * 0.08);

     const corePath = getPath(2, 5 + dist * 0.01);

      return { inner: innerPath, core: corePath };
  });

  const innerBeamPath = useTransform(beamValues, v => v.inner);
  const coreBeamPath = useTransform(beamValues, v => v.core);

  // Beam length
  const beamLength = useTransform([mouseX, mouseY], ([mx, my]) => {
     if (!lhCx || !lhCy) return 0;
     const dx = (mx as number) - lhCx;
     const dy = (my as number) - lhCy;
     const dist = Math.sqrt(dx*dx + dy*dy);
     
     return Math.min(dist * 1.05, 1050); 
  });

  // Surface glow
  const splashOpacity = useTransform([mouseX, mouseY], ([mx, my]) => {
     if (!lhCx || !lhCy) return 0;
     const dx = (mx as number) - lhCx;
     const dy = (my as number) - lhCy;
     const dist = Math.sqrt(dx*dx + dy*dy);

    const maxRange = 1100; 
    const fadeRange = 300;
     
     if (dist > maxRange) return 0;
     
     if (dist > maxRange - fadeRange) {
        return 0.9 * (1 - (dist - (maxRange - fadeRange)) / fadeRange);
     }
     return 0.9;
  });

  return (
    <div className="fantasyContainer">
      <div className="glow" />
      <svg
        key={'beam-on'}
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <defs>
          <radialGradient 
              id="lighthouse-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="20%" stopColor="#fff4cc" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffdd44" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffaa00" stopOpacity="0" />
          </radialGradient>

          <motion.radialGradient 
              id="volumetric-beam-gradient" 
              cx={lhCx} cy={lhCy} r={beamLength} 
              gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="20%" stopColor="#fff8db" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#ffde8a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </motion.radialGradient>

          <motion.radialGradient 
              id="core-beam-gradient" 
              cx={lhCx} cy={lhCy} r={beamLength} 
              gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </motion.radialGradient>

        </defs>

        <motion.g style={{ x: starX }}>
          {stars.map((star) => (
            <circle
              key={`star-${star.id}`}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="white"
              fillOpacity={star.opacity}
              className="star"
              style={{ animationDelay: star.delay }}
            />
          ))}
          {stars.map((star) => (
            <circle
              key={`star-clone-${star.id}`}
              cx={star.cx - 1920}
              cy={star.cy}
              r={star.r}
              fill="white"
              fillOpacity={star.opacity}
              className="star"
              style={{ animationDelay: star.delay }}
            />
          ))}
        </motion.g>

        <g className="shootingStarContainer">
          <defs>
            <linearGradient id="shooting-star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="30%" stopColor="#cfe8ff" stopOpacity="0.05" />
              <stop offset="60%" stopColor="#a5d8ff" stopOpacity="0.15" />
              <stop offset="85%" stopColor="#dbeeff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="shooting-star-core" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="70%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
            <radialGradient id="shooting-star-head-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="40%" stopColor="#ffe8b0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a5d8ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <path
            className="shootingStarTail"
            d="M0,0 Q60,-3 120,-2 Q160,-1 200,0 Q160,1 120,2 Q60,3 0,0 Z"
            fill="url(#shooting-star-gradient)"
            opacity="0.4"
            style={{ filter: 'blur(3px)' }}
          />

          <path
            d="M60,0 Q120,-0.8 180,-0.5 L200,0 Q180,0.5 120,0.8 Q60,0 60,0 Z"
            fill="url(#shooting-star-core)"
            opacity="0.9"
            style={{ filter: 'blur(1.5px)' }}
          />

          <circle className="shootingDebris debris1" cx="40" cy="-2" r="0.6" fill="#ffffff" opacity="0.5" />
          <circle className="shootingDebris debris2" cx="70" cy="3" r="0.4" fill="#cfe8ff" opacity="0.4" />
          <circle className="shootingDebris debris3" cx="95" cy="-3.5" r="0.5" fill="#ffffff" opacity="0.35" />
          <circle className="shootingDebris debris4" cx="130" cy="2.5" r="0.35" fill="#a5d8ff" opacity="0.45" />
          <circle className="shootingDebris debris5" cx="155" cy="-1.5" r="0.3" fill="#ffffff" opacity="0.3" />

          <circle
            className="shootingStarHead"
            cx="200"
            cy="0"
            r="6"
            fill="url(#shooting-star-head-glow)"
            style={{ filter: 'blur(3px)' }}
            opacity="0.6"
          />

          <circle
            cx="200"
            cy="0"
            r="2"
            fill="#ffffff"
            style={{ filter: 'blur(1.5px)' }}
            opacity="1"
          />
        </g>

        <g className="moon" transform="translate(1500, 350)">
          <circle cx="0" cy="0" r="80" fill="#feffdf" />
          <circle cx="-25" cy="-25" r="70" fill="#0b1026" />
        </g>

        {mountainLayers.map((layer) => (
          <React.Fragment key={layer.key}>
            <path
              d={layer.d}
              fill={layer.fill}
              className="landscapeLayer"
            />
            {(layer as any).buildings?.map((b: any, i: number) => (
               <path
                 key={`build-${layer.key}-${i}`}
                 d={b.d}
                 fill={layer.fill} 
                 className="landscapeLayer"
               />
            ))}
            {(layer as any).windows?.map((w: any, i: number) => (
               <rect
                 key={`win-${layer.key}-${i}`}
                 x={w.x}
                 y={w.y}
                 width={w.w}
                 height={w.h}
                 rx={w.isCabin ? 0.5 : 0}
                 fill={w.isOn ? (w.color || "#fff6a9") : layer.fill} 
                 opacity={w.isOn ? (w.animationType !== 'none' ? undefined : 0.8) : 1}
                 className="cityWindow"
                 style={w.isOn && w.animationType !== 'none' ? {
                     animationName: w.animationType === 'flicker' ? 'flickerWindow' : 
                                  w.animationType === 'slowBlink' ? 'slowBlink' : 'toggleWindow',
                     animationDuration: `${w.duration}s`,
                     animationDelay: `${w.delay}s`,
                     animationIterationCount: 'infinite',
                     animationFillMode: 'both',
                     willChange: 'opacity',
                     filter: w.isCabin ? 'blur(0.4px)' : 'none'
                 } : {}}
               />
            ))}
            {layer.lighthouseGlow && (
              <g className="lighthouseContainer">
                <defs>
                   <clipPath id={`clip-${layer.key}`}>
                       <path d={layer.d} />
                       {(layer as any).buildings?.map((b: any, i: number) => (
                           <path key={`clip-build-${i}`} d={b.d} />
                       ))}
                   </clipPath>
                </defs>
                <motion.g 
                    style={{ opacity: splashOpacity, mixBlendMode: 'overlay' }} 
                    clipPath={`url(#clip-${layer.key})`}
                >
                   <motion.ellipse
                      cx={mouseX}
                      cy={mouseY}
                      rx={80}
                      ry={40}
                      fill="url(#lighthouse-glow)"
                      style={{ filter: 'blur(10px)', pointerEvents: 'none', willChange: 'cx, cy' }}
                   />
                   <motion.ellipse
                      cx={mouseX}
                      cy={mouseY}
                      rx={30}
                      ry={15}
                      fill="#fff"
                      style={{ filter: 'blur(4px)', pointerEvents: 'none', willChange: 'cx, cy' }}
                   />
                </motion.g>

                <motion.path
                  className="beamLayer"
                  d={innerBeamPath}
                  fill="url(#volumetric-beam-gradient)"
                  style={{ mixBlendMode: 'screen', pointerEvents: 'none', filter: 'blur(6px)', willChange: 'd' }}
                  opacity={0.8}
                />
                <motion.path
                  className="beamLayer"
                  d={coreBeamPath}
                  fill="url(#core-beam-gradient)"
                  fillOpacity={0.9}
                  style={{ mixBlendMode: 'screen', pointerEvents: 'none', filter: 'blur(3px)', willChange: 'd' }}
                />
                
                <ellipse
                  cx={layer.lighthouseGlow.cx}
                  cy={layer.lighthouseGlow.cy}
                  rx={layer.lighthouseGlow.rx * 2}
                  ry={layer.lighthouseGlow.ry * 2}
                  fill="url(#lighthouse-glow)"
                  opacity={0.18}
                />
                <ellipse
                  className="lighthouseCore"
                  cx={layer.lighthouseGlow.cx}
                  cy={layer.lighthouseGlow.cy}
                  rx={layer.lighthouseGlow.rx * 0.7}
                  ry={layer.lighthouseGlow.ry * 0.7}
                  fill="url(#lighthouse-glow)"
                  opacity={0.45}
                  style={{ pointerEvents: 'none' }}
                />
              </g>
            )}
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
};

export default FantasyBackground;
