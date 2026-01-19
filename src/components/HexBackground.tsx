import { useEffect, useRef } from 'react';

const HexBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let hexagons: Hexagon[] = [];
    
    // Configuration
    const hexSize = 25; // Size of each hexagon
    const hexHeight = hexSize * 2;
    const hexWidth = Math.sqrt(3) * hexSize;
    const vertDist = hexHeight * 0.75;
    const horizDist = hexWidth;
    
    // Mouse state
    const mouse = { x: -1000, y: -1000 };

    class Hexagon {
      x: number;
      y: number;
      health: number; // 0 to 100
      targetHealth: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.health = 100;
        this.targetHealth = 100;
      }

      update() {
        // Calculate distance to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Interaction radius
        if (dist < 100) {
            // "Damage" the shield
            this.targetHealth = 0;
        } else {
            // Regenerate
            this.targetHealth = 100;
        }

        // Smooth transition
        this.health += (this.targetHealth - this.health) * 0.1;
      }

      draw(context: CanvasRenderingContext2D) {
        // Opacity based on health (Healthy = dim, Damaged = bright/glowing)
        // Actually for a shield: usually invisible/dim until hit? 
        // Let's go with: Dim Hex Grid usually (monitoring). 
        // When hovered: Bright Cyan/Red pulse (Active Defense).
        
        // Inverting the logic for visual coolness:
        // Health 100 -> Opacity 0.05 (Subtle)
        // Health 0 -> Opacity 0.8 (Active)
        
        const intensity = 1 - (this.health / 100);
        
        context.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = 2 * Math.PI / 6 * (i + 0.5);
          const x_i = this.x + hexSize * Math.cos(angle);
          const y_i = this.y + hexSize * Math.sin(angle);
          if (i === 0) context.moveTo(x_i, y_i);
          else context.lineTo(x_i, y_i);
        }
        context.closePath();

        // Color Logic
        // Base: Slate/Blue. Active: Cyan/Green.
        const r = Math.floor(6 + (34 * intensity)); // 06 to 22 (hex)
        const g = Math.floor(182 + (15 * intensity)); // b6 to c5
        const b = 212; // d4 fixed

        // Stroke
        context.strokeStyle = `rgba(${6 + 100*intensity}, ${182}, ${212}, ${0.1 + intensity * 0.8})`;
        context.lineWidth = 1 + intensity * 2;
        context.stroke();

        // Fill - only when active
        if (intensity > 0.1) {
            context.fillStyle = `rgba(${6}, ${182}, ${212}, ${intensity * 0.15})`;
            context.fill();
        }
      }
    }

    const init = () => {
        hexagons = [];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const rows = Math.ceil(canvas.height / vertDist);
        const cols = Math.ceil(canvas.width / horizDist);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const xOffset = (r % 2) * (hexWidth / 2);
                const x = c * horizDist + xOffset;
                const y = r * vertDist;
                hexagons.push(new Hexagon(x, y));
            }
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        hexagons.forEach(hex => {
            hex.update();
            hex.draw(ctx);
        });

        animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    const handleResize = () => {
        init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    init();
    animate();

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'var(--bg-color)', // Fallback / Base
      }}
    />
  );
};

export default HexBackground;
