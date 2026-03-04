"use client";

// ── Gold/black animated gradient mesh background ──
// Ported from Business Builders Club, recolored for PPB brand.
// All animations are pure CSS for GPU acceleration.

const PARTICLE_COLORS = [
  '#FFD700', '#D4AF37', '#FFB800', '#B8860B', '#DAA520',
  '#C5A55A', '#AA8C2C', '#F0E68C', '#FFF5CC'
];

const ORB_COLORS = [
  'rgba(255, 215, 0, 0.7)',   'rgba(212, 175, 55, 0.65)',  'rgba(255, 184, 0, 0.6)',
  'rgba(184, 134, 11, 0.6)',  'rgba(218, 165, 32, 0.55)',  'rgba(240, 230, 140, 0.5)',
  'rgba(255, 215, 0, 0.55)',  'rgba(197, 165, 90, 0.5)',   'rgba(170, 140, 44, 0.5)',
  'rgba(255, 200, 50, 0.5)'
];

const ORB_POSITIONS = [
  { left: 5, top: 5 },   { left: 85, top: 8 },  { left: 15, top: 20 },
  { left: 75, top: 15 },  { left: 45, top: 10 }, { left: 25, top: 35 },
  { left: 65, top: 30 },  { left: 10, top: 45 }, { left: 80, top: 40 },
  { left: 50, top: 25 }
];

const generateParticleConfigs = () =>
  [...Array(80)].map(() => {
    const xMove1 = 30 - Math.random() * 60;
    const xMove2 = 40 - Math.random() * 80;
    const yMove1 = -40 + Math.random() * 80;
    const yMove2 = 50 - Math.random() * 100;
    return {
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 3,
      xMove1, xMove2, yMove1, yMove2,
    };
  });

const PARTICLES = generateParticleConfigs();

// Build all keyframe CSS once at module load
const buildKeyframes = () => {
  let css = '';

  // Particle keyframes
  PARTICLES.forEach((p, i) => {
    css += `
@keyframes p-${i}{
  0%{transform:translate3d(0,0,0);opacity:.3}
  33%{transform:translate3d(${p.xMove1}px,${p.yMove1}px,0);opacity:.7}
  66%{transform:translate3d(${p.xMove2}px,${p.yMove2}px,0);opacity:.4}
  100%{transform:translate3d(0,0,0);opacity:.3}
}`;
  });

  // Orb keyframes
  ORB_POSITIONS.forEach((_, i) => {
    const x1 = 80 + i * 10, x2 = -60 - i * 5;
    const y1 = -70 - i * 8, y2 = 100 + i * 5;
    css += `
@keyframes orb-${i}{
  0%{transform:translate3d(0,0,0);opacity:.35}
  33%{transform:translate3d(${x1}px,${y1}px,0);opacity:.7}
  66%{transform:translate3d(${x2}px,${y2}px,0);opacity:.35}
  100%{transform:translate3d(0,0,0);opacity:.35}
}`;
  });

  // Splash keyframes — gold tones
  css += `
@keyframes gold-splash{
  0%{transform:translate3d(-200px,-100px,0);opacity:.5}
  25%{transform:translate3d(150px,100px,0);opacity:.8}
  50%{transform:translate3d(200px,150px,0);opacity:.85}
  75%{transform:translate3d(-150px,-80px,0);opacity:.65}
  100%{transform:translate3d(-200px,-100px,0);opacity:.5}
}
@keyframes amber-splash{
  0%{transform:translate3d(180px,80px,0);opacity:.4}
  25%{transform:translate3d(-120px,-100px,0);opacity:.65}
  50%{transform:translate3d(-180px,120px,0);opacity:.7}
  75%{transform:translate3d(150px,-80px,0);opacity:.5}
  100%{transform:translate3d(180px,80px,0);opacity:.4}
}
@keyframes hero-gradient{
  0%,100%{
    background:
      radial-gradient(ellipse 1000px 800px at 10% 5%,rgba(212,175,55,.6) 0%,transparent 55%),
      radial-gradient(ellipse 950px 750px at 90% 8%,rgba(255,215,0,.55) 0%,transparent 55%),
      radial-gradient(ellipse 900px 700px at 5% 25%,rgba(184,134,11,.5) 0%,transparent 55%),
      radial-gradient(ellipse 850px 650px at 95% 20%,rgba(218,165,32,.5) 0%,transparent 55%),
      radial-gradient(ellipse 800px 600px at 50% 12%,rgba(255,184,0,.45) 0%,transparent 55%),
      radial-gradient(ellipse 750px 550px at 30% 35%,rgba(240,230,140,.4) 0%,transparent 55%),
      radial-gradient(ellipse 700px 500px at 70% 30%,rgba(197,165,90,.4) 0%,transparent 55%),
      radial-gradient(ellipse 850px 650px at 50% 40%,rgba(170,140,44,.35) 0%,transparent 55%),
      radial-gradient(ellipse 600px 450px at 15% 45%,rgba(255,200,50,.35) 0%,transparent 55%),
      radial-gradient(ellipse 650px 500px at 85% 45%,rgba(212,175,55,.3) 0%,transparent 55%);
  }
  50%{
    background:
      radial-gradient(ellipse 1020px 820px at 90% 8%,rgba(255,184,0,.6) 0%,transparent 55%),
      radial-gradient(ellipse 980px 780px at 10% 5%,rgba(184,134,11,.55) 0%,transparent 55%),
      radial-gradient(ellipse 900px 700px at 95% 25%,rgba(212,175,55,.5) 0%,transparent 55%),
      radial-gradient(ellipse 850px 650px at 5% 20%,rgba(255,215,0,.5) 0%,transparent 55%),
      radial-gradient(ellipse 800px 600px at 50% 15%,rgba(218,165,32,.45) 0%,transparent 55%),
      radial-gradient(ellipse 750px 550px at 70% 35%,rgba(255,200,50,.45) 0%,transparent 55%),
      radial-gradient(ellipse 700px 500px at 30% 30%,rgba(170,140,44,.4) 0%,transparent 55%),
      radial-gradient(ellipse 850px 650px at 50% 42%,rgba(240,230,140,.35) 0%,transparent 55%),
      radial-gradient(ellipse 600px 450px at 85% 48%,rgba(197,165,90,.35) 0%,transparent 55%),
      radial-gradient(ellipse 650px 500px at 15% 42%,rgba(255,215,0,.3) 0%,transparent 55%);
  }
}`;

  return css;
};

