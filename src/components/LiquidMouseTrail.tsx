import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  pressure: number;
  density: number;
  color: { r: number; g: number; b: number };
}

const LiquidMouseTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const animationId = useRef<number>();

  // Fluid simulation parameters
  const SMOOTHING_RADIUS = 50;
  const REST_DENSITY = 1000;
  const PRESSURE_MULTIPLIER = 0.5;
  const VISCOSITY = 0.1;
  const GRAVITY = 0.1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Smoothing kernel function for SPH (Smoothed Particle Hydrodynamics)
    const smoothingKernel = (distance: number, radius: number): number => {
      if (distance >= radius) return 0;
      const volume = (Math.PI * Math.pow(radius, 4)) / 6;
      return Math.max(0, radius - distance) ** 2 / volume;
    };

    // Calculate density for each particle
    const calculateDensity = (particle: Particle): number => {
      let density = 0;
      particles.current.forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        density += smoothingKernel(distance, SMOOTHING_RADIUS);
      });
      return density;
    };

    // Calculate pressure force
    const calculatePressureForce = (particle: Particle): { fx: number; fy: number } => {
      let fx = 0, fy = 0;
      
      particles.current.forEach(otherParticle => {
        if (particle === otherParticle) return;
        
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0 && distance < SMOOTHING_RADIUS) {
          const pressure = (particle.pressure + otherParticle.pressure) / 2;
          const force = pressure * smoothingKernel(distance, SMOOTHING_RADIUS);
          
          fx += (dx / distance) * force;
          fy += (dy / distance) * force;
        }
      });
      
      return { fx: fx * PRESSURE_MULTIPLIER, fy: fy * PRESSURE_MULTIPLIER };
    };

    // Calculate viscosity force
    const calculateViscosityForce = (particle: Particle): { fx: number; fy: number } => {
      let fx = 0, fy = 0;
      
      particles.current.forEach(otherParticle => {
        if (particle === otherParticle) return;
        
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0 && distance < SMOOTHING_RADIUS) {
          const velocityDiffX = otherParticle.vx - particle.vx;
          const velocityDiffY = otherParticle.vy - particle.vy;
          const viscosityForce = smoothingKernel(distance, SMOOTHING_RADIUS);
          
          fx += velocityDiffX * viscosityForce * VISCOSITY;
          fy += velocityDiffY * viscosityForce * VISCOSITY;
        }
      });
      
      return { fx, fy };
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.prevX = mouse.current.x;
      mouse.current.prevY = mouse.current.y;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Calculate mouse velocity
      const mouseVelX = mouse.current.x - mouse.current.prevX;
      const mouseVelY = mouse.current.y - mouse.current.prevY;
      const mouseSpeed = Math.sqrt(mouseVelX * mouseVelX + mouseVelY * mouseVelY);

      // Create new particles based on mouse speed
      const particleCount = Math.min(Math.floor(mouseSpeed * 0.15) + 1, 3);
      
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spread = 15;
        
        particles.current.push({
          x: mouse.current.x + Math.cos(angle) * spread * Math.random(),
          y: mouse.current.y + Math.sin(angle) * spread * Math.random(),
          vx: mouseVelX * 0.1 + (Math.random() - 0.5) * 2,
          vy: mouseVelY * 0.1 + (Math.random() - 0.5) * 2,
          life: 0,
          maxLife: 60 + Math.random() * 30,
          size: 2 + Math.random() * 2,
          pressure: 0,
          density: REST_DENSITY,
          color: {
            r: 20 + Math.random() * 80,   // Soft blue-cyan tones
            g: 120 + Math.random() * 135, // Vibrant cyan-green range
            b: 220 + Math.random() * 35   // Strong blue component
          }
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update particle physics
      particles.current.forEach(particle => {
        // Calculate density
        particle.density = calculateDensity(particle);
        
        // Calculate pressure
        particle.pressure = PRESSURE_MULTIPLIER * (particle.density - REST_DENSITY);
      });

      // Apply forces and update positions
      particles.current = particles.current.filter(particle => {
        particle.life++;
        
        if (particle.life > particle.maxLife) return false;

        // Calculate forces
        const pressureForce = calculatePressureForce(particle);
        const viscosityForce = calculateViscosityForce(particle);

        // Apply forces
        particle.vx += pressureForce.fx + viscosityForce.fx;
        particle.vy += pressureForce.fy + viscosityForce.fy + GRAVITY;

        // Apply damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary collision with damping
        if (particle.x < particle.size) {
          particle.x = particle.size;
          particle.vx *= -0.5;
        }
        if (particle.x > canvas.width - particle.size) {
          particle.x = canvas.width - particle.size;
          particle.vx *= -0.5;
        }
        if (particle.y < particle.size) {
          particle.y = particle.size;
          particle.vy *= -0.5;
        }
        if (particle.y > canvas.height - particle.size) {
          particle.y = canvas.height - particle.size;
          particle.vy *= -0.3; // Less bouncy on ground
        }

        return true;
      });

      // Render particles with metaball effect
      ctx.globalCompositeOperation = 'source-over';
      
      // Create metaball effect by rendering to an off-screen canvas first
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      
      if (tempCtx) {
        // Render particles to temp canvas
        particles.current.forEach(particle => {
          const alpha = Math.max(0, 1 - (particle.life / particle.maxLife));
          const size = particle.size * (1 + Math.sin(particle.life * 0.1) * 0.2);
          
          // Create radial gradient for each particle
          const gradient = tempCtx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, size * 2
          );
          
          gradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha * 0.36})`);
          gradient.addColorStop(0.3, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha * 0.24})`);
          gradient.addColorStop(0.7, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha * 0.12})`);
          gradient.addColorStop(1, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`);

          tempCtx.fillStyle = gradient;
          tempCtx.beginPath();
          tempCtx.arc(particle.x, particle.y, size * 2, 0, Math.PI * 2);
          tempCtx.fill();
        });

        // Apply blur effect for smoother fluid appearance
        ctx.filter = 'blur(2px) contrast(1.05) brightness(1.0)';
        ctx.drawImage(tempCanvas, 0, 0);
        ctx.filter = 'none';
      }

      // Draw connections between nearby particles for fluid cohesion
      particles.current.forEach((particle, i) => {
        particles.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < SMOOTHING_RADIUS * 0.5) {
            const alpha = (1 - distance / (SMOOTHING_RADIUS * 0.5)) * 0.05;
            const avgR = (particle.color.r + otherParticle.color.r) / 2;
            const avgG = (particle.color.g + otherParticle.color.g) / 2;
            const avgB = (particle.color.b + otherParticle.color.b) / 2;
            
            ctx.strokeStyle = `rgba(${avgR}, ${avgG}, ${avgB}, ${alpha})`;
            ctx.lineWidth = alpha * 4;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      // Limit particles for performance
      if (particles.current.length > 80) {
        particles.current = particles.current.slice(-80);
      }

      animationId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ mixBlendMode: 'lighten', opacity: 0.5 }}
    />
  );
};

export default LiquidMouseTrail;