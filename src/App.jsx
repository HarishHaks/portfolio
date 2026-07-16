import React, { useEffect, useRef, useState } from "react";
// import {
//   Mail,
//   Phone,
//   Linkedin,
//   GitHub,
//   Menu,
//   X,
//   ArrowUpRight,
//   CheckCircle2,
//   MapPin,
//   Sparkles,
//   Award,
//   ExternalLink,
// } from "lucide-react";

import {
  Mail,
  Phone,
  // Linkedin,
  // Github,
  Menu,
  X,
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  Sparkles,
  Award,
  ExternalLink,
  Sun,
  Moon,
} from "lucide-react";

/* ---------------------------------------------------------
   DESIGN TOKENS — Premium Dark Glass
   bg        #05060C  – void background
   bgGlow2   #0A0E1F  – secondary depth
   glass     rgba(255,255,255,0.055) – card fill
   glassHi   rgba(255,255,255,0.09)  – hovered / raised fill
   border    rgba(255,255,255,0.12)
   violet    #8B5CF6
   cyan      #22D3EE
   pink      #F472B6
   text      #F6F8FF  – high-contrast primary
   muted     #A6AFC9
   Gradients: violet→cyan (primary), pink→violet (secondary)
   Type: Space Grotesk (display, 700/800) / Inter (body) / JetBrains Mono (data)
--------------------------------------------------------- */

const DARK = {
  bg: "#05060C",
  glass: "rgba(255,255,255,.055)",
  glassHi: "rgba(255,255,255,.095)",
  border: "rgba(255,255,255,.12)",
  borderHi: "rgba(255,255,255,.22)",
  violet: "#8B5CF6",
  cyan: "#22D3EE",
  pink: "#F472B6",
  text: "#F6F8FF",
  muted: "#A6AFC9",
  mutedDark: "#6B7392",
};

const LIGHT = {
  bg: "#F8FAFC",
  glass: "rgba(255,255,255,.75)",
  glassHi: "rgba(255,255,255,.95)",
  border: "rgba(0,0,0,.08)",
  borderHi: "rgba(0,0,0,.18)",
  violet: "#8B5CF6",
  cyan: "#06B6D4",
  pink: "#EC4899",
  text: "#111827",
  muted: "#475569",
  mutedDark: "#64748B",
};

