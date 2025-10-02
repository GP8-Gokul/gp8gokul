import { motion } from 'framer-motion';

export default function Intro() {
    return (
        <section className="min-h-screen mx-1 md:mx-20 flex px-6 pt-2 relative z-10 cursor-default">
          <div className="grid  md:grid-cols-2 items-start mt-20 md:mt-30">
            {/** Left Column: Introduction Text and Buttons **/}
            <motion.div 
              initial={{ opacity: 0,scale: 0.90,y: -20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-2 pb-4">Gokul P Jayan</h1>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-600 mb-2 uppercase">Software Developer</h2>
              
              <p className="text-gray-600 mt-8 mb-8 text-lg">
                “Building clean and reliable web systems, with experience in app development and a growing focus on AI.”
              </p>

              <div className="flex gap-4">
                <motion.a 
                  href="#projects" 
                  className="px-8 py-4 bg-slate-800 text-white font-semibold rounded-lg"
                  whileHover={{ scale: 1.1 , backgroundColor: '#334155', borderColor: '#475569' }}
                >
                  Explore Projects
                </motion.a>
                <motion.a 
                  href="#profile" 
                  className="px-8 py-4 border-2 border-slate-300 font-semibold rounded-lg"
                  whileHover={{ scale: 1.1 , borderColor: '#94a3b8' }}
                >
                  Connect
                </motion.a>
              </div>
            </motion.div>
            
            {/** Right Column: Skills Grid **/}
            <motion.div 
              initial={{ opacity: 0,scale: 0.90,y: -20}}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center md:mt-6"
            >
              <div className="grid grid-cols-2 gap-6 md:gap-8 items-center">
                {["Full Stack Development","Frontend Development", "Backend Development","Mobile Development",
                  "AI Development","DevOps","Cybersecurity","Cloud Computing"
                ].map((skill) => (
                  <motion.div
                    key={skill}
                    className="
                      bg-slate-100 hover:bg-slate-200
                      border border-slate-200 
                      rounded-lg p-4 
                      text-center  
                      transition-colors duration-300
                    "
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 8px 25px -8px rgba(0, 0, 0, 0.15)"
                    }}
                  >
                    <h3 className="text-slate-700 font-semibold text-sm">
                      {skill}
                    </h3>
                  </motion.div>
                ))}
              </div>
              
              {/* Subtle accent line */}
              <div className="mt-3 w-32 h-0.5 bg-slate-300"/>
            </motion.div>
          </div>
        </section>
    )
}