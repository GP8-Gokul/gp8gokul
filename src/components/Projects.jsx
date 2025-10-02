import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const projects = [
    {
      title: "Full-Stack Blog Platform",
      description: "Comprehensive web application with secure authentication, rich text editing, and responsive design.",
      tools: ["Node.js", "Express", "MongoDB", "React"],
      liveLink: "https://blogs-5ppq.onrender.com/",
      githubLink: "https://github.com/GP8-Gokul/blogs",
      image: "projects/blog.png"
    },
    {
      title: "Quiz Application",
      description: "Interactive real-time quiz platform with live sessions and dynamic leaderboards using WebSocket technology.",
      tools: ["Node.js", "Express", "PostgreSQL", "WebSockets"],
      liveLink: "https://quiz-application-one-lyart.vercel.app/",
      githubLink: "https://github.com/GP8-Gokul/Quiz-Application",
      image: "projects/quiz.png"
    },
    {
      title: "Disaster Management App",
      description: "Mobile application for disaster data management with robust APIs and comprehensive form validation.",
      tools: ["Flutter", "Flask", "SQLite"],
      githubLink: "https://github.com/GP8-Gokul/Disaster_Response_System",
      image: "projects/drs.png"
    }
];

export default function Projects({projectsRef}) {
  const navigate = useNavigate();
  return(
    <section ref={projectsRef} className="py-2 px-6 md:mx-15">
      <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-10 text-center">Projects</h2>

      {/*Project Cards Grid*/}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-8 mx-2">

        {/* Individual Project Cards*/}
        {projects.map((project) => (
          <motion.div
            key={project.title}
            initial={{ scale: 0.90 }}
            whileInView={{ scale: 1 }}
            whileHover={{ scale: 1.1, boxShadow: "0 8px 25px -8px rgba(0, 0, 0, 0.15)" }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="group relative bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300"
          >

            {/* Thumbnail */}
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title}
                loading="lazy"
                className="w-full h-32 object-contain bg-slate-50 rounded-lg mb-3"
              />
              ) : (
              <div className="w-full h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-3 flex items-center justify-center">
                📱
              </div>
              )
            }

            {/* Project Details */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-800">
                {project.title}
              </h3>
                    
              <p className="text-gray-600 text-sm leading-relaxed">
                {project.description}
              </p>
                    
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map(tool => (
                  <span key={tool} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                    {tool}
                  </span>
                ))}
              </div>
                    
              <div className="flex gap-2 pt-2">
                {project.liveLink && (
                  <motion.a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="
                      flex-1 
                      text-center text-white font-medium text-sm
                      px-3 py-2 
                      bg-slate-800 hover:bg-black
                      rounded-md transition-colors 
                    "
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Live Demo
                  </motion.a>
                )}
                <motion.a 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`
                    ${project.liveLink ? 'flex-1' : 'w-full'} 
                    text-center text-slate-900 font-medium text-sm
                    px-3 py-2 
                    bg-slate-100 hover:bg-slate-300
                    border border-slate-800 
                    rounded-md  transition-colors 
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Code
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Projects Button */}
      <motion.button
        className="
          block 
          mx-auto px-8 py-3 
          border-2 border-slate-300 hover:border-slate-800
          text-slate-100 font-semibold hover:text-white
          rounded-lg 
          bg-slate-800 hover:bg-black   
          transition-all duration-300
        "
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {navigate('/projects');}}
      >
        View All Projects →
      </motion.button>
    </section>
  );
}