const GRAD = "linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)";
const GRAD2 = "linear-gradient(135deg, #F472B6 0%, #8B5CF6 100%)";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, variant = "up" }) {
  const [ref, visible] = useReveal();
  const hidden =
    variant === "left"
      ? "translateX(-32px) rotate(-1.5deg) scale(0.97)"
      : variant === "right"
        ? "translateX(32px) rotate(1.5deg) scale(0.97)"
        : "translateY(28px) rotateX(4deg) scale(0.97)";
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate(0,0) rotate(0) rotateX(0) scale(1)"
          : hidden,
        filter: visible ? "blur(0px)" : "blur(4px)",
        transformOrigin: "center bottom",
        transformStyle: "preserve-3d",
        transition: `opacity 0.85s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.85s cubic-bezier(.16,1,.3,1) ${delay}s, filter 0.85s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children, grad = GRAD, C = DARK }) {
  return (
    <div
      className="inline-flex items-center gap-2 mb-4 px-3 py-1.5"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "11.5px",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        borderRadius: 999,
        border: `1px solid ${C.border}`,
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Sparkles size={11} style={{ color: C.cyan }} />
      <span
        style={{
          background: grad,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontWeight: 700,
        }}
      >
        {children}
      </span>
    </div>
  );
}

function SectionTitle({ kicker, title, grad, C = DARK }) {
  return (
    <div className="mb-14">
      <Eyebrow grad={grad} C={C}>
        {kicker}
      </Eyebrow>
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(30px, 4.2vw, 46px)",
          fontWeight: 800,
          color: C.text,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ---------------- Glass card wrapper ---------------- */
function GlassCard({
  children,
  className = "",
  style = {},
  hover = true,
  glow,
  C = DARK,
}) {
  const [spotlight, setSpotlight] = useState({
    x: 50,
    y: 50,
  });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      onMouseMove={handleMove}
      className={`glass-card ${hover ? "glass-hover" : ""} ${className}`}
      style={{
        background: C.glass,
        border: `1px solid ${C.border}`,
        borderRadius: 24,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: glow
          ? `0 20px 60px -20px ${glow}, 0 8px 24px -12px rgba(0,0,0,0.5)`
          : "0 8px 32px -16px rgba(0,0,0,0.55)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        className="glass-spotlight"
        style={{
          background: `
      radial-gradient(
        circle at ${spotlight.x}% ${spotlight.y}%,
        rgba(255,255,255,.25),
        rgba(139,92,246,.10) 20%,
        rgba(34,211,238,.06) 35%,
        transparent 72%
      )
    `,
        }}
      />

      {children}
    </div>
  );
}

/* ---------------- Glass ticket-style project card ---------------- */
function TicketCard({
  code,
  title,
  stack,
  blurb,
  bullets,
  status,
  grad,
  glow,
  C,
}) {
  return (
    <GlassCard C={C} glow={glow} className="flex flex-col md:flex-row">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ background: grad }}
      />
      <div
        className="relative p-7 md:p-9 md:w-[70%]"
        style={{ borderRight: `1px dashed ${C.border}` }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 600,
            color: C.muted,
            letterSpacing: "0.1em",
            marginBottom: 12,
          }}
        >
          {code}
        </div>
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(22px, 2.6vw, 28px)",
            fontWeight: 700,
            color: C.text,
            marginBottom: 12,
          }}
        >
          {title}
        </h3>
        <div
          className="flex flex-wrap gap-2 mb-5"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5 }}
        >
          {stack.map((s) => (
            <span
              key={s}
              style={{
                color: C.text,
                fontWeight: 600,
                background: "rgba(255,255,255,0.1)",
                border: `1px solid ${C.borderHi}`,
                padding: "5px 12px",
                borderRadius: 999,
              }}
            >
              {s}
            </span>
          ))}
        </div>
        <p
          style={{
            color: C.muted,
            fontSize: 15.5,
            lineHeight: 1.8,
            marginBottom: 18,
            fontWeight: 400,
          }}
        >
          {blurb}
        </p>
        <ul className="space-y-3">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5"
              style={{ fontSize: 14.5, color: C.text, lineHeight: 1.65 }}
            >
              <CheckCircle2
                size={16}
                style={{ color: C.cyan, marginTop: 3, flexShrink: 0 }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative flex flex-col md:flex-col items-center justify-center gap-3 px-7 py-5 md:py-8 md:w-[30%]">
        {" "}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 600,
            color: C.muted,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Status
        </div>
        <div
          className="badge-bob"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            fontWeight: 800,
            color: "#05060C",
            background: grad,
            padding: "8px 16px",
            borderRadius: 999,
            whiteSpace: "nowrap",
          }}
        >
          {status}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11.5,
            fontWeight: 700,
            color: C.text,
            marginTop: 6,
            background: "rgba(255,255,255,0.1)",
            border: `1px solid ${C.borderHi}`,
            padding: "4px 10px",
            borderRadius: 999,
            whiteSpace: "nowrap",
          }}
        >
          2026 · Rupenet
        </div>
      </div>
    </GlassCard>
  );
}

/* ---------------- Compact card for additional website projects ---------------- */
function MiniProjectCard({ title, blurb, grad, C }) {
  return (
    <GlassCard
      C={C}
      className="p-6 h-full flex flex-col"
      glow="rgba(139,92,246,0.1)"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: grad,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5,
            fontWeight: 600,
            color: C.muted,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Website
        </span>
      </div>
      <h4
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 17.5,
          fontWeight: 700,
          color: C.text,
          marginBottom: 8,
        }}
      >
        {title}
      </h4>
      <p
        style={{
          color: C.muted,
          fontSize: 13.5,
          lineHeight: 1.7,
          marginBottom: 14,
          flexGrow: 1,
        }}
      >
        {blurb}
      </p>
      <div
        className="flex flex-wrap gap-1.5"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5 }}
      >
        {["React.js", "Bootstrap", "Inline CSS"].map((s) => (
          <span
            key={s}
            style={{
              color: C.text,
              background: "rgba(255,255,255,0.07)",
              border: `1px solid ${C.border}`,
              padding: "3px 9px",
              borderRadius: 999,
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}

/* ---------------- Certification card ---------------- */
function CertCard({ title, issuer, credId, url, grad, C }) {
  return (
    <GlassCard
      C={C}
      className="p-6 h-full flex flex-col"
      glow="rgba(34,211,238,0.1)"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className="flex items-center justify-center shrink-0"
          style={{ width: 38, height: 38, borderRadius: 12, background: grad }}
        >
          <Award size={18} style={{ color: "#05060C" }} />
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5,
            fontWeight: 600,
            color: C.muted,
            background: "rgba(255,255,255,0.07)",
            border: `1px solid ${C.border}`,
            padding: "4px 10px",
            borderRadius: 999,
            whiteSpace: "nowrap",
          }}
        >
          {issuer}
        </span>
      </div>
      <h4
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 16.5,
          fontWeight: 700,
          color: C.text,
          lineHeight: 1.35,
          marginBottom: 10,
          flexGrow: 1,
        }}
      >
        {title}
      </h4>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: C.mutedDark,
          marginBottom: 14,
        }}
      >
        ID · {credId}
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="cta-ghost flex items-center justify-center gap-2"
        style={{
          border: `1px solid ${C.border}`,
          color: C.text,
          fontWeight: 600,
          fontSize: 13,
          padding: "9px 14px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.03)",
        }}
      >
        Verify credential <ExternalLink size={13} />
      </a>
    </GlassCard>
  );
}

function AnimatedCounter({
  end,
  duration = 1800,
  suffix = "",
  decimals = 0,
  C,
}) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal();

  useEffect(() => {
    if (!visible) return;

    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      setCount(start);
    }, 16);

    return () => clearInterval(timer);
  }, [visible, end, duration]);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="grad-text"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 24,
          fontWeight: 800,
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "80px",
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.03em",
        }}
      >
        <span>{count.toFixed(decimals)}</span>

        {suffix && (
          <span
            style={{
              marginLeft: "-1px",
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function Particles() {
  const particles = Array.from({ length: 40 });

  return (
    <div
      className="particles-container"
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {particles.map((_, i) => {
        const size = Math.random() * 5 + 1;
        const left = Math.random() * 100;
        const duration = Math.random() * 18 + 18;
        const delay = Math.random() * 10;

        return (
          <span
            key={i}
            className="particle"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function MagneticButton({ children, className = "", style = {}, ...props }) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setPosition({
      x: x * 0.22,
      y: y * 0.22,
    });
  };

  const reset = () => {
    setPosition({
      x: 0,
      y: 0,
    });
  };

  return (
    <a
      {...props}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        ...style,
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform .18s ease-out",
        display: "inline-flex",
      }}
    >
      {children}
    </a>
  );
}

export default function Portfolio() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [progress, setProgress] = useState(0);
  const [contactVisible, setContactVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const [mousePosition, setMousePosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });
  const C = darkMode ? DARK : LIGHT;

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);
  useEffect(() => {
    let progress = 0;

    const timer = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 3;

      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);

        setTimeout(() => {
          setLoading(false);
        }, 400);
      }

      setLoadingProgress(progress);
    }, 70);

    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { label: "Work", href: "experience" },
    { label: "Projects", href: "projects" },
    { label: "Skills", href: "skills" },
    { label: "Education", href: "education" },
    { label: "Certs", href: "certifications" },
    { label: "Contact", href: "contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy for active nav link
  useEffect(() => {
    const ids = ["top", ...navLinks.map((l) => l.href)];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // hide the floating contact button once the Contact section is on screen
  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    setNavOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const skillGroups = [
    {
      label: "Frontend",
      grad: GRAD,
      items: [
        "React.js",
        "JavaScript (ES6+)",
        "HTML5",
        "CSS3",
        "Bootstrap",
        "Tailwind CSS",
      ],
    },
    {
      label: "Backend",
      grad: GRAD2,
      items: ["Node.js", "Express.js", "REST API Integration"],
    },
    { label: "Tools", grad: GRAD, items: ["Git", "VS Code", "Postman"] },
    {
      label: "Practice",
      grad: GRAD2,
      items: [
        "Responsive Design",
        "API Integration",
        "UI/UX Enhancement",
        "Debugging",
      ],
    },
  ];
  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "#05060C",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "420px",
            maxWidth: "90%",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color: "#fff",
              fontSize: "38px",
              fontWeight: "800",
              marginBottom: "10px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Loading Portfolio...
          </h1>

          <p
            style={{
              color: "#8B5CF6",
              marginBottom: "35px",
              fontSize: "15px",
            }}
          >
            Harish Aravind Kumar
          </p>

          <div
            style={{
              width: "100%",
              height: "8px",
              background: "rgba(255,255,255,.08)",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${loadingProgress}%`,
                height: "100%",
                borderRadius: "20px",
                transition: "width .15s linear",
                background: "linear-gradient(90deg,#8B5CF6,#22D3EE,#F472B6)",
                boxShadow: "0 0 25px #8B5CF6",
              }}
            />
          </div>

          <h2
            style={{
              color: "#fff",
              marginTop: "25px",
              fontSize: "28px",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {loadingProgress}%
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: C.bg,
        color: C.text,
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        // opacity: mounted ? 1 : 0,
        // transition: "opacity 0.6s ease",
        opacity: loading ? 0 : mounted ? 1 : 0,
        transition: "all .45s ease",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        section, #top { scroll-margin-top: 90px; }
        ::selection { background: ${C.violet}; color: #fff; }
        a { text-decoration: none; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, ${C.violet}, ${C.cyan}); border-radius: 10px; }

        @keyframes heroIn { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes orbFloat1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-40px) scale(1.08); } }
        @keyframes orbFloat2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px,30px) scale(1.05); } }
        @keyframes orbFloat3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,20px) scale(1.1); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes badgeBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes fabBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .badge-bob { animation: badgeBob 3.2s ease-in-out infinite; }
        .fab-float { animation: fabBob 3.6s ease-in-out infinite; }
        .grain { background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/></svg>"); }

        .hero-anim-1 { animation: heroIn 0.75s cubic-bezier(.16,1,.3,1) 0.05s both; }
        .hero-anim-2 { animation: heroIn 0.75s cubic-bezier(.16,1,.3,1) 0.18s both; }
        .hero-anim-3 { animation: heroIn 0.75s cubic-bezier(.16,1,.3,1) 0.32s both; }
        .hero-anim-4 { animation: heroIn 0.75s cubic-bezier(.16,1,.3,1) 0.46s both; }

        .orb1 { animation: orbFloat1 14s ease-in-out infinite; }
        .orb2 { animation: orbFloat2 17s ease-in-out infinite; }
        .orb3 { animation: orbFloat3 12s ease-in-out infinite; }

        .glass-card { transition:transform .5s cubic-bezier(.22,1,.36,1), border-color .35s ease, box-shadow .35s ease, background .35s ease; }
        .glass-hover:hover { transform: translateY(-8px) scale(1.015); border-color: ${C.borderHi}; background: ${C.glassHi}; box-shadow: 0 30px 70px -20px rgba(139,92,246,0.28), 0 10px 30px -12px rgba(0,0,0,0.6) !important; }

        .nav-link { position: relative; color: ${C.muted}; font-size: 14px; font-weight: 500; padding: 8px 4px; transition: color .25s ease; cursor: pointer; }
        .nav-link::after { content: ''; position: absolute; left: 0; bottom: 0; width: 0%; height: 2px; border-radius: 2px; background: ${GRAD}; transition: width .3s cubic-bezier(.16,1,.3,1); }
        .nav-link:hover { color: ${C.text}; }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: ${C.text}; }
        .nav-link.active::after { width: 100%; }

        .cta-primary { transition: transform .25s ease, box-shadow .25s ease; background-size: 200% 200%; }
