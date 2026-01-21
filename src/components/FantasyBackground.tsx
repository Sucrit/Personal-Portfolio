import React, { useMemo } from 'react';
import './FantasyBackground.css';

const FantasyBackground: React.FC = () => {
  // Generate random stars
  const stars = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => ({
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
      const windows: {x: number, y: number, w: number, h: number, delay: number, duration: number, animationType: 'none' | 'toggle' | 'flicker', isOn: boolean, color?: string}[] = [];
      
      let lighthouseBuilt = false;
      let lighthouseGlow: { cx: number, cy: number, rx: number, ry: number } | null = null;
      
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
          const treeW = 15 + random() * 15; // Realistic: Wider, variable base
          const treeH = treeHeight * (0.9 + random() * 0.6); // Taller, varied height
          const centerX = x + treeW / 2;
          
          // Realistic Detail: More segments (6-10 layers)
          const segments = Math.floor(6 + random() * 5);
          
          // Left side (climbing up)
          d += ` L${x},${y}`; // Start at base left corner
          
          for (let i = 0; i < segments; i++) {
            const ratio = i / segments;
            const nextRatio = (i + 1) / segments;
            
            const currentY = y - treeH * ratio;
            const nextY = y - treeH * nextRatio;
            
            // Width calculations with jitter for "rough" look
            // Base width at this level (cone shape)
            const currentBaseW = (treeW / 2) * (1 - ratio * 0.85);
            // Tip width at next level
            const nextBaseW = (treeW / 2) * (1 - nextRatio * 0.85);

            // Jitter/Randomness for realistic silhouette
            const jitter = (random() - 0.5) * (treeW * 0.15); 
            
            // "Notch" is the indent between branches
            const notchY = currentY - (currentY - nextY) * (0.15 + random() * 0.1);
            const notchDepth = 0.6 + random() * 0.2; // How deep the indent goes
            const notchX = centerX - (currentBaseW * notchDepth + jitter); 

            // Next Tip (Branch End)
            const nextTipX = centerX - (nextBaseW + jitter);
            
            d += ` L${notchX},${notchY}`;
            d += ` L${nextTipX},${nextY}`;
          }
          
          // Apex / Top Point
          d += ` L${centerX},${y - treeH}`;

          // Right side (climbing down)
          for (let i = segments - 1; i >= 0; i--) {
            const ratio = i / segments;
            const nextRatio = (i + 1) / segments;
            
            const currentY = y - treeH * ratio; // The "bottom" of this segment (we are going down to it)
            const nextY = y - treeH * nextRatio; // The "top" of this segment (we are coming from it)
            
            const currentBaseW = (treeW / 2) * (1 - ratio * 0.85);
            
            const jitter = (random() - 0.5) * (treeW * 0.15);

            // Notch logic mirrored
            const notchY = currentY - (currentY - nextY) * (0.15 + random() * 0.1);
            const notchDepth = 0.6 + random() * 0.2;
            const notchX = centerX + (currentBaseW * notchDepth + jitter);
            
            const bottomTipX = centerX + (currentBaseW + jitter);
            
            d += ` L${notchX},${notchY}`;
            d += ` L${bottomTipX},${currentY}`;
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

  return (
    <div className="fantasyContainer">
      <div className="glow" />
      
      <svg
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
        </defs>

        {/* Stars */}
        <g>
          {stars.map((star) => (
            <circle
              key={star.id}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="white"
              fillOpacity={star.opacity}
              className="star"
              style={{ animationDelay: star.delay }}
            />
          ))}
        </g>

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
                 fill={layer.fill} // Same color as mountain to look connected
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
                 fill={w.isOn ? (w.color || "#fff6a9") : layer.fill} // Use custom color if set
                 // Opacity: If animated, let CSS handle it. If static ON, use randomization. If OFF, solid 1 (to block)
                 opacity={w.isOn ? (w.animationType !== 'none' ? undefined : 0.8) : 1}
                 className="cityWindow"
                 style={w.isOn && w.animationType !== 'none' ? {
                     animationName: w.animationType === 'flicker' ? 'flickerWindow' : 'toggleWindow',
                     animationDuration: `${w.duration}s`,
                     animationDelay: `${w.delay}s`,
                     animationIterationCount: 'infinite',
                     animationFillMode: 'both',
                     willChange: 'opacity'
                 } : {}}
               />
            ))}
            {/* Lighthouse Glow (if present) */}
            {layer.lighthouseGlow && (
              <g className="lighthouseContainer">
                {/* Outer atmospheric halo - Static, realistic haze */}
                <ellipse
                  cx={layer.lighthouseGlow.cx}
                  cy={layer.lighthouseGlow.cy}
                  rx={layer.lighthouseGlow.rx * 2}
                  ry={layer.lighthouseGlow.ry * 2}
                  fill="url(#lighthouse-glow)"
                  opacity={0.3}
                />
                {/* Inner bright core - High intensity */}
                <ellipse
                  cx={layer.lighthouseGlow.cx}
                  cy={layer.lighthouseGlow.cy}
                  rx={layer.lighthouseGlow.rx}
                  ry={layer.lighthouseGlow.ry}
                  fill="url(#lighthouse-glow)"
                  opacity={0.9}
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
