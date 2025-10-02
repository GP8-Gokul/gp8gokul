import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const education = [
  {
    institution: "Muthoot Institute of Technology and Science",
    degree: "B.Tech Computer Science",
    period: "2022 – 2026",
    score: "9.56 CGPA",
    logo: "mits.jpeg"
  },
  {
    institution: "St. Mary's HSS, Thalacode", 
    degree: "Class XII",
    period: "2021 – 2022",
    score: "98.8%",
    logo: "stmarys.jpg"
  },
  {
    institution: "Georgian Academy E.M.H.S",
    degree: "Class X", 
    period: "2019 – 2020",
    score: "95%",
    logo: "georgian.png"
  }
];

const certifications = [
  {
    name: "CSR Internship Program",
    issuer: "CSRBox",
    issuingDate: "June 2023",
    image: "certificates/Internships/csrbox.png",
  },
  {
    name: "Nexus Hackathon",
    issuer: "Nexus",
    issuingDate: "August 2024",
    image: "certificates/hackathons/nexus-2024.png",
  },
  {
    name: "Python Basic",
    issuer: "HackerRank",
    issuingDate: "November 2023",
    image: "certificates/technical/python-basic.png",
  }
];

export default function Certifications({ certificationsRef }) {
  const navigate = useNavigate();
  return (
    <section ref={certificationsRef} className="mx-1 md:mx-20 mt-20 px-6">
        
        {/* Education Section - Top Row */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Education</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            {education.map((edu, index) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 25px -8px rgba(0, 0, 0, 0.15)" }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all duration-300"
              >
                {/* School Logo */}
                <div className="flex justify-center mb-3">
                  <img 
                    src={edu.logo} 
                    alt={`${edu.institution} logo`}
                    loading='lazy'
                    className="w-12 h-12 object-contain rounded-full bg-slate-50 border border-slate-200"
                  />
                </div>

                <div className="text-center space-y-2">
                  <h4 className="font-bold text-slate-800 text-sm leading-tight">
                    {edu.institution}
                  </h4>
                  <p className="text-slate-600 text-xs">{edu.degree}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">{edu.period}</span>
                    <span className="bg-blue-100 text-blue-800 hover:bg-blue-300 px-2 py-1 rounded-full font-semibold">
                      {edu.score}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section - Bottom Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-800">Certifications</h3>
            <motion.button
              className="px-6 py-1 border-2 border-slate-300 text-white font-semibold rounded-lg bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/certificates')}
            >
              View All →
            </motion.button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 25px -8px rgba(0, 0, 0, 0.15)" }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg hover:border-slate-300 transition-all duration-300"
              >
                {/* Certificate Image */}
                <img 
                  src={cert.image} 
                  alt={cert.name}
                  loading='lazy'
                  className="w-full h-40 object-fill bg-slate-50 rounded-lg mb-3"
                />
              
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800 text-sm group-hover:text-slate-600 transition-colors">
                    {cert.name}
                  </h4>
                  
                  <p className="text-slate-600 text-xs">
                    {cert.issuer}
                  </p>
                  
                  <p className="text-slate-500 text-xs">
                    {cert.issuingDate}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
    </section>
  );
}