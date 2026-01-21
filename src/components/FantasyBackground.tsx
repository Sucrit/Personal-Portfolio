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
      // We will collect separate building rectangles to render ON TOP of the mountain
      // but "planted" into it.
      const buildings: {x: number, y: number, w: number, h: number}[] = [];
      const windows: {x: number, y: number, w: number, h: number}[] = [];
      
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
        if (hasCity && x < 750) {
           // Very high chance (90%) to place a building for maximum density
           if (random() > 0.1) {
               const buildingW = 10 + random() * 20; // 10-30px width
               const buildingH = 15 + random() * 40; // 15-55px height
               
               // Building sits at (x, y). 
               // To look "planted", we can nudge it down 1-2px
               buildings.push({
                   x: x,
                   y: y - buildingH + 3, 
                   w: buildingW,
                   h: buildingH
               });

               // Windows for this building
               if (random() > 0.2) {
                   const rows = Math.floor(buildingH / 4);
                   const cols = Math.floor(buildingW / 4);
                   for(let r=0; r<rows; r++) {
                       for(let c=0; c<cols; c++) {
                           // Chaotic window lighting for realism
                           if (random() > 0.5) {
                               windows.push({
                                   x: x + 2 + c * 4,
                                   y: y - buildingH + 4 + r * 4,
                                   w: 1.5,
                                   h: 1.5
                               });
                           }
                       }
                   }
               }
           }
        }
        
        // Add trees if this layer has them
        if (treeHeight > 0) {
          const treeW = 12 + random() * 12; // Slightly wider variance
          const treeH = treeHeight * (0.8 + random() * 0.5); // More height variance
          const centerX = x + treeW / 2;
          
          // Pine tree layers (3-6 layers depending on height)
          const segments = Math.floor(3 + random() * 3);
          
          // Left side (climbing up)
          d += ` L${x},${y}`; // Start at base
          for (let i = 0; i < segments; i++) {
            const ratio = i / segments;
            const nextRatio = (i + 1) / segments;
            
            const currentY = y - treeH * ratio;
            const nextY = y - treeH * nextRatio;
            
            const currentHalfW = (treeW / 2) * (1 - ratio * 0.8); // Tapering
            const nextHalfW = (treeW / 2) * (1 - nextRatio * 0.8);
            
            // "Notch" or "Indent" point - make it curve slightly upward
            const notchY = currentY - (currentY - nextY) * 0.15;
            // Indent inwards towards center
            const notchX = centerX - (currentHalfW * 0.6); 
            
            d += ` L${notchX},${notchY}`;
            d += ` L${centerX - nextHalfW},${nextY}`;
          }
          
          // Top point
          d += ` L${centerX},${y - treeH}`;

          // Right side (climbing down)
          for (let i = segments - 1; i >= 0; i--) {
            const ratio = i / segments;
            const nextRatio = (i + 1) / segments;
            
            const bottomY = y - treeH * ratio;
            const topY = y - treeH * nextRatio;
            
            const bottomHalfW = (treeW / 2) * (1 - ratio * 0.8);
            
            const notchY = bottomY - (bottomY - topY) * 0.15;
            const notchX = centerX + (bottomHalfW * 0.6);
            
            d += ` L${notchX},${notchY}`;
            d += ` L${centerX + bottomHalfW},${bottomY}`;
          }

          x += treeW * density; 
        } else {
          // Just move forward for smooth mountains
          x += 20;
          d += ` L${x},${y}`;
        }
      }
      
      d += ` V1080 H0 Z`;
      return { d, windows, buildings };
    };

    // Layer 2: Distant Ridges - Smoother with City
    const l2 = createPath(790, 110, 4, 0, 0.0025, 1.0, true, true);
    layers.push({
      d: l2.d,
      windows: l2.windows,
      buildings: l2.buildings,
      fill: '#1b223d',
      key: 'layer2'
    });

    // Layer 3: Mid-ground - Rolling hills with distant tiny trees
    layers.push({
      d: createPath(820, 70, 10, 20, 0.0035, 0.8).d, // 0.8 density for slight overlap
      fill: '#14182e', 
      key: 'layer3'
    });

    // Layer 4: Near Hills - Distinct forest silhouette
    layers.push({
      d: createPath(920, 50, 5, 45, 0.003, 0.7).d, // More overlap for dense forest
      fill: '#0d1021',
      key: 'layer4'
    });

    // Layer 5: Foreground - Close up detailed trees
    layers.push({
      d: createPath(1020, 30, 5, 80, 0.004, 0.65).d, // High overlap for detail
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
               <rect
                 key={`build-${layer.key}-${i}`}
                 x={b.x}
                 y={b.y}
                 width={b.w}
                 height={b.h}
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
                 fill="#fff6a9"
                 opacity={Math.random() * 0.4 + 0.3}
                 className="cityWindow"
               />
            ))}
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
};

export default FantasyBackground;
