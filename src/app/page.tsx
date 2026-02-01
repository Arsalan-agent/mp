"use client";

import React, { useState, useRef, Suspense, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload, Float } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Typewriter from 'typewriter-effect';
import * as THREE from 'three';

// --- UPDATED COMPONENT: Faster & Denser Code Background ---
const CodeBackground = () => {
  const codeSnippets = [
    "import { OpenAI } from 'langchain';",
    "const agent = new AIAgent();",
    "function evolve(data) { return data.map(ai => ai.logic); }",
    "db.connect(process.env.POSTGRES_URL);",
    "export default function NeuralNetwork() { ... }",
    "const [state, dispatch] = useReducer(reducer, initial);",
    "async function fetchKnowledge() { await llm.predict(); }",
    "<motion.div animate={{ scale: 1.2 }} />",
    "fastapi.post('/v1/generate')",
    "const galaxy = new THREE.Points(geometry, material);",
    "npm install @tensorflow/tfjs",
    "torch.nn.Linear(512, 1024)",
    "git commit -m 'Deploying AI Model'",
    "while(isEvolving) { updateWeights(); }",
    "const response = await chain.call({ input: userPrompt });",
    "System.out.println('Neural Core Active');",
    "SELECT * FROM brain_waves WHERE intensity > 0.8;",
    "docker-compose up --build -d",
    "const API_KEY = process.env.VITE_AI_KEY;",
    "model.compile(optimizer='adam', loss='mse')"
  ];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none select-none z-10">
      <div className="flex flex-wrap gap-x-6 gap-y-4 p-4 font-mono text-[10px] md:text-[12px] text-cyan-400/70">
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              y: [0, Math.random() * -100], 
              x: [0, (Math.random() - 0.5) * 20]
            }}
            transition={{
              duration: Math.random() * 2 + 1.5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
          >
            {codeSnippets[i % codeSnippets.length]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Interfaces ---
interface Experience {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
}

interface ProjectTag {
  name: string;
  color: string;
}

interface Project {
  name: string;
  description: string;
  tags: ProjectTag[];
  image: string;
  source_code_link: string;
}

// --- 3D Background Components ---
const StarsBackground = () => {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const pos = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000 * 3; i++) pos[i] = (Math.random() - 0.5) * 10;
    return pos;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 25;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#ffffff" size={0.003} sizeAttenuation depthWrite={false} />
    </Points>
  );
};

const MovingGalaxy = () => {
  const ref = useRef<THREE.Points>(null!);
  const [positions, colors] = useMemo(() => {
    const count = 4000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorInside = new THREE.Color("#f7d794");
    const colorOutside = new THREE.Color("#915eff");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 1.5;
      const spinAngle = radius * 5;
      const branchAngle = ((i % 3) * Math.PI * 2) / 3;
      const randomX = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3) * radius;
      const randomY = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3) * radius;
      const randomZ = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3) * radius;

      pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i3 + 1] = randomY * 0.5;
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone().lerp(colorOutside, radius / 1.5);
      col[i3] = mixedColor.r; col[i3 + 1] = mixedColor.g; col[i3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => { ref.current.rotation.y += delta * 0.15; });

  return (
    <group position={[0, 0, -0.5]} rotation={[0.4, 0, 0.2]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3}>
        <PointMaterial vertexColors transparent opacity={0.8} size={0.008} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
};

const RealisticMoon = () => (
  <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
    <mesh position={[0, 0, -0.2]}>
      <sphereGeometry args={[0.25, 64, 64]} />
      <meshStandardMaterial color="#e1e1e1" roughness={0.8} metalness={0.1} />
      <pointLight intensity={2} color="#ffffff" distance={5} />
    </mesh>
  </Float>
);

// --- PRELOADER COMPONENT ---
const Preloader = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ 
      opacity: 0, 
      scale: 0.1, 
      transition: { duration: 1, ease: "backIn" } 
    }}
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050816]"
  >
    <div className="relative text-center">
      <div className="text-7xl md:text-9xl font-black text-white tracking-widest flex items-center justify-center">
        <Typewriter
          options={{
            strings: ['AI'],
            autoStart: true,
            loop: false,
            cursor: '|',
            delay: 150,
            wrapperClassName: "text-white",
            cursorClassName: "text-cyan-500 animate-pulse"
          }}
        />
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-cyan-500"
        >
          .
        </motion.span>
      </div>
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-4"
      />
    </div>
  </motion.div>
);