const KEYFRAMES_CSS = buildKeyframes();

export default function AnimatedHeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ contain: 'strict', isolation: 'isolate' }}>
      {/* Inject generated keyframes */}
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES_CSS }} />

      {/* Primary gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          animation: 'hero-gradient 10.5s ease-in-out infinite',
          willChange: 'background',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      />

      {/* Floating orbs */}
      {ORB_POSITIONS.map((pos, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${120 + (i % 4) * 40}px`,
            height: `${120 + (i % 4) * 40}px`,
            background: ORB_COLORS[i],
            filter: 'blur(45px)',
            left: `${pos.left}%`,
            top: `${pos.top}%`,
            animation: `orb-${i} ${8 + i * 1.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        />
      ))}

      {/* Gold splash */}
      <div
        className="absolute rounded-full"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255,215,0,0.75) 0%, rgba(212,175,55,0.45) 50%, transparent 100%)',
          filter: 'blur(70px)',
          left: '50%',
          top: '25%',
          marginLeft: '-200px',
          marginTop: '-200px',
          animation: 'gold-splash 14s ease-in-out infinite',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      />

      {/* Amber accent splash */}
      <div
        className="absolute rounded-full"
        style={{
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(218,165,32,0.7) 0%, rgba(184,134,11,0.4) 50%, transparent 100%)',
          filter: 'blur(65px)',
          left: '50%',
          top: '20%',
          marginLeft: '-175px',
          marginTop: '-175px',
          animation: 'amber-splash 18s ease-in-out infinite',
          animationDelay: '2s',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      />

      {/* Particles */}
      {PARTICLES.map((c, i) => (
        <div
          key={`p-${i}`}
          className="absolute rounded-full"
          style={{
            width: '1.5px',
            height: '1.5px',
            background: c.color,
            left: `${c.x}%`,
            top: `${c.y}%`,
            boxShadow: `0 0 3px ${c.color}`,
            animation: `p-${i} ${c.duration}s ease-in-out infinite`,
            animationDelay: `${c.delay}s`,
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        />
      ))}
    </div>
  );
}
