import React, { useMemo, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import './FantasyBackground.css';

const FantasyBackground: React.FC = () => {
  const idleRef = useRef(0);
  const { scrollY } = useScroll();
  const starX = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [showShootingStar, setShowShootingStar] = useState(false);

  // Trigger shooting star after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowShootingStar(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

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
    // Continuous slow drift
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

  // Generate mountain layers procedurally to ensure detailed, organic 3D look
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
      // We will collect separate building path strings to render ON TOP of the mountain
      // but "planted" into it.
      const buildings: { d: string }[] = [];
      // Windows with animation data
      const windows: {x: number, y: number, w: number, h: number, delay: number, duration: number, animationType: 'none' | 'toggle' | 'flicker' | 'slowBlink', isOn: boolean, color?: string, isCabin?: boolean}[] = [];
      
      let lighthouseBuilt = false;
      let lighthouseGlow: { cx: number, cy: number, rx: number, ry: number } | null = null;
      let cabinAnimCount = 0; // Track how many blinking cabins we've created
      
      // Move slightly off-screen to ensure full coverage
      while (x <= 1930) {
        // Flatten start logic
        let currentAmp = amplitude;
        if (flattenStart && x < 600) {
           currentAmp = amplitude * (x / 600);
        }

        // Create the base mountain curve using multiple sine waves for more natural variance
        const globalShape = Math.sin(x * frequency) * currentAmp 
                          + Math.cos(x * frequency * 2.3) * (currentAmp * 0.4)
                          + Math.sin(x * frequency * 5.7) * (currentAmp * 0.15);
        
        // Add roughness for jagged rocks
        const noise = (random() - 0.5) * roughness;
        
        const y = baseY + globalShape + noise;
        
        // CITY LOGIC: Independent of mountain shape
        // If we are in the city zone (left side), spawn buildings densely
        if (hasCity) {
           // Right-side Lighthouse Placement Logic
           // Only 1 lighthouse, on the actual highest peak (calculated at x=1680)
           // Right-side Lighthouse Placement Logic
           // Only 1 lighthouse, on the actual highest peak (calculated at x=1680)
           if (!lighthouseBuilt && x >= 1660) {
                lighthouseBuilt = true;
                
                // Dimensions (scaled down ~30%)
                const lhW = 18; 
                const lhH = 70;
                const lhY = y + 5;

                // 1. Foundation / Base (Solid block)
                let lhPath = `M${x},${lhY} V${lhY-10} H${x+lhW} V${lhY} Z`;

                // 2. Tower Body (Tapered)
                const towerBaseY = lhY - 10;
                const towerTopY = lhY - lhH;
                const insetBot = 2;
                const insetTop = 5;
                lhPath += ` M${x+insetBot},${towerBaseY} L${x+insetTop},${towerTopY} H${x+lhW-insetTop} L${x+lhW-insetBot},${towerBaseY} Z`;

                // 3. Gallery (Balcony Platform)
                const galleryY = towerTopY;
                const galleryH = 3.5;
                lhPath += ` M${x+insetTop-1.5},${galleryY} V${galleryY-galleryH} H${x+lhW-insetTop+1.5} V${galleryY} Z`;

                // 4. Lantern Room
                const lanternW = 8.5;
                const lanternH = 9.5;
                const lanternX = x + (lhW - lanternW) / 2;
                const lanternY = galleryY - galleryH;
                lhPath += ` M${lanternX},${lanternY} V${lanternY-lanternH} H${lanternX+lanternW} V${lanternY} Z`;

                // 5. Cupola / Roof + Spire
                const roofY = lanternY - lanternH;
                lhPath += ` M${lanternX-0.7},${roofY} L${x+lhW/2},${roofY-7} L${lanternX+lanternW+0.7},${roofY} Z`;
                lhPath += ` M${x+lhW/2},${roofY-7} V${roofY-10} H${x+lhW/2+0.7} V${roofY-7} Z`;

                // Add to buildings array
                buildings.push({ d: lhPath });

                // --- LIGHTS / WINDOWS ---

                // 1. Entrance Door (Warm glow at base)
                const doorW = 4.2;
                const doorH = 7;
                windows.push({
                   x: x + (lhW-doorW)/2, y: towerBaseY - doorH, w: doorW, h: doorH,
                   animationType: 'none', isOn: true, delay: 0, duration: 0
                });

                // 2. Tower Windows (Ascending)
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

                // 3. Main Lantern Light (The big one)
                windows.push({
                   x: lanternX + 0.7, y: lanternY - lanternH + 0.7, w: lanternW - 1.4, h: lanternH - 1.4,
                   animationType: 'none', isOn: true, delay: 0, duration: 0, color: "#fffeb0"
                });
                // Store glow info for this lighthouse
                lighthouseGlow = { cx: x + lhW/2, cy: lanternY - lanternH/2, rx: 40, ry: 40 };
           }

           // Village Lights / Cabins at the bottom of the lighthouse mountain
           if (x > 1500 && x < 1850 && Math.abs(x - 1670) > 40) {
               // Higher chance per step to add more lights
               if (random() > 0.4) {
                   // Ensure they are DEEP in the mountain. 
                   // y is the top edge. yOffset must be positive and significant.
                   const yOffset = 15 + random() * 50; 
                   
                   // Spawn 1 to 3 small windows (cabin cluster)
                   const count = Math.floor(1 + random() * 2.5);
                   for(let k=0; k<count; k++) {
                       const spacing = k * (3 + random() * 3);
                       const wSize = 1.8 + random() * 1.5; // Much smaller: 1.8 - 3.3px
                       
                       // Determine animation: Only allow 2 to blink slowly
                       let animType: 'none' | 'slowBlink' = 'none';
                       // Use random chance, but capping at 2 per layer generation
                       if (cabinAnimCount < 2 && random() > 0.85) {
                           animType = 'slowBlink';
                           cabinAnimCount++;
                       }

                       windows.push({
                           x: x + spacing,
                           y: y + yOffset + (random() * 3), // slight jitter
                           w: wSize,
                           h: wSize, // Square-ish
                           animationType: animType,
                           isOn: true,
                           delay: 0,
                           duration: animType === 'slowBlink' ? 10 : 0, // 10s cycle (5s on, 5s off)
                           color: random() > 0.5 ? "#ffaa55" : "#ffcc77", // Varied warm colors
                           isCabin: true
                       });
                   }
               }
           }

           // Left-side City Logic
           if (x < 850) {
           // Very high chance (95%) to place a building
           if (random() > 0.05) {
               const buildingW = 12 + random() * 18; 
               const buildingH = 20 + random() * 45;
               const groundY = y + 3; // Planted slightly deep
               
               let buildingPath = "";
               const buildType = random(); // Determine shape style

               // Helper to add window with animation data
               const pushWindow = (wx: number, wy: number, ww: number, wh: number) => {
                  const rand = random();
                  // 50% chance to be completely off (dark)
                  const isOn = rand > 0.5;
                  
                  // If ON, chance to animate
                  let animationType: 'none' | 'toggle' | 'flicker' = 'none';
                  if (isOn) {
                      const animRand = random();
                      if (animRand > 0.7) animationType = 'flicker'; // Increased to 30% flickering
                      else if (animRand > 0.4) animationType = 'toggle'; // ~30% breathing
                      // Rest are static ON
                  }

                        windows.push({
                          x: wx, y: wy, w: ww, h: wh,
                          animationType,
                          isOn,
                          delay: animationType !== 'none' ? random() * 18 : 0,
                          duration: animationType === 'flicker' ? 20 + random() * 12 : 32 + random() * 24
                        });
               };

               // Style 1: Stepped Skyscraper (0.0 - 0.3)
               if (buildType < 0.3 && buildingH > 30) {
                   const stepH = buildingH * 0.4;
                   const topW = buildingW * 0.6;
                   const margin = (buildingW - topW) / 2;
                   
                   // Base rect
                   buildingPath += `M${x},${groundY} V${groundY - (buildingH - stepH)} H${x + margin} V${groundY - buildingH} H${x + buildingW - margin} V${groundY - (buildingH - stepH)} H${x + buildingW} V${groundY} Z`;
                   
                   // Windows (100% fill)
                   const rows = Math.floor((buildingH - stepH)/5);
                   const cols = Math.floor(buildingW/4);
                   for(let r=0; r<rows; r++) {
                       for(let c=0; c<cols; c++) {
                           pushWindow(x+2+c*4, groundY - (buildingH - stepH) + 4 + r*4, 1.5, 2);
                       }
                   }
               }
               // Style 2: Spire / Antenna (0.3 - 0.5)
               else if (buildType < 0.5) {
                   const antennaH = 10 + random() * 10;
                   // Body + thin line on top
                   buildingPath += `M${x},${groundY} V${groundY - buildingH} H${x + buildingW/2 - 1} V${groundY - buildingH - antennaH} H${x + buildingW/2 + 1} V${groundY - buildingH} H${x+buildingW} V${groundY} Z`;
                   
                   // Windows (100% fill)
                   const rows = Math.floor(buildingH/5);
                   const cols = Math.floor(buildingW/4);
                   for(let r=0; r<rows; r++) {
                       for(let c=0; c<cols; c++) {
                           pushWindow(x+2+c*4, groundY - buildingH + 4 + r*5, 1.5, 2);
                       }
                   }
               }
               // Style 3: Slanted Roof (0.5 - 0.7)
               else if (buildType < 0.7) {
                   const shortH = buildingH * 0.8;
                   // L-R slant or R-L slant
                   if (random() > 0.5) {
                       // Left higher
                       buildingPath += `M${x},${groundY} V${groundY - buildingH} L${x + buildingW},${groundY - shortH} V${groundY} Z`;
                   } else {
                       // Right higher
                       buildingPath += `M${x},${groundY} V${groundY - shortH} L${x + buildingW},${groundY - buildingH} V${groundY} Z`;
                   }
                   
                   // Windows (100% fill)
                   const rows = Math.floor(shortH/5);
                   const cols = Math.floor(buildingW/4);
                   for(let r=0; r<rows; r++) {
                       for(let c=0; c<cols; c++) {
                           pushWindow(x+2+c*4, groundY - shortH + 4 + r*5, 1.5, 1.5);
                       }
                   }
               }
               // Style 4: Standard Box (Default)
               else {
                   buildingPath += `M${x},${groundY} V${groundY - buildingH} H${x + buildingW} V${groundY} Z`;
                   
                   // Windows (100% fill)
                   const rows = Math.floor(buildingH/6);
                   const cols = Math.floor(buildingW/5);
                   for(let r=0; r<rows; r++) {
                       for(let c=0; c<cols; c++) {
                           pushWindow(x+3+c*5, groundY - buildingH + 5 + r*6, 2, 2);
                       }
                   }
               }
               
               // Add the path object
               buildings.push({ d: buildingPath });
           }
        }
      }
        
        // Add trees if this layer has them
        if (treeHeight > 0) {
          const treeW = 12 + random() * 18; // 12-30px width
          const treeH = treeHeight * (0.8 + random() * 0.5); // Taller, varied height
          const centerX = x + treeW / 2;
          
          // Realistic Detail: More segments (High density: ~3-4px per segment)
          const segments = Math.floor(treeH / 3.5) + 3;
          
          // Start at base left corner
          d += ` L${x},${y}`; 
          
          // Left side (climbing up)
          for (let i = 0; i < segments; i++) {
            const ratio = i / segments;
            const nextRatio = (i + 1) / segments;
            
            const currentY = y - treeH * ratio;
            const nextY = y - treeH * nextRatio;
            
            // Curved taper for spruce/pine look (Power curve)
            const currentHalfW = (treeW / 2) * Math.pow(1 - ratio, 1.15);
            const nextHalfW = (treeW / 2) * Math.pow(1 - nextRatio, 1.15);

            // Jitter for organic unevenness
            const jitter = (random() - 0.5) * 1.5; 
            
            // Next Tip (Branch End)
            const nextTipX = centerX - (nextHalfW + jitter);

            // "Notch" - the indent between branch layers
            if (i === 0) {
              // FIX: Skip inward notch for the base segment to avoid "floating" look.
              // Connect strictly to the next tip.
              d += ` L${nextTipX},${nextY}`;
            } else {
              const notchY = currentY - (currentY - nextY) * (0.35 + random() * 0.2);
              // Indent is relative to the width at that height
              const indentFactor = 0.5 + random() * 0.25; 
              const notchX = centerX - (currentHalfW * indentFactor + jitter); 
              
              d += ` L${notchX},${notchY}`;
              d += ` L${nextTipX},${nextY}`;
            }
          }
          
          // Apex / Top Point
          d += ` L${centerX},${y - treeH}`;

          // Right side (climbing down)
          for (let i = segments - 1; i >= 0; i--) {
            const ratio = i / segments;
            const nextRatio = (i + 1) / segments;
            
            const currentY = y - treeH * ratio; // Bottom of segment
            const nextY = y - treeH * nextRatio; // Top of segment
            
            const currentHalfW = (treeW / 2) * Math.pow(1 - ratio, 1.15);
            
            const jitter = (random() - 0.5) * 1.5;
            
            const bottomTipX = centerX + (currentHalfW + jitter);

            // Notch logic mirrored
            if (i === 0) {
               // Skip inward notch at base
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
          // Just move forward for smooth mountains
          // CITY TWEAK: Smaller steps in city area = more buildings
          const step = (hasCity && x < 850) ? 8 : 20;
          x += step;
          d += ` L${x},${y}`;
        }
      }
      
      d += ` V1080 H0 Z`;
      return { d, windows, buildings, lighthouseGlow };
    };

    // Layer 2: Distant Ridges - Smoother with City
    const l2 = createPath(790, 110, 4, 0, 0.0025, 1.0, true, true);
    layers.push({
      d: l2.d,
      windows: l2.windows,
      buildings: l2.buildings,
      fill: '#1b223d',
      key: 'layer2',
      lighthouseGlow: l2.lighthouseGlow // Only this layer can have the glow
    });

    // Layer 3: Mid-ground - Rolling hills with distant tiny trees
    layers.push({
      d: createPath(820, 70, 10, 20, 0.0035, 0.8).d, // 0.8 density for slight overlap
      windows: [],
      buildings: [],
      fill: '#14182e',
      key: 'layer3'
    });

    // Layer 4: Near Hills - Distinct forest silhouette
    layers.push({
      d: createPath(920, 50, 5, 45, 0.003, 0.7).d, // More overlap for dense forest
      windows: [],
      buildings: [],
      fill: '#0d1021',
      key: 'layer4'
    });

    // Layer 5: Foreground - Close up detailed trees
    layers.push({
      d: createPath(1020, 30, 5, 80, 0.004, 0.65).d, // High overlap for detail
      windows: [],
      buildings: [],
      fill: '#05060e',
      key: 'layer5'
    });

    return layers;
  }, []);

  // Calculate dynamic beam path based on mouse position
  // Find the lighthouse coordinates first (it's in layer2 usually)
  const lhLayer = mountainLayers.find(l => l.lighthouseGlow);
  const lhCx = lhLayer?.lighthouseGlow?.cx || 0;
  const lhCy = lhLayer?.lighthouseGlow?.cy || 0;

  // Calculate beam paths - Returns an object, so we need to split it for Framer Motion
  const beamValues = useTransform([mouseX, mouseY], ([mx, my]) => {
     if (!lhCx || !lhCy) return { outer: "", inner: "", core: "" };
     
     const dx = (mx as number) - lhCx;
     const dy = (my as number) - lhCy;
     const dist = Math.sqrt(dx*dx + dy*dy);
     
     // Beam shouldn't render if very close (avoids glitches)
     if (dist < 5) return { outer: "", inner: "", core: "" };

     const angle = Math.atan2(dy, dx);
     const perpAngle = angle + Math.PI / 2;
     
     const geometryDist = dist * 1.6;
     
     const endX = lhCx + Math.cos(angle) * geometryDist;
     const endY = lhCy + Math.sin(angle) * geometryDist;

     // Helper to build a cone path
     const getPath = (startW: number, endWBase: number) => { 
        const oxStart = Math.cos(perpAngle) * (startW / 2);
        const oyStart = Math.sin(perpAngle) * (startW / 2);
        
        // Width also grows with distance
        const endW = endWBase * 1.4; 
        
        const oxEnd = Math.cos(perpAngle) * (endW / 2);
        const oyEnd = Math.sin(perpAngle) * (endW / 2);

        // Start from lighthouse
        const pStart1x = lhCx + oxStart;
        const pStart1y = lhCy + oyStart;
        const pStart2x = lhCx - oxStart;
        const pStart2y = lhCy - oyStart;

        // End point
        const pEnd1x = endX + oxEnd;
        const pEnd1y = endY + oyEnd;
        const pEnd2x = endX - oxEnd;
        const pEnd2y = endY - oyEnd;

        return `M${pStart1x},${pStart1y} L${pEnd1x},${pEnd1y} L${pEnd2x},${pEnd2y} L${pStart2x},${pStart2y} Z`;
     };

     // 1. Outer Haze (Wide, soft)
     const outerPath = getPath(10, 150 + dist * 0.15);

     // 2. Inner Beam (Brighter main body)
     const innerPath = getPath(6, 60 + dist * 0.08);

     // 3. Core Hotline (Intense center)
     const corePath = getPath(2, 5 + dist * 0.01);

     return { outer: outerPath, inner: innerPath, core: corePath };
  });

  const outerBeamPath = useTransform(beamValues, v => v.outer);
  const innerBeamPath = useTransform(beamValues, v => v.inner);
  const coreBeamPath = useTransform(beamValues, v => v.core);

  // Dynamic radius for the fade mask so it always matches cursor distance
  const maskRadius = useTransform([mouseX, mouseY], ([mx, my]) => {
     if (!lhCx || !lhCy) return 0;
     const dx = (mx as number) - lhCx;
     const dy = (my as number) - lhCy;
     const dist = Math.sqrt(dx*dx + dy*dy);
     return dist; 
  });

  // Splash Opacity - Fades out if cursor is too far (Range Limit)
  const splashOpacity = useTransform([mouseX, mouseY], ([mx, my]) => {
     if (!lhCx || !lhCy) return 0;
     const dx = (mx as number) - lhCx;
     const dy = (my as number) - lhCy;
     const dist = Math.sqrt(dx*dx + dy*dy);

    // Define max effective range
    const maxRange = 1300; 
    const fadeRange = 400;
     
     if (dist > maxRange) return 0;
     
     // Smooth fade out as it approaches the limit
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
          <radialGradient id="lighthouse-glow" cx="50%" cy="50%" r="50%">
            {/* Hot white core (lens intensity) */}
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            {/* Warm transition */}
            <stop offset="20%" stopColor="#fff4cc" stopOpacity="0.9" />
            {/* Atmospheric scatter (haze) */}
            <stop offset="50%" stopColor="#ffdd44" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffaa00" stopOpacity="0" />
          </radialGradient>

          {/* Volumetric Beam Gradient (Radial to fade out with distance) */}
           {/* Note: We use userSpaceOnUse so it stays centered on the lighthouse regardless of the path shape */}
          <radialGradient 
              id="volumetric-beam-gradient" 
              cx={lhCx} cy={lhCy} r="1000" 
              gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="15%" stopColor="#fff8db" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#ffaa44" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>

          {/* Core Beam Gradient - Stays white longer but fades out matching the geometry */}
          <radialGradient 
              id="core-beam-gradient" 
              cx={lhCx} cy={lhCy} r="1000" 
              gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* Dynamic Mask to ensure fade out happens exactly at cursor distance */}
          <mask id="beam-fade-mask">
             {/* 
                 Radius R = dist.
                 White up to 70%, then fades to black at 100%.
                 White up to 0.7 * dist.
                 Fades from 0.7 * dist to dist.
                 At dist (cursor), opacity is 0 (Black).
                 This ensures the beam ends EXACTLY at the cursor.
             */}
             <radialGradient id="fade-gradient-mask">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="70%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="black" stopOpacity="1" />
             </radialGradient>
             <motion.circle cx={lhCx} cy={lhCy} r={maskRadius} fill="url(#fade-gradient-mask)" />
          </mask>

          {/* Blur Filters for Beam */}
          <filter id="beam-blur-heavy">
             <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
          </filter>
          <filter id="beam-blur-medium">
             <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>

          {/* Static Light Beam Gradient */}
          <linearGradient id="static-beam-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffaa00" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Stars Container - seamless loop */}
        <motion.g style={{ x: starX }}>
          {/* Main set of stars */}
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
          {/* Duplicate set for looping (shifted left) */}
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

        {/* Shooting Star - Rendered before mountains so it goes behind them */}
        {showShootingStar && (
          <g className="shootingStarContainer">
            <defs>
              <linearGradient id="shooting-star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="40%" stopColor="#a5d8ff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>
              <filter id="shooting-star-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Shooting star tail - Tapered path for speed look */}
            <path
              className="shootingStarTail"
              d="M0,0 L140,-1.5 L150,0 L140,1.5 Z"
              fill="url(#shooting-star-gradient)"
              filter="url(#shooting-star-glow)"
            />
            {/* Bright head of the shooting star */}
            <circle
              className="shootingStarHead"
              cx="150"
              cy="0"
              r="3.5"
              fill="#ffffff"
              filter="url(#shooting-star-glow)"
            />
            {/* Cross flare for magical feel */}
            <path
              d="M142,0 L158,0 M150,-8 L150,8"
              stroke="#ffffff"
              strokeWidth="0.8"
              opacity="0.8"
              filter="url(#shooting-star-glow)"
            />
          </g>
        )}

        {/* Crescent Moon */}
        <g className="moon" transform="translate(1500, 350)">
          {/* Main glowing circle */}
          <circle cx="0" cy="0" r="80" fill="#feffdf" />
          {/* Shadow circle to create crescent shape */}
          <circle cx="-25" cy="-25" r="70" fill="#0b1026" />
        </g>

        {/* Render Generated Layers */}
        {mountainLayers.map((layer) => (
          <React.Fragment key={layer.key}>
            <path
              d={layer.d}
              fill={layer.fill}
              className="landscapeLayer"
            />
            {/* Render Buildings separately on top of mountain */}
            {(layer as any).buildings?.map((b: any, i: number) => (
               <path
                 key={`build-${layer.key}-${i}`}
                 d={b.d}
                 fill={layer.fill} 
                 className="landscapeLayer"
               />
            ))}
            {/* Render Windows */}
            {(layer as any).windows?.map((w: any, i: number) => (
               <rect
                 key={`win-${layer.key}-${i}`}
                 x={w.x}
                 y={w.y}
                 width={w.w}
                 height={w.h}
                 rx={w.isCabin ? 0.5 : 0} // Soft corners for cabins
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
                     filter: w.isCabin ? 'blur(0.4px)' : 'none' // Slight blur for realism without expensive svg filters
                 } : {}}
               />
            ))}
            {/* Lighthouse Glow (if present) */}
            {layer.lighthouseGlow && (
              <g className="lighthouseContainer">
                {/* 0. Ground Splash Light (Terrain Illumination) */}
                <defs>
                   <clipPath id={`clip-${layer.key}`}>
                       <path d={layer.d} />
                       {/* Include buildings in the clip path so light hits them too */}
                       {(layer as any).buildings?.map((b: any, i: number) => (
                           <path key={`clip-build-${i}`} d={b.d} />
                       ))}
                   </clipPath>
                </defs>
                <motion.g 
                    style={{ opacity: splashOpacity, mixBlendMode: 'overlay' }} 
                    clipPath={`url(#clip-${layer.key})`}
                >
                   {/* Wide soft glow on the surface */}
                   <motion.ellipse
                      cx={mouseX}
                      cy={mouseY}
                      rx={80}
                      ry={40}
                      fill="url(#lighthouse-glow)"
                      style={{ filter: 'blur(15px)', pointerEvents: 'none' }}
                   />
                   {/* Intense impact point */}
                   <motion.ellipse
                      cx={mouseX}
                      cy={mouseY}
                      rx={30}
                      ry={15}
                      fill="#fff"
                      style={{ filter: 'blur(5px)', pointerEvents: 'none' }}
                   />
                </motion.g>

                {/* Lighthouse beam is always enabled */}
                {/* 1. Outer Wide Haze (Soft, blurry, very faint) */}
                <motion.path
                  className="beamLayer"
                  d={outerBeamPath}
                  fill="url(#volumetric-beam-gradient)"
                  mask="url(#beam-fade-mask)"
                  style={{ mixBlendMode: 'screen', pointerEvents: 'none', filter: 'url(#beam-blur-heavy)' }}
                  opacity={0.4}
                />
                {/* 2. Inner Main Beam (Defined but soft edges) */}
                <motion.path
                  className="beamLayer"
                  d={innerBeamPath}
                  fill="url(#volumetric-beam-gradient)"
                  mask="url(#beam-fade-mask)"
                  style={{ mixBlendMode: 'screen', pointerEvents: 'none', filter: 'url(#beam-blur-medium)' }}
                  opacity={0.7}
                />
                {/* 3. Core Beam (Bright, sharp center) */}
                <motion.path
                  className="beamLayer"
                  d={coreBeamPath}
                  fill="url(#core-beam-gradient)"
                  mask="url(#beam-fade-mask)" 
                  fillOpacity={0.8}
                  style={{ mixBlendMode: 'screen', pointerEvents: 'none', filter: 'blur(2px)' }}
                />
                
                {/* 2. Outer atmospheric halo - Static, realistic haze (reduced brightness) */}
                <ellipse
                  cx={layer.lighthouseGlow.cx}
                  cy={layer.lighthouseGlow.cy}
                  rx={layer.lighthouseGlow.rx * 2}
                  ry={layer.lighthouseGlow.ry * 2}
                  fill="url(#lighthouse-glow)"
                  opacity={0.18}
                />
                {/* 3. Inner bright core - Lower intensity, smaller size */}
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
