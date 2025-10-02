import { motion } from 'framer-motion';

// Skills data organized by category
const skillsData = {
  languages: {
    title: "Programming Languages",
    skills: ['Python', 'C', 'JavaScript', 'Dart'],
    color: 'blue'
  },
  fullstack: {
    title: "Full Stack Development",
    skills: ['React', 'Node.js', 'Express.js', 'Flask', 'HTML5', 'CSS3', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'SQLite', 'Flutter'],
    color: 'green'
  },
  ai: {
    title: "AI Tools",
    skills: ['TensorFlow', 'Scikit-learn', 'Google Gemini API'],
    color: 'purple'
  },
  others: {
    title: "Others",
    skills: ['Git', 'GitHub', 'Docker', 'VS Code', 'Postman', 'Vercel', 'Render'],
    color: 'orange'
  }
};

const colorConfig = {
  blue: { bg: 'bg-blue-50/50', text: 'text-slate-700', border: 'border-blue-100' },
  green: { bg: 'bg-green-50/50', text: 'text-slate-700', border: 'border-green-100' },
  purple: { bg: 'bg-purple-50/50', text: 'text-slate-700', border: 'border-purple-100' },
  orange: { bg: 'bg-orange-50/50', text: 'text-slate-700', border: 'border-orange-100' }
};

export default function About({ aboutRef }) {
    return(
        <section ref={aboutRef} className='min-h-screen py-2 px-6'>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-12 text-center tracking-tight">
              About Me
            </h2>
            
            <div className="grid md:grid-cols-2 gap-16 items-start">

              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <p className="text-gray-700 text-lg leading-relaxed font-medium">
                  Hi, I'm Gokul — a passionate developer and lifelong learner. 
                  Technology fascinates me, and I thrive on creating solutions that make a real impact. 
                  I focus on building efficient, user-friendly applications while continuously sharpening my skills in this fast-evolving field.
                </p>
                
                <p className="text-gray-700 text-lg leading-relaxed font-medium">
                  I specialize in full-stack development with the MERN stack, building scalable web applications 
                  that solve real-world problems. My experience spans from creating responsive frontends with React 
                  to developing robust backends with Node.js and databases like MongoDB and PostgreSQL.
                </p>
                
                <p className="text-gray-700 text-lg leading-relaxed font-medium">
                  Beyond web development, I'm deeply interested in mobile app development using Flutter and exploring 
                  the exciting world of AI and machine learning. I believe in writing clean, maintainable code and 
                  following best practices to create applications that are both functional and user-friendly.
                </p>
              </motion.div>
              

              {/* Skills Section */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-full flex flex-col justify-start"
              >
                
                <div className="grid grid-cols-1 gap-3 h-fit">
                  {Object.entries(skillsData).map(([category, data], index) => (
                    <motion.div 
                      key={category}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`
                        ${colorConfig[data.color].bg} 
                        ${colorConfig[data.color].border}
                        border rounded-lg p-4 hover:shadow-lg hover:border-slate-300 transition-all duration-300
                      `}
                    >
                      <h4 className={`text-sm font-semibold ${colorConfig[data.color].text} uppercase tracking-wider mb-2.5`}>
                        {data.title}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {data.skills.map((skill) => (
                          <motion.span
                            key={skill}
                            className={`text-sm font-medium px-2.5 py-1 rounded-md cursor-default transition-all duration-200 ${
                              data.color === 'blue' ? 'bg-blue-100/70 text-blue-700 border border-blue-200' :
                              data.color === 'green' ? 'bg-green-100/70 text-green-700 border border-green-200' :
                              data.color === 'purple' ? 'bg-purple-100/70 text-purple-700 border border-purple-200' :
                              'bg-orange-100/70 text-orange-700 border border-orange-200'
                            }`}
                            whileHover={{ 
                              scale: 1.1,
                              backgroundColor: data.color === 'blue' ? '#0B58BD9A' :
                                             data.color === 'green' ? '#17B35895' :
                                             data.color === 'purple' ? '#7A28D168' : '#fed7aa',
                              boxShadow: '0 4px 12px -4px rgba(0, 0, 0, 0.15)'
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
    )
}