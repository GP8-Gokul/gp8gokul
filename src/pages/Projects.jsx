import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const projects = [
    {
        title: "Full-Stack Blog Platform",
        description: "Comprehensive web application with secure authentication, rich text editing, and responsive design.",
        tools: ["Node.js", "Express", "MongoDB", "JWT", "React"],
        languages: ["JavaScript", "HTML", "CSS"],
        liveLink: "https://blogs-5ppq.onrender.com/",
        githubLink: "https://github.com/GP8-Gokul/blogs",
        image: "projects/blog.png",
        type: "Web"
    },
    {
        title: "Quiz Application",
        description: "Interactive real-time quiz platform with live sessions and dynamic leaderboards using WebSocket technology.",
        tools: ["Node.js", "Express", "PostgreSQL","Tailwind CSS", "WebSockets", "React"],
        languages: ["JavaScript"],
        liveLink: "https://quiz-application-one-lyart.vercel.app/",
        githubLink: "https://github.com/GP8-Gokul/Quiz-Application",
        image: "projects/quiz.png",
        status: "🚧 Under Development",
        type: "Web"
    },
    {
        title: "Portfolio Website",
        description: "This Website you are currently viewing! ",
        tools: ["React"," Tailwind CSS", "Framer Motion"],
        languages: ["JavaScript"],
        liveLink: "https://gp8gokul.vercel.app/",
        githubLink: "https://github.com/GP8-Gokul/gp8gokul",
        image: "projects/gp8.png",
        type: "Web"
    },
    {
        title: "Disaster Management App",
        description: "Mobile application for disaster data management with robust APIs and comprehensive form validation.",
        tools: ["Flutter", "Flask", "SQLite", "JWT", "Flutter_tts"],
        languages: ["Dart", "Python", "SQL"],
        githubLink: "https://github.com/GP8-Gokul/Disaster_Response_System",
        image: 'projects/drs.png',
        type: "Mobile"
    },
    {
        title: "Real-Time Chat Application using Socket.IO",
        description: "A simple real-time chat application built with Node.js, Socket.IO, and a Flutter frontend — inspired by WhatsApp.",
        tools: ["Node.js", "Express", "Socket.IO", "Flutter", "MongoDB"],
        languages: ["JavaScript", "Dart"],
        githubLink: "https://github.com/GP8-Gokul/Chat-Application",
        image: null,
        status: "🚧 Under Development",
        type: "Mobile"
    }
];

const calculateAnalytics = (projects) => {
    const toolsCount = {};
    const languagesCount = {};
    const typesCount = { 'Web': 0, 'Mobile': 0, 'AI/ML': 0 };
    
    projects.forEach(project => {
        typesCount[project.type]++;
        
        [...new Set(project.tools)].forEach(tool => {
            toolsCount[tool] = (toolsCount[tool] || 0) + 1;
        });

        project.languages.forEach(language => {
            languagesCount[language] = (languagesCount[language] || 0) + 1;
        });
    });

    const sortedTools = Object.entries(toolsCount).sort(([,a], [,b]) => b - a).slice(0,6);
    const sortedLanguages = Object.entries(languagesCount).sort(([,a], [,b]) => b - a).slice(0,6);
    const projectTypes = Object.entries(typesCount).filter(([,count]) => count > 0);

    return {
        tools: sortedTools,
        languages: sortedLanguages,
        types: projectTypes,
        totalProjects: projects.length,
        liveProjects: projects.filter(p => p.liveLink).length
    };
};

