import React from 'react';
import { Layers, Zap, Shield, Sparkles } from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: <Zap className="text-accent" size={32} />,
      title: 'Lightning Fast',
      description: 'Built with React, Vite, and an ultra-fast .NET Core Web API backend.',
    },
    {
      icon: <Layers className="text-primary" size={32} />,
      title: 'Modern Architecture',
      description: 'Employs Context API, React Hooks, and standard routing for seamless UX.',
    },
    {
      icon: <Sparkles className="text-secondary" size={32} />,
      title: 'Beautiful UI',
      description: 'Premium glassmorphism design with a tailored color palette and smooth transitions.',
    },
    {
      icon: <Shield className="text-green-400" size={32} />,
      title: 'Robust Code',
      description: 'Implemented with fully typed immutability and technical debt remediations.',
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          About <span className="gradient-text">TodoMaster</span>
        </h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto">
          The culmination of Phase 2 logic: a complete full-stack CRUD system.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="card glass hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
            <p className="text-text-muted leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-12 card glass p-8 text-center bg-gradient-to-r from-primary/10 to-secondary/10">
        <h3 className="text-2xl font-bold mb-4">Tech Stack</h3>
        <p className="text-lg">
          React 18 &bull; Vite &bull; Tailwind CSS &bull; .NET 9 Web API
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