export default function PortfolioPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true); 
  const colorCycle = ["#22d3ee", "#a855f7", "#ec4899", "#6366f1"];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); 
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const experiences: Experience[] = [
    {
      title: "Senior AI Developer",
      company_name: "Tech Solutions Inc.",
      icon: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
      iconBg: "#383E56",
      date: "March 2023 - Present",
      points: [
        "Developing and maintaining AI agents using OpenAI and LangChain.",
        "Collaborating with cross-functional teams to create high-quality products.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews and providing constructive feedback.",
      ],
    },
    {
      title: "Next.js Developer",
      company_name: "Web Wizards",
      icon: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png",
      iconBg: "#E6DEDD",
      date: "Jan 2022 - Feb 2023",
      points: [
        "Built dynamic web applications using Next.js and Tailwind CSS.",
        "Optimized website performance for maximum speed and scalability.",
        "Integrated RESTful APIs and handled state management with Redux.",
      ],
    },
  ];

  const projects: Project[] = [
    {
      name: "AI SaaS Platform",
      description: "A comprehensive AI platform for generating high-quality content and images using GPT-4.",
      tags: [
        { name: "nextjs", color: "text-blue-400" },
        { name: "mongodb", color: "text-green-400" },
        { name: "tailwind", color: "text-pink-400" },
      ],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      source_code_link: "https://github.com/",
    },
    {
        name: "E-Commerce App",
        description: "Full-stack e-commerce solution with Stripe integration and real-time inventory tracking.",
        tags: [
          { name: "react", color: "text-cyan-400" },
          { name: "restapi", color: "text-green-400" },
          { name: "scss", color: "text-pink-400" },
        ],
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
        source_code_link: "https://github.com/",
      },
      {
        name: "3D Portfolio",
        description: "An immersive 3D portfolio using Three.js and Framer Motion for high-end animations.",
        tags: [
          { name: "threejs", color: "text-blue-400" },
          { name: "fiber", color: "text-emerald-400" },
          { name: "framer", color: "text-orange-400" },
        ],
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
        source_code_link: "https://github.com/",
      },
      {
        name: "Crypto Tracker",
        description: "Real-time cryptocurrency dashboard with live price updates and market analysis charts.",
        tags: [
          { name: "nextjs", color: "text-blue-400" },
          { name: "tailwind", color: "text-green-400" },
          { name: "recharts", color: "text-pink-400" },
        ],
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800",
        source_code_link: "https://github.com/",
      },
      {
        name: "AI Image Gen",
        description: "Web application that creates stunning visuals from text prompts using DALL-E API.",
        tags: [
          { name: "openai", color: "text-cyan-400" },
          { name: "react", color: "text-green-400" },
          { name: "node", color: "text-pink-400" },
        ],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
        source_code_link: "https://github.com/",
      },
      {
        name: "Social Dashboard",
        description: "Comprehensive admin dashboard for managing social media metrics and user analytics.",
        tags: [
          { name: "typescript", color: "text-blue-400" },
          { name: "supabase", color: "text-emerald-400" },
          { name: "shadcn", color: "text-orange-400" },
        ],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        source_code_link: "https://github.com/",
      },
  ];

  const socialLinks = [
    { name: 'WhatsApp', url: 'https://wa.me/923467894921', color: 'hover:text-green-400' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/arsalan-zafar-4816473a7', color: 'hover:text-blue-400' },
    { name: 'GitHub', url: 'https://github.com/Arsalan-agent', color: 'hover:text-white' },
    { name: 'Instagram', url: 'https://www.instagram.com/azagent08?igsh=YjJzaTg0a2ZyMmdl&utm_source=qr', color: 'hover:text-pink-400' },
  ];

  const services = [
    {
      title: "Generative AI Developer",
      desc: "Generative AI Developer creating interactive and user-friendly AI integrated websites.",
      icon: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
      gradient: "linear-gradient(to bottom right, #06b6d4, #a855f7)"
    },
    {
      title: "Next Js Developer",
      desc: "Next.js developer building dynamic and responsive web applications with React.",
      icon: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png",
      gradient: "linear-gradient(to bottom right, #34d399, #06b6d4)"
    },
    {
      title: "Backend Developer",
      desc: "Backend developer creating server-side solutions using Fastapi and Postgres.",
      icon: "https://cdn-icons-png.flaticon.com/512/2165/2165004.png",
      gradient: "linear-gradient(to bottom right, #a855f7, #ec4899)"
    },
    {
      title: "React Js Developer",
      desc: "React.js developer crafting engaging and responsive user interfaces with tailwindcss.",
      icon: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
      gradient: "linear-gradient(to bottom right, #3b82f6, #6366f1)"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-slate-200 font-sans selection:bg-cyan-500 overflow-x-hidden">
      
      <AnimatePresence mode="wait">
        {loading && <Preloader key="loader" />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={!loading ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <style jsx>{`
            @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .animate-border-flow {
              position: absolute; inset: -2px;
              background: conic-gradient(from 0deg, transparent, #06b6d4, #10b981, transparent);
              animation: rotate 4s linear infinite; border-radius: 20px; z-index: -1;
            }
            .experience-border {
              position: absolute; inset: -1px;
              background: conic-gradient(from 0deg, transparent, #06b6d4, #8b5cf6, transparent);
              animation: rotate 6s linear infinite; border-radius: 24px; z-index: -1;
            }
            /* Profile Border Adjusted for Shorter Length */
            .profile-border-flow {
              position: absolute; inset: -4px;
              background: conic-gradient(from 0deg, transparent 70%, #06b6d4, #10b981, transparent);
              animation: rotate 4s linear infinite; border-radius: 9999px; z-index: -1;
            }
        `}</style>

        {/* --- NAVIGATION BAR (Transparent & No Borders) --- */}
        <nav className="fixed top-0 left-0 w-full z-[100] bg-transparent">
          <div className="flex justify-between items-center px-8 py-5 max-w-7xl mx-auto">
            <div className="text-xl font-black tracking-tighter text-white cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              AI <span className="text-cyan-500">.</span>
            </div>
            
            <div className="flex items-center gap-4 md:gap-8">
              <button onClick={() => scrollToSection('about')} className="hover:border-1 hover:border-white p-1 rounded-md transition-all">About</button>
              <button onClick={() => scrollToSection('work')} className="hover:border-1 hover:border-white p-1 rounded-md transition-all">Work</button>
              <button onClick={() => scrollToSection('contact')}  className="hover:border-1 hover:border-white p-1 rounded-md transition-all">Contact</button>

              <div className="relative">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-xs font-bold hover:bg-white/1 transition flex items-center gap-1 text-white"
                >
                  GET IN TOUCH
                  <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-[#0b0e1a] border border-white/10 backdrop-blur-2xl rounded-2xl p-2 shadow-2xl z-50">
                    {socialLinks.map((link, index) => (
                      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={`block px-4 py-3 text-sm font-medium text-slate-400 rounded-xl transition-all ${link.color} hover:bg-white/5`}>
                        {link.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* --- HERO SECTION --- */}
        <div className="relative min-h-screen flex items-center" style={{ backgroundImage: "url('/14.JPG')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-[#050816]/75 z-0"></div>
          
          <div className="absolute inset-0 z-0">
             <CodeBackground />
          </div>

          <div className="relative z-20 w-full pt-20">
            <div className="flex flex-col md:flex-row-reverse items-center justify-center px-8 max-w-7xl mx-auto gap-10 md:gap-20">
              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75 }}>
                <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} scale={1.05}>
                  
                  <div className="relative w-[280px] h-[320px] md:w-[400px] md:h-[450px] rounded-2xl overflow-hidden group bg-transparent flex flex-col justify-center items-center p-4 border border-white/10">
                    
                    <CodeBackground />

                    <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center relative z-20">
                      <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold tracking-widest uppercase">Next Gen AI Automation</div>
                      
                      <div className="relative w-24 h-24 md:w-40 md:h-40 mb-4">
                        <div className="profile-border-flow"></div>
                        <div className="w-full h-full rounded-full bg-[#050816] flex items-center justify-center overflow-hidden border-2 border-white/10 shadow-lg shadow-cyan-500/20 relative z-10">
                          <img src="/007.jpg" alt="Arsalan" className="w-full h-full object-cover" />
                        </div>
                      </div>

                      <div className="text-center">
                        <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-white leading-tight uppercase">ARSALAN</h1>
                        <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 leading-tight uppercase">ZAFAR</h1>
                      </div>
                    </motion.div>
                  </div>
                </Tilt>
              </motion.div>        

              <div className="flex-1 text-center md:text-left">
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75 }}>
                  <h2 className="text-white font-bold text-3xl md:text-6xl mb-4 leading-tight drop-shadow-sm">
                    Hi, I'm <motion.span animate={{ color: colorCycle }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="font-extrabold">Arsalan</motion.span>
                  </h2>
                  <div className="font-bold text-2xl md:text-4xl min-h-[50px]">
                    <motion.div animate={{ color: colorCycle }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                      <Typewriter options={{ strings: ['Generative AI Developer', 'Next.js Developer', 'Backend Specialist'], autoStart: true, loop: true, wrapperClassName: "font-bold" }} />
                    </motion.div>
                  </div>
                  <p className="pt-6 max-w-xl md:mx-0 mx-auto text-lg md:text-xl text-slate-400 leading-relaxed mb-8">
                      Building intelligent workflows that scale. I bridge the gap between <span className="text-slate-100 font-semibold"> complex AI models </span> and real-world business automation.
                  </p>
                  <button onClick={() => scrollToSection('work')} className="bg-gradient-to-r from-[#915eff] to-[#7a49e0] hover:from-[#7a49e0] hover:to-[#915eff] text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-purple-500/30 active:scale-95">
                      View My Work
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* --- ABOUT SECTION --- */}
        <section id="about" className="relative py-32 overflow-hidden" style={{ backgroundImage: "url('/12.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
          <div className="absolute inset-0 bg-[#050816]/90 z-0"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20">
            <div className="max-w-4xl">
                <p className="text-cyan-500 uppercase tracking-[0.3em] text-xs font-bold mb-4">Get to know me</p>
                <h2 className="text-white text-5xl md:text-7xl font-extrabold mb-10 tracking-tight">Overview<span className="text-cyan-500">.</span></h2>
                <p className="text-slate-300 text-lg md:text-2xl leading-relaxed font-light">
                 I'm a skilled <span className="text-white font-semibold">Generative AI developer</span> specialist building robust systems with FastAPI and Next.js. I focus on creating seamless user experiences powered by intelligent backends.
                </p>
            </div>

            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {services.map((service, index) => (
                <Tilt key={index} scale={1.02} className="flex">
                  <div className="relative w-full p-[1px] rounded-[20px] overflow-hidden group">
                    <div className="animate-border-flow group-hover:duration-1000"></div>
                    <div className="bg-[#0b0e1a]/95 backdrop-blur-md rounded-[20px] py-10 px-6 flex-1 min-h-[340px] flex flex-col items-center justify-center relative z-10">
                      <div className="p-4 bg-white/5 rounded-2xl mb-6"><img src={service.icon} alt={service.title} className="w-12 h-12 object-contain" /></div>
                      <h3 className="text-white text-xl font-bold text-center mb-4">{service.title}</h3>
                      <p className="text-slate-400 text-sm text-center leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                </Tilt>
              ))}
            </div>
          </div>
        </section>

        {/* --- WORK SECTION --- */}
        <section id="work" className="relative py-32 overflow-hidden border-t border-white/5" style={{ backgroundImage: "url('/11.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
          <div className="absolute inset-0 bg-[#050816]/95 z-0"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-white text-5xl md:text-7xl font-extrabold mb-20 tracking-tight">Experience<span className="text-cyan-500">.</span></h2>
            </motion.div>

            <div className="relative flex flex-col gap-10 mb-32">
              <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent opacity-20 hidden md:block"></div>
              {experiences.map((exp, index) => (
                <div key={index} className={`relative flex items-center justify-between w-full mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_15px_#06b6d4] z-30 hidden md:block"></div>
                  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full md:w-[45%] ml-12 md:ml-0">
                    <div className="relative p-[1px] rounded-3xl overflow-hidden group">
                      <div className="experience-border"></div>
                      <div className="bg-[#0b0e1a]/95 backdrop-blur-xl p-8 rounded-3xl relative z-10 h-full">
                        <div className="flex justify-between items-start mb-6">
                          <div className="p-3 bg-white/5 rounded-2xl border border-white/10"><img src={exp.icon} alt="icon" className="w-8 h-8 object-contain" /></div>
                          <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full uppercase">{exp.date}</span>
                        </div>
                        <h3 className="text-white text-2xl font-black">{exp.title}</h3>
                        <p className="text-slate-400 font-medium mb-6 text-sm flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> {exp.company_name}</p>
                        <ul className="space-y-3">
                          {exp.points.map((point, idx) => (
                            <li key={idx} className="flex gap-3 text-slate-300 text-sm leading-relaxed"><span className="text-cyan-500 font-bold">/</span> {point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                  <div className="hidden md:block w-[45%]"></div>
                </div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-white text-5xl md:text-7xl font-extrabold mb-10 tracking-tight">Portfolio<span className="text-cyan-500">.</span></h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map((project, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}>
                  <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} className="bg-[#1d1836]/90 backdrop-blur-md p-5 rounded-3xl h-full border border-white/10 hover:border-cyan-500/50 transition-all shadow-2xl overflow-hidden">
                    <div className="relative w-full h-[200px] mb-5 overflow-hidden rounded-2xl">
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                      <div className="absolute top-3 right-3 flex gap-2">
                         <div onClick={() => window.open(project.source_code_link, "_blank")} className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex justify-center items-center cursor-pointer hover:bg-black/90 transition-all border border-white/20">
                            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github" className="w-1/2 h-1/2 invert" />
                         </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <h3 className="text-white font-bold text-[24px] mb-2">{project.name}</h3>
                      <p className="text-slate-400 text-[14px] leading-relaxed line-clamp-2">{project.description}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag.name} className={`text-[12px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 ${tag.color}`}>#{tag.name}</span>
                      ))}
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CONTACT SECTION (UPDATED: Fully Transparent) --- */}
        <section id="contact" className="relative w-full h-screen overflow-hidden bg-[#050816] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
              <ambientLight intensity={0.7} />
              <Suspense fallback={null}>
                <StarsBackground />
                <MovingGalaxy />
                <RealisticMoon />
              </Suspense>
              <Preload all />
            </Canvas>
          </div>

          <div className="relative z-10 flex items-center justify-center w-full px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 10, y: 120 }} 
              whileInView={{ opacity: 71, y: 10 }} 
              viewport={{ once: true }} 
              className="bg-transparent border border-white/20 p-6 md:p-10 rounded-3xl w-full max-w-lg"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">Contact Us</h2>
              <form className="flex flex-col gap-4 md:gap-5 mt-6 md:mt-8">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="bg-transparent border border-white/20 p-3 md:p-4 rounded-xl text-white outline-none focus:border-[#915eff] transition-all text-sm md:text-base" 
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-transparent border border-white/20 p-3 md:p-4 rounded-xl text-white outline-none focus:border-[#915eff] transition-all text-sm md:text-base" 
                />
                <textarea 
                  placeholder="Your Message" 
                  rows={4} 
                  className="bg-transparent border border-white/20 p-3 md:p-4 rounded-xl text-white outline-none focus:border-[#915eff] transition-all text-sm md:text-base resize-none" 
                />
                <button 
                  type="submit" 
                  className="border border-[#915eff] text-[#915eff] font-bold py-3 md:py-4 rounded-xl hover:bg-[#915eff] hover:text-white transition-all active:scale-95 text-sm md:text-base"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        <footer className="py-12 text-center text-slate-500 text-xs border-t border-white/5 bg-[#050816]">
          <div className="flex justify-center gap-6 mb-4">
            {socialLinks.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className={`transition-colors ${s.color}`}>{s.name}</a>
            ))}
          </div>
          © 2026 Arsalan Zafar. Built with Next.js & Framer Motion.
        </footer>
      </motion.div>
    </div>
  );
}