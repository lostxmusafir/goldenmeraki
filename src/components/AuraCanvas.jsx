import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Play, Pause, RefreshCw, Download, Info, X } from 'lucide-react';
import { CHAKRAS } from '../data/products';

export const AuraCanvas = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);
  const [selectedChakra, setSelectedChakra] = useState(CHAKRAS[0]); // Crown by default
  const [isAnimating, setIsAnimating] = useState(true);
  const [particleDensity, setParticleDensity] = useState(60);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = canvas.parentElement.clientWidth || 600;
    canvas.height = 450;

    let animationFrameId;
    let time = 0;

    // Generate energy particles based on selected chakra
    const particles = Array.from({ length: particleDensity }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 4 + 1.5,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
      angle: Math.random() * Math.PI * 2,
      orbitRadius: Math.random() * 120 + 30,
      alpha: Math.random() * 0.7 + 0.3
    }));

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 139, g: 92, b: 246 };
    };

    const colorRgb = hexToRgb(selectedChakra.color);

    const render = () => {
      time += 0.02;

      // Bright clean canvas background gradient (Strictly no black background!)
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 20,
        canvas.width / 2, canvas.height / 2, canvas.width / 1.2
      );
      bgGradient.addColorStop(0, '#ffffff');
      bgGradient.addColorStop(0.5, '#faf5ff');
      bgGradient.addColorStop(1, '#f3e8ff');

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw Sacred Geometry Circles & Aura Rays
      ctx.save();
      ctx.translate(centerX, centerY);

      // Rotating Sacred Flower of Life / Energy Grid
      const rings = 6;
      for (let r = 1; r <= rings; r++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${0.15 - r * 0.02})`;
        ctx.lineWidth = 1.5;
        const radius = r * 28 + Math.sin(time + r) * 6;
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Radiating spokes
        const spokes = 12;
        for (let s = 0; s < spokes; s++) {
          const angle = (s * Math.PI * 2) / spokes + time * 0.1 * (r % 2 === 0 ? 1 : -1);
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * (radius - 15), Math.sin(angle) * (radius - 15));
          ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
          ctx.strokeStyle = `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${0.2})`;
          ctx.stroke();
        }
      }

      ctx.restore();

      // Render Dynamic Energy Particles
      particles.forEach((p) => {
        p.angle += 0.01;
        p.x = centerX + Math.cos(p.angle + time * 0.5) * p.orbitRadius + Math.sin(time) * 10;
        p.y = centerY + Math.sin(p.angle + time * 0.5) * p.orbitRadius + Math.cos(time) * 10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Particle Glow Gradient
        const pGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        pGlow.addColorStop(0, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${p.alpha})`);
        pGlow.addColorStop(1, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0)`);

        ctx.fillStyle = pGlow;
        ctx.fill();

        // Connect nearby particles with delicate energy threads
        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 65) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${0.12 * (1 - dist / 65)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      // Overlay Subtle Center Gemstone Node
      ctx.beginPath();
      ctx.arc(centerX, centerY, 16 + Math.sin(time * 2) * 2, 0, Math.PI * 2);
      const gemGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 20);
      gemGrad.addColorStop(0, '#ffffff');
      gemGrad.addColorStop(0.6, selectedChakra.color);
      gemGrad.addColorStop(1, '#4c1d95');
      ctx.fillStyle = gemGrad;
      ctx.shadowColor = selectedChakra.color;
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0; // reset shadow

      // Minimal Visual Accent Text (Per /canvas-design principle: 90% visual, 10% essential text)
      ctx.font = '600 12px "Outfit", sans-serif';
      ctx.fillStyle = '#312e81';
      ctx.textAlign = 'center';
      ctx.fillText(`VIBRATIONAL FREQUENCY • ${selectedChakra.name.toUpperCase()}`, centerX, canvas.height - 24);

      if (isAnimating) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, selectedChakra, isAnimating, particleDensity]);

  const handleDownloadSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `GoldenMeraki-Aura-${selectedChakra.id}.png`;
    link.href = dataUrl;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/40 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-violet-100 flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <h3 className="font-luxury font-bold text-lg text-white">
              Aura Vibrational Energy Canvas
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Canvas Workspace */}
        <div className="p-6 space-y-5 bg-violet-50/50">
          
          {/* Chakra Selection Tabs */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Select Chakra Energy Resonance:
            </div>
            <div className="flex flex-wrap gap-2">
              {CHAKRAS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChakra(ch)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 border ${
                    selectedChakra.id === ch.id
                      ? 'bg-white text-indigo-950 border-violet-500 shadow-sm'
                      : 'bg-white/60 text-slate-600 border-violet-100 hover:bg-white'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ch.color }}></span>
                  <span>{ch.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* HTML5 Canvas Component */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-violet-200 shadow-inner bg-white">
            <canvas ref={canvasRef} className="w-full block" />

            {/* Live Metadata Pill */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-violet-100 text-xs font-bold text-indigo-950 shadow-sm">
              <span>Resonant Stone: </span>
              <span className="text-violet-700">{selectedChakra.stone}</span>
            </div>
          </div>

          {/* Controls & Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-violet-200">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className="px-4 py-2 rounded-xl bg-violet-600 text-white font-bold text-xs flex items-center space-x-1.5 hover:bg-violet-700 transition-colors shadow-sm"
              >
                {isAnimating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isAnimating ? 'Pause Energy Flow' : 'Resume Flow'}</span>
              </button>

              <div className="flex items-center space-x-2 text-xs text-slate-600">
                <span>Particles:</span>
                <input
                  type="range"
                  min="20"
                  max="120"
                  value={particleDensity}
                  onChange={(e) => setParticleDensity(Number(e.target.value))}
                  className="w-24 accent-violet-600 cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={handleDownloadSnapshot}
              className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center space-x-1.5 hover:bg-emerald-100 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Download Aura Art (.PNG)</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