// Analytics Sidebar Sidebar Component
const ProjectAnalytics = ({ projects }) => {
    const analytics = calculateAnalytics(projects);

    const StatCard = ({ value, label, bgClass }) => (
        <div className={`${bgClass} rounded-lg p-3 text-center`}>
            <div className="text-2xl font-bold text-slate-800">{value}</div>
            <div className="text-xs text-slate-600">{label}</div>
        </div>
    );

    const TagList = ({ title, items, colorClass }) => (
        <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-2">{title}</h4>
            <div className="flex flex-wrap gap-1">
                {items.map(([item, count]) => (
                    <span key={item} className={`text-xs ${colorClass} px-2 py-1 rounded-full font-medium`}>
                        {item} ({count})
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-lg p-4 space-y-4 shadow-sm">
            {/* Header */}
            <div className="text-center">
                <h3 className="text-lg font-bold text-slate-800 mb-1">Analytics 📊</h3>
                <p className="text-xs text-slate-500">Tech Stack Overview</p>
            </div>
            
            {/* Project Stats */}
            <div className="grid grid-cols-2 gap-3">
                <StatCard 
                    value={analytics.totalProjects} 
                    label="Total Projects" 
                    bgClass="bg-gradient-to-br from-blue-50 to-indigo-50" 
                />
                <StatCard 
                    value={analytics.liveProjects} 
                    label="Live Demos" 
                    bgClass="bg-gradient-to-br from-emerald-50 to-teal-50" 
                />
            </div>

            {/* Tech Stack Overview */}
            <div className="bg-slate-50 rounded-lg p-3 space-y-3">
                {/* Project Types */}
                <div>
                    <h4 className="text-sm font-semibold text-slate-800 mb-2">Project Types</h4>
                    <div className="flex flex-wrap gap-2">
                        {analytics.types.map(([type, count]) => {
                            const emoji = type === 'Web' ? '🌐' : type === 'Mobile' ? '📱' : '🤖';
                            return (
                                <span key={type} className="inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full border border-slate-200">
                                    <span>{emoji}</span>
                                    <span className="font-medium">{type}</span>
                                    <span className="bg-slate-200 text-slate-700 px-1.5 rounded-full font-semibold">{count}</span>
                                </span>
                            );
                        })}
                    </div>
                </div>

                <TagList 
                    title="Languages" 
                    items={analytics.languages} 
                    colorClass="bg-blue-100 text-blue-800" 
                />
                
                <TagList 
                    title="Tools & Frameworks" 
                    items={analytics.tools} 
                    colorClass="bg-emerald-100 text-emerald-800" 
                />
            </div>

            {/* Footer */}
            <div className="text-center">
                <div className="text-xs text-slate-500 bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-1.5 rounded-full inline-block">
                    🚀 Always Building & Learning
                </div>
            </div>
        </div>
    );
};

// Analytics Modal Component for Mobile
const AnalyticsModal = ({ isOpen, onClose, projects }) => {
    if (!isOpen) return null;

    return (
        <motion.div 
            className="lg:hidden fixed inset-0 bg-black/80 flex items-end justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div 
                className="bg-white rounded-t-lg p-6 w-full max-w-md max-h-[80vh] overflow-auto"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Analytics</h3>
                    <button 
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                {/* Modal Content */}
                <div>
                    <ProjectAnalytics projects={projects} />
                </div>
            </motion.div>
        </motion.div>
    );
};

// Project Card Component
const ProjectCard = ({ project, index }) => {
    const StatusBadge = () => project.status ? (
        <div className="absolute top-3 right-3 bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium z-10">
            {project.status}
        </div>
    ) : null;

    const ProjectImage = () => project.image ? (
        <img 
            src={project.image} 
            alt={project.title}
            loading="lazy"
            className="w-full h-32 object-contain bg-slate-50 rounded-lg mb-3"
        />
    ) : (
        <div className="w-full h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-3 flex items-center justify-center">
            <div className="text-slate-400 text-4xl">📱</div>
        </div>
    );

    const TechStack = ({ title, items, colorClass }) => (
        <div>
            <h5 className="text-xs font-semibold text-slate-700 mb-1">{title}</h5>
            <div className="flex flex-wrap gap-1">
                {items.map(item => (
                    <span key={item} className={`px-2 py-1 ${colorClass} rounded text-xs font-medium border`}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );

    const ActionButtons = () => (
        <div className="flex gap-2 pt-2 mt-auto">
            {project.liveLink && (
                <motion.a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 text-center px-3 py-2 bg-slate-800 text-white font-medium rounded-md hover:bg-slate-700 transition-colors text-xs"
                    whileHover={{ scale: 1.02 }}
                >
                    Live Demo
                </motion.a>
            )}
            <motion.a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${project.liveLink ? 'flex-1' : 'w-full'} text-center px-3 py-2 border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-50 hover:border-slate-400 transition-colors text-xs`}
                whileHover={{ scale: 1.02 }}
            >
                View Code
            </motion.a>
        </div>
    );

    return (
        <motion.div
            key={project.title}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg hover:border-slate-300 transition-all duration-300 h-full flex flex-col"
        >
            <StatusBadge />
            <ProjectImage />

            {/* Project Content */}
            <div className="space-y-3 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-slate-600 transition-colors">
                    {project.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="space-y-2">
                    <TechStack 
                        title="Tools & Frameworks" 
                        items={[...new Set(project.tools)]} 
                        colorClass="bg-emerald-50 text-emerald-800 border-emerald-200" 
                    />
                    <TechStack 
                        title="Languages" 
                        items={project.languages} 
                        colorClass="bg-blue-50 text-blue-800 border-blue-200" 
                    />
                </div>
                
                <ActionButtons />
            </div>
        </motion.div>
    );
};

// Header Component
const PageHeader = ({ onGoBack, onAnalyticsClick }) => (
    <div className="flex items-center justify-between mb-8 pt-10">
        <button 
            onClick={onGoBack}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white hover:bg-slate-700 rounded-lg transition-colors font-medium"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className='hidden md:block'>Go Back</span>
        </button>
        
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Projects</h2>
        
        {/* Analytics Button - Mobile Only */}
        <button 
            onClick={onAnalyticsClick}
            className="lg:hidden p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            title="View Analytics"
        >
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        </button>
        
        {/* Placeholder for desktop to maintain center alignment */}
        <div className="w-20 hidden lg:block"></div>
    </div>
);

export default function Projects() {
    const navigate = useNavigate();
    const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleGoBack = () => navigate(-1);
    const handleAnalyticsClick = () => setIsAnalyticsModalOpen(true);
    const handleAnalyticsClose = () => setIsAnalyticsModalOpen(false);

    return (
        <div className="min-h-screen bg-gray-50 pt-2">
            <section className="py-4 px-4">
                <div className="max-w-7xl mx-auto">
                    <PageHeader onGoBack={handleGoBack} onAnalyticsClick={handleAnalyticsClick} />

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Projects Grid */}
                        <div className="flex-1">
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {projects.map((project, index) => (
                                    <ProjectCard key={project.title} project={project} index={index} />
                                ))}
                            </div>
                        </div>

                        {/* Analytics Sidebar - Desktop Only */}
                        <div className="hidden lg:block lg:w-80">
                            <div className="sticky top-20">
                                <ProjectAnalytics projects={projects} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Analytics Modal for Mobile */}
            <AnalyticsModal 
                isOpen={isAnalyticsModalOpen} 
                onClose={handleAnalyticsClose} 
                projects={projects}
            />
        </div>
    );
}