.cta-primary:hover{

    transform:translateY(-2px) scale(1.06);

    box-shadow:
    0 18px 45px rgba(139,92,246,.45);

}        .cta-ghost { transition: border-color .25s ease, background .25s ease, transform .25s ease; }
        .cta-ghost:hover { border-color:rgba(255,255,255,.35); background: rgba(255,255,255,0.06); transform: translateY(-2px); }

        .skill-chip { transition: transform .25s ease, border-color .25s ease, background .25s ease; cursor: default; }
        .skill-chip:hover { transform: translateY(-3px) scale(1.03); border-color:rgba(255,255,255,.35); }

@keyframes mobileMenuOpen {
  from {
    opacity: 0;
    transform: translateY(-18px) scale(.98);
    filter: blur(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes mobileMenuClose {
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(-12px);
  }
}

.mobile-panel{
  animation: mobileMenuOpen .45s cubic-bezier(.16,1,.3,1);
  transform-origin: top;
}
  .mobile-link{
    opacity:0;
    transform:translateX(-18px);
    animation:mobileItem .45s forwards;
}

.mobile-link:nth-child(1){animation-delay:.05s;}
.mobile-link:nth-child(2){animation-delay:.10s;}
.mobile-link:nth-child(3){animation-delay:.15s;}
.mobile-link:nth-child(4){animation-delay:.20s;}
.mobile-link:nth-child(5){animation-delay:.25s;}
.mobile-link:nth-child(6){animation-delay:.30s;}

@keyframes mobileItem{
    to{
        opacity:1;
        transform:translateX(0);
    }
}

.mobile-panel .cta-primary{
    animation:mobileButton .55s .35s both;
}

@keyframes mobileButton{
    from{
        opacity:0;
        transform:translateY(20px);
    }
    to{
        opacity:1;
        transform:translateY(0);
    }
}
    
        .grad-text { background: ${GRAD}; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }

        @media (prefers-reduced-motion: reduce) {
          .hero-anim-1, .hero-anim-2, .hero-anim-3, .hero-anim-4, .orb1, .orb2, .orb3, .badge-bob, .fab-float { animation: none !important; }
        }
          .footer-icon {
  transition: all 0.3s ease;
}

.footer-icon:hover {
  transform: translateY(-4px);
  color: white !important;
  border-color: rgba(255,255,255,0.3) !important;
  box-shadow: 0 10px 25px rgba(139,92,246,0.35);
}
  .mobile-panel a{
    position:relative;
}

.mobile-panel a::after{
    content:"";
    position:absolute;
    left:0;
    bottom:0;
    width:0%;
    height:1px;
    background:linear-gradient(90deg,#8B5CF6,#22D3EE);
    transition:.35s;
}

.mobile-panel a:hover::after{
    width:100%;
}

@keyframes moveGrid {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(60px, 60px);
  }
}

.moving-grid {
  position: fixed;
  inset: -60px;
  pointer-events: none;
  z-index: 0;

  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);

  background-size: 60px 60px;

  animation: moveGrid 18s linear infinite;

  opacity: .45;
}

@keyframes beamMove1 {
  0% {
    transform: translateX(-25%) rotate(-18deg);
  }
  100% {
    transform: translateX(25%) rotate(-18deg);
  }
}

@keyframes beamMove2 {
  0% {
    transform: translateX(20%) rotate(15deg);
  }
  100% {
    transform: translateX(-20%) rotate(15deg);
  }
}

@keyframes beamMove3 {
  0% {
    transform: translateY(-20%) rotate(-8deg);
  }
  100% {
    transform: translateY(20%) rotate(-8deg);
  }
}

.beam{
    position:absolute;
    border-radius:999px;
    filter:blur(150px);
    opacity:.12;
}

.beam1{
    animation:beamMove1 18s ease-in-out infinite alternate;
}

.beam2{
    animation:beamMove2 22s ease-in-out infinite alternate;
}

.beam3{
    animation:beamMove3 26s ease-in-out infinite alternate;
}

@keyframes particleFloat {

    0%{
        transform:translateY(100vh) scale(.2);
        opacity:0;
    }

    10%{
        opacity:.25;
    }

    50%{
        opacity:.45;
    }

    100%{
        transform:translateY(-150px) scale(1);
        opacity:0;
    }

}

.particle{

    position:absolute;

    bottom:-20px;

    border-radius:50%;

    background:linear-gradient(
        135deg,
        #8B5CF6,
        #22D3EE,
        #F472B6
    );

filter:blur(.8px);

box-shadow:
0 0 10px rgba(139,92,246,.45),
0 0 18px rgba(34,211,238,.35);

    animation-name:particleFloat;

    animation-timing-function:linear;

    animation-iteration-count:infinite;

}

.glass-spotlight{

    position:absolute;

    inset:0;

    pointer-events:none;

    transition:
        background .08s linear;

    z-index:0;

}

.glass-card>*{

    position:relative;

    z-index:1;

}

*{

transition:
background .35s ease,
color .35s ease,
border-color .35s ease,
box-shadow .35s ease;

}
      `}</style>

      <div
        style={{
          position: "fixed",
          left: mousePosition.x - 175,
          top: mousePosition.y - 175,
          width: 350,
          height: 350,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.20) 0%, rgba(139,92,246,0.12) 35%, rgba(139,92,246,0.04) 60%, transparent 80%)",
          filter: "blur(55px)",
          transition: "left .12s ease-out, top .12s ease-out",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="moving-grid"
        style={{
          backgroundImage: darkMode
            ? `
      linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)
      `
            : `
      linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)
      `,
        }}
      />

      <Particles />

      {/* ---------- Gradient Beams ---------- */}

      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{
          zIndex: 0,
        }}
      >
        <div
          className="beam beam1"
          style={{
            width: 650,
            height: 220,
            background: "linear-gradient(90deg,#8B5CF6,#22D3EE)",
            top: "8%",
            left: "-12%",
          }}
        />

        <div
          className="beam beam2"
          style={{
            width: 700,
            height: 220,
            background: "linear-gradient(90deg,#22D3EE,#8B5CF6)",
            bottom: "15%",
            right: "-15%",
          }}
        />

        <div
          className="beam beam3"
          style={{
            width: 550,
            height: 180,
            background: "linear-gradient(90deg,#F472B6,#8B5CF6)",
            top: "45%",
            left: "30%",
          }}
        />
      </div>

      {/* ---------------- AMBIENT GRADIENT ORBS (fixed backdrop) ---------------- */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div
          className="orb1 absolute"
          style={{
            top: "-10%",
            left: "-8%",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: C.violet,
            opacity: darkMode ? 0.28 : 0.12,
            filter: "blur(120px)",
          }}
        />
        <div
          className="orb2 absolute"
          style={{
            top: "20%",
            right: "-10%",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: C.cyan,
            opacity: 0.2,
            filter: "blur(130px)",
          }}
        />
        <div
          className="orb3 absolute"
          style={{
            bottom: "-5%",
            left: "30%",
            width: 460,
            height: 460,
            borderRadius: "50%",
            background: C.pink,
            opacity: 0.18,
            filter: "blur(120px)",
          }}
        />
      </div>

      {/* subtle grain texture for depth */}
      <div
        className="grain fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, mixBlendMode: "overlay" }}
      />

      <div className="relative" style={{ zIndex: 1 }}>
        {/* ---------------- NAV ---------------- */}
        <header
          className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
          style={{
            background: scrolled
              ? darkMode
                ? "rgba(5,6,12,.72)"
                : "rgba(255,255,255,.82)"
              : "transparent",
            backdropFilter: scrolled ? "blur(18px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
            borderBottom: scrolled
              ? `1px solid ${C.border}`
              : "1px solid transparent",
          }}
        >
          <div
            style={{
              height: 2,
              width: `${progress}%`,
              background: GRAD,
              transition: "width 0.1s linear",
            }}
          />
          <div
            className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between"
            style={{ height: 72 }}
          >
            <a
              href="#top"
              onClick={scrollTo("top")}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: "-0.02em",
              }}
            >
              HAK<span className="grad-text">.</span>
            </a>

            <nav className="hidden md:flex items-center gap-9">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={`#${l.href}`}
                  onClick={scrollTo(l.href)}
                  className={`nav-link mobile-link ${active === l.href ? "active" : ""}`}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=harisharavind0309@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 cta-primary"
              style={{
                background: GRAD,
                color: "#05060C",
                fontSize: 13.5,
                fontWeight: 700,
                padding: "10px 18px",
                borderRadius: 999,
              }}
            >
              Let's talk <ArrowUpRight size={14} />
            </a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                width: 46,
                height: 46,
                marginLeft: 12,
                borderRadius: "50%",
                border: `1px solid ${C.border}`,
                background: C.glass,
                color: C.text,
                cursor: "pointer",
                backdropFilter: "blur(18px)",

                // Add these
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
                lineHeight: 0,

                // Optional
                transition: "all .3s ease",
              }}
            >
              {darkMode ? (
                <Sun size={20} strokeWidth={2} />
              ) : (
                <Moon size={20} strokeWidth={2} />
              )}
            </button>

            <button
              type="button"
              className="md:hidden flex items-center justify-center"
              style={{
                color: C.text,
                width: 44,
                height: 44,
                borderRadius: 14,
                border: `1px solid ${C.border}`,
                background: "rgba(255,255,255,0.05)",
                transition: "all .45s cubic-bezier(.22,1,.36,1)",
                transform: navOpen ? "rotate(90deg)" : "rotate(0deg)",
              }}
              onClick={() => setNavOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={navOpen}
            >
              <div
                style={{
                  transform: navOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform .35s cubic-bezier(.16,1,.3,1)",
                }}
              >
                {navOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            </button>
          </div>

          {navOpen && (
            <div
              className="mobile-panel md:hidden px-6 pb-6 flex flex-col gap-1"
              style={{
                background: darkMode
                  ? "rgba(5,6,12,.96)"
                  : "rgba(255,255,255,.96)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                borderTop: `1px solid ${C.border}`,
                borderBottom: `1px solid ${C.border}`,
                boxShadow: "0 30px 80px rgba(0,0,0,.45)",
              }}
            >
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={`#${l.href}`}
                  onClick={scrollTo(l.href)}
                  className={`nav-link ${active === l.href ? "active" : ""}`}
                  style={{
                    paddingTop: 15,
                    paddingBottom: 15,
                    borderBottom: `1px solid ${C.border}`,
                    fontSize: 15,
                    transition: "all .3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateX(14px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=harisharavind0309@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary flex items-center justify-center gap-2"
                style={{
                  background: GRAD,
                  color: "#05060C",
                  fontWeight: 700,
                  fontSize: 14,
                  padding: "13px 18px",
                  borderRadius: 999,
                  flex: 1,
                }}
              >
                <Mail size={15} />
                Let's talk
              </a>
            </div>
          )}
        </header>

        {/* ---------------- HERO ---------------- */}
        <section
          id="top"
          className="relative max-w-5xl mx-auto px-6 md:px-8 pt-24 pb-16 md:pt-32 md:pb-20 text-center flex flex-col items-center"
        >
          <div className="hero-anim-1">
            <Eyebrow C={C}>React JS Developer . Chennai, India</Eyebrow>
          </div>
          <h1
            className="hero-anim-2"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(40px, 7vw, 76px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
            }}
          >
            Harish Aravind
            <br />
            <span className="grad-text">Kumar N S</span>
          </h1>
          <p
            className="hero-anim-3"
            style={{
              color: C.muted,
              fontSize: "clamp(16px, 1.8vw, 19.5px)",
              lineHeight: 1.75,
              maxWidth: 600,
              marginTop: 24,
            }}
          >
            {/* I build fintech interfaces for a living — bus tickets, loan
            approvals, and payment receipts that have to work the first time.
            React.js, REST APIs, and a close eye on the details recruiters and
            users both notice. */}
            React.js Developer with hands-on experience building responsive web
            applications, integrating REST APIs, and developing scalable
            frontend solutions. Passionate about creating clean, user-friendly
            interfaces and delivering high-quality web applications.
          </p>
          <div className="hero-anim-4 flex flex-wrap items-center justify-center gap-4 mt-9">
            <MagneticButton
              href="#projects"
              onClick={scrollTo("projects")}
              className="cta-primary"
              style={{
                background: GRAD,
                color: "#05060C",
                fontWeight: 700,
                fontSize: 15,
                padding: "14px 26px",
                borderRadius: 999,
              }}
            >
              View projects
            </MagneticButton>
            <MagneticButton
              href="#contact"
              onClick={scrollTo("contact")}
              className="cta-ghost"
              style={{
                border: `1px solid ${C.border}`,
                color: C.text,
                fontWeight: 600,
                fontSize: 15,
                padding: "14px 26px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.03)",
              }}
            >
              Get in touch
            </MagneticButton>
          </div>

          <div className="hero-anim-4 mt-14">
            <GlassCard
              C={C}
              hover={false}
              className="px-8 py-6 w-full"
              style={{ borderRadius: 20 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                {[
                  {
                    end: 12,
                    suffix: "+",
                    label: "Projects Delivered",
                  },
                  {
                    end: 8,
                    suffix: "+",
                    label: "REST APIs Integrated",
                  },
                  {
                    end: 100,
                    suffix: "%",
                    label: "Responsive Design",
                  },
                  {
                    end: 92.6,
                    suffix: "%",
                    decimals: 1,
                    label: "MCA • SRM Institute",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center justify-center text-center"
                    style={{
                      //     display: "flex",
                      //     flexDirection: "column",
                      //     alignItems: "center",
                      // minWidth:"120px",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <AnimatedCounter
                      C={C}
                      end={item.end}
                      suffix={item.suffix}
                      decimals={item.decimals || 0}
                    />

                    <div
                      style={{
                        color: C.muted,
                        fontSize: 12.5,
                        marginTop: 3,
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ---------------- EXPERIENCE ---------------- */}
        <section
          id="experience"
          className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-14"
        >
          <Reveal>
            <SectionTitle
              kicker="Work Experience"
              title="Where the code goes live"
              C={C}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard
              C={C}
              glow="rgba(34,211,238,0.15)"
              className="p-9 md:p-12"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-7">
                <div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 23,
                      fontWeight: 700,
                    }}
                  >
                    React JS Developer Trainee
                  </h3>
                  <div
                    className="grad-text"
                    style={{ fontSize: 14.5, marginTop: 5, fontWeight: 600 }}
                  >
                    Rupenet Payment Technology Private Limited
                  </div>
                </div>
                <div
                  className="flex flex-col md:items-end gap-1.5"
                  style={{ color: C.mutedDark, fontSize: 13 }}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Jan 2026 — Present
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> Chennai, Tamil Nadu
                  </span>
                </div>
              </div>
              <ul className="grid md:grid-cols-3 gap-5">
                {[
                  "Developed responsive FinTech web applications using React.js, JavaScript, Bootstrap, HTML5, and CSS3.",
                  "Integrated REST APIs using Axios with session handling, timeout configuration, and backend synchronization.",
                  "Worked across frontend–backend integration, API debugging, state management, and responsive UI optimization.",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={16}
                      style={{ color: C.cyan, marginTop: 2, flexShrink: 0 }}
                    />
                    <span
                      style={{
                        color: C.text,
                        fontSize: 14,
                        lineHeight: 1.7,
                      }}
                    >
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </section>

        {/* ---------------- PROJECTS ---------------- */}
        <section
          id="projects"
          className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-14"
        >
          <Reveal>
            <SectionTitle
              kicker="Selected Work"
              title="Products, dashboards, and the sites behind them"
              grad={GRAD2}
              C={C}
            />
          </Reveal>
          <div className="flex flex-col gap-8">
            <Reveal delay={0.05}>
              <TicketCard
                C={C}
                code="TXN · REDBUS-2026-01"
                title="RedBus Bus Booking System"
                stack={["React.js", "Axios", "Express.js"]}
                grad={GRAD}
                glow="rgba(139,92,246,0.18)"
                status="Booking Confirmed"
                blurb="An end-to-end bus booking flow — from search to seat map to a confirmed ticket in hand."
                bullets={[
                  "Built bus search, seat selection, boarding/dropping points, passenger details, and booking confirmation.",
                  "Integrated REST APIs via Axios for trip details, seat availability, ticket booking, transaction history, and cancellation.",
                ]}
              />
            </Reveal>
            <Reveal delay={0.12}>
              <TicketCard
                C={C}
                code="TXN · INDIFI-2026-02"
                title="Indifi — Loan Application System"
                stack={["React.js", "Axios", "Express.js"]}
                grad={GRAD2}
                glow="rgba(244,114,182,0.16)"
                status="Application Approved"
                blurb="A digital loan onboarding platform designed to make KYC and paperwork feel like the easy part."
                bullets={[
                  "Built KYC verification, document upload, form validation, and responsive UI components.",
                  "Integrated REST APIs for onboarding, verification, and the full loan workflow processing.",
                ]}
              />
            </Reveal>
            <Reveal delay={0.19}>
              <TicketCard
                C={C}
                code="TXN · CCCS-2026-03"
                title="Credit Card Collection System"
                stack={["React.js", "REST APIs", "jsPDF"]}
                grad={GRAD}
                glow="rgba(34,211,238,0.16)"
                status="Receipt Generated"
                blurb="Collection and reporting tooling built around one rule: every payment gets a clean, verifiable receipt."
                bullets={[
                  "Built modules for credit card collection, beneficiary management, transaction reports, and payment processing.",
                  "Implemented OTP authentication and PDF receipt generation using jsPDF and html2canvas.",
                ]}
              />
            </Reveal>
            <Reveal delay={0.26}>
              <TicketCard
                C={C}
                code="TXN · BAMS-2026-04"
                title="Bank Account Management System"
                stack={["React.js", "Node.js", "Express.js", "REST APIs"]}
                grad={GRAD2}
                glow="rgba(244,114,182,0.16)"
                status="Account Active"
                blurb="An admin dashboard for creating, updating, and controlling bank accounts — built so nothing gets changed by accident."
                bullets={[
                  "Built a responsive dashboard for admins to create, update, view, enable, and disable bank accounts.",
                  "Developed Express.js routes and controllers alongside secure Axios-integrated REST APIs for account management, user-specific access, and authentication.",
                  "Shipped CRUD operations, user-level access controls, status toggles, and detailed modal views, responsive across desktop, tablet, and mobile.",
                ]}
              />
            </Reveal>
          </div>

          {/* ---- Additional website projects ---- */}
          <div className="mt-16">
            <Reveal>
              <div className="mb-8">
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: C.mutedDark,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  More work at Rupenet
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(20px, 2.6vw, 26px)",
                    fontWeight: 700,
                    marginTop: 8,
                  }}
                >
                  Corporate & product websites shipped in 2026
                </h3>
              </div>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "FinX Collectie",
                  blurb:
                    "Corporate landing site for AI-powered loan collection and recovery solutions, built with reusable React.js components.",
                  grad: GRAD,
                },
                {
                  title: "FinX Gym",
                  blurb:
                    "Product website for gym management and business solutions, with a consistent, cross-browser compatible design.",
                  grad: GRAD2,
                },
                {
                  title: "PayRupe Micro ATM",
                  blurb:
                    "Landing site for digital banking and cash withdrawal services, tuned for accessibility across screen sizes.",
                  grad: GRAD,
                },
                {
                  title: "FinX Payment Gateway",
                  blurb:
                    "Product website presenting secure online payment solutions through a clean, professional interface.",
                  grad: GRAD2,
                },
                {
                  title: "FinX School",
                  blurb:
                    "Corporate site for FinX School, showcasing school ERP features and education management solutions.",
                  grad: GRAD,
                },
                {
                  title: "FinX International",
                  blurb:
                    "Website highlighting global fintech services and business solutions for an international audience.",
                  grad: GRAD2,
                },
                {
                  title: "FinX AI Voice Bot",
                  blurb:
                    "Landing site for an AI-powered customer engagement product, built for a visually engaging first impression.",
                  grad: GRAD,
                },
                {
                  title: "PayRupe Lending",
                  blurb:
                    "Product website presenting digital lending and loan services, optimized across desktop, tablet, and mobile.",
                  grad: GRAD2,
                },
              ].map((p, i) => (
                <Reveal key={p.title} delay={(i % 3) * 0.08}>
                  <MiniProjectCard
                    C={C}
                    title={p.title}
                    blurb={p.blurb}
                    grad={p.grad}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- SKILLS ---------------- */}
        <section
          id="skills"
          className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-14"
        >
          <Reveal>
            <SectionTitle kicker="Toolkit" title="What's in the stack" C={C} />
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {skillGroups.map((g, gi) => (
              <Reveal
                key={g.label}
                delay={gi * 0.07}
                variant={gi % 2 === 0 ? "left" : "right"}
              >
                <GlassCard C={C} className="p-7">
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11.5,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 16,
                      background: g.grad,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 700,
                    }}
                  >
                    {g.label}
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {g.items.map((s) => (
                      <span
                        key={s}
                        className="skill-chip"
                        style={{
                          border: `1px solid ${C.border}`,
                          color: C.text,
                          fontSize: 13.5,
                          padding: "8px 14px",
                          borderRadius: 999,
                          background: "rgba(255,255,255,0.04)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- EDUCATION ---------------- */}
        <section
          id="education"
          className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-14"
        >
          <Reveal>
            <SectionTitle
              kicker="Education"
              title="Foundations"
              grad={GRAD2}
              C={C}
            />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                school: "SRM Institute of Science and Technology",
                deg: "Master of Computer Applications",
                period: "2023 – 2025",
                score: "92.60%",
              },
              {
                school:
                  "B. S. Abdur Rahman Crescent Institute of Science and Technology",
                deg: "Bachelor of Computer Applications",
                period: "2020 – 2023",
                score: "84.80%",
              },
              {
                school: "St Joseph's Matric Hr. Sec. School",
                deg: "Computer Science, 12th & 10th",
                period: "2018 – 2020",
                score: "83.00% / 61.50%",
              },
            ].map((e, i) => (
              <Reveal key={e.school} delay={i * 0.1}>
                <GlassCard C={C} className="p-7 h-full flex flex-col">
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      color: C.muted,
                    }}
                  >
                    {e.period}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 16.5,
                      fontWeight: 700,
                      margin: "12px 0 6px",
                    }}
                  >
                    {e.school}
                  </h3>
                  <p
                    style={{ color: C.muted, fontSize: 13.5, marginBottom: 18 }}
                  >
                    {e.deg}
                  </p>
                  <div
                    className="mt-auto grad-text"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13.5,
                      fontWeight: 800,
                    }}
                  >
                    {e.score}
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- CERTIFICATIONS ---------------- */}
        <section
          id="certifications"
          className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-14"
        >
          <Reveal>
            <SectionTitle
              kicker="Certifications"
              title="Backed by verified credentials"
              C={C}
            />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Introduction to Front-End Development",
                issuer: "Meta",
                credId: "VR673AUXA2Z5",
                url: "https://www.coursera.org/account/accomplishments/records/VR673AUXA2Z5",
                grad: GRAD,
              },
              {
                title: "Introduction to HTML, CSS, & JavaScript",
                issuer: "IBM",
                credId: "HPLYN828VAHP",
                url: "https://www.coursera.org/account/accomplishments/records/HPLYN828VAHP",
                grad: GRAD2,
              },
              {
                title: "Version Control",
                issuer: "Meta",
                credId: "AAOHBHNXXSZ3",
                url: "https://coursera.org/share/311b41d4d12cf747d73a2e8d80bc1186",
                grad: GRAD,
              },
              {
                title: "Programming with JavaScript",
                issuer: "Meta",
                credId: "F1CY9NBHB1YG",
                url: "https://www.coursera.org/account/accomplishments/records/F1CY9NBHB1YG",
                grad: GRAD2,
              },
              {
                title: "HTML and CSS in Depth",
                issuer: "Meta",
                credId: "4RCGHKTDY49D",
                url: "https://www.coursera.org/account/accomplishments/records/4RCGHKTDY49D",
                grad: GRAD,
              },
              {
                title: "React Basics",
                issuer: "Meta",
                credId: "IFOPTIJUNIK1",
                url: "https://www.coursera.org/account/accomplishments/records/IFOPTIJUNIK1",
                grad: GRAD2,
              },
              {
                title: "SQL: A Practical Introduction for Querying Databases",
                issuer: "Meta",
                credId: "0NZIA1DG5O8C",
                url: "https://www.coursera.org/account/accomplishments/verify/0NZIA1DG5O8C",
                grad: GRAD,
              },
            ].map((c, i) => (
              <Reveal key={c.credId} delay={(i % 3) * 0.08}>
                <CertCard
                  C={C}
                  title={c.title}
                  issuer={c.issuer}
                  credId={c.credId}
                  url={c.url}
                  grad={c.grad}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- CONTACT ---------------- */}
        <section
          id="contact"
          className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-14"
        >
          <Reveal>
            <GlassCard
              C={C}
              hover={false}
              glow="rgba(139,92,246,0.25)"
              className="p-10 md:p-16 text-center"
            >
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(139,92,246,0.25), transparent 55%), radial-gradient(circle at 75% 80%, rgba(34,211,238,0.2), transparent 55%)",
                }}
              />
              <div className="relative">
                <div className="flex justify-center">
                  <Eyebrow C={C}>Contact</Eyebrow>
                </div>
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(28px, 5vw, 48px)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    maxWidth: 660,
                    margin: "0 auto",
                  }}
                >
                  Building your next release{" "}
                  <span className="grad-text">let's talk about it.</span>
                </h2>
                <p
                  style={{
                    color: C.muted,
                    fontSize: 15.5,
                    marginTop: 18,
                    maxWidth: 480,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  Open to React.js frontend and FullStack roles. Reach out
                  directly, no forms.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                  <MagneticButton
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=harisharavind0309@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-primary flex items-center gap-2"
                    style={{
                      background: GRAD,
                      color: "#05060C",
                      fontWeight: 700,
                      fontSize: 14.5,
                      padding: "14px 24px",
                      borderRadius: 999,
                    }}
                  >
                    <Mail size={16} /> harisharavind0309@gmail.com
                  </MagneticButton>
                  <MagneticButton
                    href="tel:+919566843200"
                    className="cta-ghost flex items-center gap-2"
                    style={{
                      border: `1px solid ${C.border}`,
                      color: C.text,
                      fontWeight: 600,
                      fontSize: 14.5,
                      padding: "14px 24px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <Phone size={16} /> +91 95668 43200
                  </MagneticButton>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        {/* ---------------- FOOTER ---------------- */}
        <footer
          className="max-w-6xl mx-auto px-6 md:px-8 py-10"
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          <Reveal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div style={{ color: C.mutedDark, fontSize: 13 }}>
                © 2026 Harish Aravind Kumar N S. Built with React.
              </div>
              {/* <div className="flex items-center gap-4">
  {[
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/harisharavind3902/",
      label: "LinkedIn",
    },
<a
  href="https://github.com/HarishHaks"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="GitHub"
  className="cta-ghost footer-icon flex items-center justify-center"
  style={{
    width: 42,
    height: 42,
    borderRadius: 12,
    border: `1px solid ${C.border}`,
    color: C.muted,
    background: "rgba(255,255,255,0.03)",
  }}
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.94c.58.1.79-.25.79-.56v-2.17c-3.25.71-3.94-1.57-3.94-1.57-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.39.97.11-.75.41-1.27.74-1.56-2.59-.3-5.31-1.29-5.31-5.75 0-1.27.46-2.31 1.2-3.12-.12-.3-.52-1.52.12-3.17 0 0 .98-.31 3.2 1.19a11.1 11.1 0 015.83 0c2.22-1.5 3.2-1.19 3.2-1.19.64 1.65.24 2.87.12 3.17.75.81 1.2 1.85 1.2 3.12 0 4.47-2.72 5.45-5.32 5.74.42.37.8 1.1.8 2.22v3.29c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/>
  </svg>
</a>
  ].map(({ Icon, href, label }) => (
    <a
      key={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
className="cta-ghost footer-icon flex items-center justify-center"
      style={{
        width: 42,
        height: 42,
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        color: C.muted,
        background: "rgba(255,255,255,0.03)",
      }}
    >
      <Icon size={18} />
    </a>
  ))}
</div> */}

              <div className="flex items-center gap-4">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/harisharavind3902/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="cta-ghost footer-icon flex items-center justify-center"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    border: `1px solid ${C.border}`,
                    color: C.muted,
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5zM.5 8h4V24h-4V8zm7 0h3.8v2.2h.1c.53-1 1.82-2.2 3.75-2.2 4.01 0 4.75 2.64 4.75 6.08V24h-4v-7.1c0-1.69-.03-3.87-2.36-3.87-2.37 0-2.73 1.85-2.73 3.75V24h-4V8z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/HarishHaks"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="cta-ghost footer-icon flex items-center justify-center"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    border: `1px solid ${C.border}`,
                    color: C.muted,
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.94c.58.1.79-.25.79-.56v-2.17c-3.25.71-3.94-1.57-3.94-1.57-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.39.97.11-.75.41-1.27.74-1.56-2.59-.3-5.31-1.29-5.31-5.75 0-1.27.46-2.31 1.2-3.12-.12-.3-.52-1.52.12-3.17 0 0 .98-.31 3.2 1.19a11.1 11.1 0 015.83 0c2.22-1.5 3.2-1.19 3.2-1.19.64 1.65.24 2.87.12 3.17.75.81 1.2 1.85 1.2 3.12 0 4.47-2.72 5.45-5.32 5.74.42.37.8 1.1.8 2.22v3.29c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        </footer>
      </div>

      {/* ---------------- FLOATING CONTACT FAB ---------------- */}
      <div
        className="fab-float fixed"
        style={{
          bottom: 24,
          right: 24,
          zIndex: 60,
          opacity: contactVisible ? 0 : 1,
          transform: contactVisible
            ? "translateY(16px) scale(0.9)"
            : "translateY(0) scale(1)",
          pointerEvents: contactVisible ? "none" : "auto",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=harisharavind0309@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-primary flex items-center gap-2"
          style={{
            background: GRAD,
            color: "#05060C",
            fontWeight: 700,
            fontSize: 13.5,
            padding: "14px 16px",
            borderRadius: 999,
            boxShadow: "0 16px 40px -12px rgba(139,92,246,0.55)",
            cursor: "pointer",
          }}
        >
          <Mail size={16} />
          <span className="hidden sm:inline">Let's talk</span>
        </a>
      </div>
    </div>
  );
}
