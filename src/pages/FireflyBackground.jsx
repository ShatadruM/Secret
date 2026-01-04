import React, { useRef, useEffect } from 'react';

const FireflyBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // --- MOUSE TRACKING SETUP ---
    let mouse = {
      x: null,
      y: null,
      // How far away can the mouse influence a firefly (in pixels)
      radius: 200 
    };

    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    // Stop attraction if mouse leaves the window
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);


    // --- CONFIGURATION ---
    const PARTICLE_DENSITY = 15000; 
    const MIN_RADIUS = 1;
    const MAX_RADIUS = 3.5;
    // Increased base speed slightly so they don't stop completely due to friction
    const BASE_SPEED = 1.5; 
    const GLOW_SPEED = 0.005; 
    const BASE_COLOR = '60, 160, 255'; 
    
    // PHYSICS CONSTANTS
    const FRICTION = 0.99; // Air resistance (lower = more resistance)
    const MOUSE_FORCE = 0.05; // Strength of the attraction pull
    // ---------------------


    // --- PARTICLE CLASS ---
    class Firefly {
      constructor(w, h) {
        this.w = w;
        this.h = h;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.radius = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
        // Initial random velocity
        this.vx = (Math.random() - 0.5) * BASE_SPEED;
        this.vy = (Math.random() - 0.5) * BASE_SPEED;
        
        this.alpha = Math.random() * 0.5 + 0.5; 
        this.alphaDirection = Math.random() > 0.5 ? 1 : -1; 
      }

      update() {
        // 1. CALCULATE MOUSE INTERACTION
        if (mouse.x != null) {
          // Distance between firefly and mouse
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            // Calculate a normalized vector pointing to the mouse
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;

            // Calculate pull strength based on distance (stronger closer to center)
            const forceMultiplier = (mouse.radius - distance) / mouse.radius;
            
            // Apply the force to the velocity (Acceleration)
            this.vx += forceDirectionX * forceMultiplier * MOUSE_FORCE;
            this.vy += forceDirectionY * forceMultiplier * MOUSE_FORCE;
          }
        }

        // 2. APPLY PHYSICS & MOVEMENT
        // Apply Friction to naturally slow them down over time
        this.vx *= FRICTION;
        this.vy *= FRICTION;

        // Ensure a tiny bit of minimum random movement so they don't stop completely
        // if friction overcomes the initial velocity.
        this.vx += (Math.random() - 0.5) * 0.05;
        this.vy += (Math.random() - 0.5) * 0.05;
        
        // Update Position
        this.x += this.vx;
        this.y += this.vy;

        // 3. WRAP AROUND SCREEN
        if (this.x < -this.radius * 5) this.x = this.w + this.radius * 5;
        if (this.x > this.w + this.radius * 5) this.x = -this.radius * 5;
        if (this.y < -this.radius * 5) this.y = this.h + this.radius * 5;
        if (this.y > this.h + this.radius * 5) this.y = -this.radius * 5;

        // 4. PULSE GLOW
        this.alpha += GLOW_SPEED * this.alphaDirection;
        if (this.alpha >= 1) {
            this.alpha = 1;
            this.alphaDirection = -1;
        } else if (this.alpha <= 0.2) {
            this.alpha = 0.2;
            this.alphaDirection = 1;
        }
      }

      draw(ctx) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 4);
        gradient.addColorStop(0, `rgba(${BASE_COLOR}, ${this.alpha})`);
        gradient.addColorStop(1, `rgba(${BASE_COLOR}, 0)`);

        ctx.fillStyle = gradient;
        // Draw slightly larger area to contain the soft glow gradient
        ctx.arc(this.x, this.y, this.radius * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }
    }

    // --- INITIALIZATION & LOOP ---
    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const area = canvas.width * canvas.height;
      const numParticles = Math.floor(area / PARTICLE_DENSITY);
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Firefly(canvas.width, canvas.height));
      }
    };

    const render = () => {
      // Use semi-transparent clear for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    init();
    render();

    window.addEventListener('resize', init);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[0]" 
      style={{ background: '#000' }} 
    />
  );
};

export default FireflyBackground;