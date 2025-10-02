import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Certificate data
const certificatesData = [
  {
    name: "Digital Circuits and Systems",
    issuer: "NPTEL",
    issuingDate: "April 2024",
    category: "technical", 
    image: "certificates/technical/digital-circuits.png",
    hasVerify: true,
    verifyLink: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL25EE20S94500005304512643"
  },
  {
    name: "Computer Organization and Architecture",
    issuer: "NPTEL",
    issuingDate: "March 2024",
    category: "technical",
    image: "certificates/technical/computer-architecture.png",
    hasVerify: true,
    verifyLink: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL24CS83S35210001403839586"
  },
  {
    name: "AWS Cloud Computing",
    issuer: "Amazon Web Services",
    issuingDate: "February 2024",
    category: "technical",
    image: "certificates/technical/aws-cloud.png",
    hasVerify: true,
    verifyLink: "https://coursera.org/verify/UW9ONUGWQ1YE"
  },
  {
    name: "IBM Cloud Computing",
    issuer: "IBM",
    issuingDate: "January 2024", 
    category: "technical",
    image: "certificates/technical/ibm-cloud.png",
    hasVerify: true,
    verifyLink: "https://coursera.org/verify/5NKXKJT4WGMV"
  },
  {
    name: "Python Basic",
    issuer: "HackerRank",
    issuingDate: "November 2023",
    category: "technical",
    image: "certificates/technical/python-basic.png",
    hasVerify: true,
    verifyLink: "https://www.hackerrank.com/certificates/24f3f28519b2"
  },
  {
    name: "Game Design and Development",
    issuer: "Michigan State University",
    issuingDate: "September 2023",
    category: "technical",
    image: "certificates/technical/game-design.png", 
    hasVerify: true,
    verifyLink: "https://coursera.org/verify/X9ZCDAAU85SN"
  },
  {
    name: "The Science of Well-Being",
    issuer: "Yale University",
    issuingDate: "July 2023",
    category: "extra",
    image: "certificates/extra/science-of-well-being.png",
    hasVerify: true,
    verifyLink: "https://coursera.org/verify/GDGC5X22YA9K"
  },
  {
    name: "Learning How to Learn",
    issuer: "University of California, San Diego",
    issuingDate: "May 2023",
    category: "extra",
    image: "certificates/extra/learning-how-to-learn.png",
    hasVerify: true,
    verifyLink: "https://coursera.org/verify/C63TTL538KG6"
  },
  {
    name: "Global Diplomacy",
    issuer: "University of London",
    issuingDate: "April 2023",
    category: "extra", 
    image: "certificates/extra/global-diplomacy.png",
    hasVerify: true,
    verifyLink: "https://coursera.org/verify/VXVTDCBLWDQM"
  },
  {
    name: "Introduction to Psychology",
    issuer: "University of Toronto",
    issuingDate: "March 2023",
    category: "extra",
    image: "certificates/extra/psychology.png",
    hasVerify: true,
    verifyLink: "https://coursera.org/verify/5VAL4PXBGT5L"
  },

  {
    name: "GATE 2025 - Computer Science",
    issuer: "IIT",
    issuingDate: "February 2025",
    category: "gate",
    image: "certificates/gate/gate-2025-cs.png",
    hasVerify: false
  },
  {
    name: "GATE 2025 - Data Science",
    issuer: "IIT", 
    issuingDate: "February 2025",
    category: "gate",
    image: "certificates/gate/gate-2025-ds.png",
    hasVerify: false
  },
  {
    name: "NASA Space Apps Challenge",
    issuer: "NASA",
    issuingDate: "October 2024",
    category: "hackathons",
    image: "certificates/hackathons/nasa-2024.png",
    hasVerify: false
  },
  {
    name: "Nexus Hackathon",
    issuer: "Nexus",
    issuingDate: "August 2024",
    category: "hackathons",
    image: "certificates/hackathons/nexus-2024.png",
    hasVerify: false
  },
  {
    name: "CSR Internship Program",
    issuer: "CSRBox",
    issuingDate: "June 2023",
    category: "internships",
    image: "certificates/Internships/csrbox.png",
    hasVerify: false
  }
];

const categories = [
  { id: 'all', label: 'All', count: certificatesData.length },
  { id: 'technical', label: 'Technical', count: certificatesData.filter(cert => cert.category === 'technical').length },
  { id: 'hackathons', label: 'Hackathons', count: certificatesData.filter(cert => cert.category === 'hackathons').length },
  { id: 'internships', label: 'Internships', count: certificatesData.filter(cert => cert.category === 'internships').length },
  { id: 'extra', label: 'Extra', count: certificatesData.filter(cert => cert.category === 'extra').length },
  { id: 'gate', label: 'GATE', count: certificatesData.filter(cert => cert.category === 'gate').length }
];

// Certificate Modal Component
const CertificateModal = ({ certificate, isOpen, onClose }) => {
  if (!isOpen || !certificate) return;

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-lg p-4 max-w-3xl max-h-[85vh] overflow-auto w-full mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-slate-800 truncate">{certificate.name}</h2>
            <p className="text-slate-600 text-sm">{certificate.issuer}</p>
            <p className="text-slate-500 text-xs">{certificate.issuingDate}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 flex-shrink-0 ml-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Certificate Image */}
        <img 
          src={certificate.image} 
          alt={certificate.name}
          className="w-full max-h-[50vh] object-contain rounded-lg shadow-lg bg-slate-50 mb-3"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjFGNUY5Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwSDQwMFYyNTBIMjAwVjE1MFoiIHN0cm9rZT0iIzk0QTNCOCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxzdmcgeD0iMjc1IiB5PSIxODAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDUwIDQwIiBmaWxsPSJub25lIj4KICA8cGF0aCBkPSJNNSA1SDE1VjE1SDVWNVoiIHN0cm9rZT0iIzk0QTNCOCIgZmlsbD0iIzk0QTNCOCIvPgogIDx0ZXh0IHg9IjIwIiB5PSIxMyIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk0QTNCOCI+Q2VydGlmaWNhdGU8L3RleHQ+Cjwvc3ZnPgo8L3N2Zz4=';
          }}
        />

        {/* Modal Actions */}
        <div className="flex gap-2 justify-end">
          {certificate.hasVerify && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(certificate.verifyLink, '_blank')}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Verify Certificate
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Certificate Card Component
const CertificateCard = ({ certificate, onCertificateClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg hover:border-slate-300 transition-all duration-300 group cursor-pointer"
    onClick={() => onCertificateClick(certificate)}
  >
    {/* Certificate Image */}
    <div className="relative mb-4">
      <img 
        src={certificate.image} 
        alt={certificate.name}
        loading="lazy"
        className="w-full h-48 object-contain sm:object-cover rounded-lg bg-slate-50"
      />
      {certificate.hasVerify && (
        <div className="absolute top-2 right-2">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            ✓ Verified
          </span>
        </div>
      )}
    </div>

    {/* Certificate Info */}
    <div className="space-y-3">
      <div>
        <h3 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-slate-600 transition-colors">
          {certificate.name}
        </h3>
        <p className="text-slate-600 text-xs mt-1">{certificate.issuer}</p>
        <p className="text-slate-500 text-xs">{certificate.issuingDate}</p>
      </div>

      {/* Verify Button */}
      {certificate.hasVerify && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            window.open(certificate.verifyLink, '_blank');
          }}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors"
        >
          Verify Certificate
        </motion.button>
      )}
    </div>
  </motion.div>
);

export default function Certificates() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredCertificates, setFilteredCertificates] = useState(certificatesData);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredCertificates(certificatesData);
    } else {
      setFilteredCertificates(certificatesData.filter(cert => cert.category === selectedCategory));
    }
  }, [selectedCategory]);

  const handleGoBack = () => navigate(-1);

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  const handleMobileFilterToggle = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const handleMobileFilterSelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsMobileFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-2">
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pt-10">
            <button 
              onClick={handleGoBack}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white hover:bg-slate-700 rounded-lg transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className='hidden md:block'>Go Back</span>
            </button>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Certificates</h1>
            
            {/* Mobile Filter Button */}
            <button 
              onClick={handleMobileFilterToggle}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            
            <div className="w-20 lg:block hidden"></div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Desktop Filter Sidebar */}
            <div className="lg:w-64 hidden lg:block">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 sticky top-20">
                <h3 className="font-bold text-slate-800 mb-4">Filter by Category</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-slate-800 text-white'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.label}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          selectedCategory === category.id
                            ? 'bg-white text-slate-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}>
                          {category.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Filter Modal */}
            {isMobileFilterOpen && (
              <motion.div 
                className="lg:hidden fixed inset-0 bg-black/80 flex items-end justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleMobileFilterToggle}
              >
                <motion.div 
                  className="bg-white rounded-t-lg p-6 w-full max-w-md max-h-[60vh] overflow-auto"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800">Filter by Category</h3>
                    <button
                      onClick={handleMobileFilterToggle}
                      className="text-slate-400 hover:text-slate-600 transition-colors p-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => handleMobileFilterSelect(category.id)}
                        className={`w-full text-left px-3 py-3 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-slate-800 text-white'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{category.label}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedCategory === category.id
                              ? 'bg-white text-slate-800'
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            {category.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Certificates Grid */}
            <div className="flex-1">
              {/* Filter Indicator for all screen sizes */}
              <div className="mb-4">
                <p className="text-slate-600 text-sm">
                  Showing {filteredCertificates.length} {selectedCategory === 'all' ? 'certificates' : `${selectedCategory} certificates`}
                  {selectedCategory !== 'all' && (
                    <button 
                      onClick={() => setSelectedCategory('all')}
                      className="ml-2 text-blue-600 hover:text-blue-800 underline"
                    >
                      Clear filter
                    </button>
                  )}
                </p>
              </div>
              
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                layout
              >
                {filteredCertificates.map((certificate) => (
                  <CertificateCard key={certificate.id} certificate={certificate} onCertificateClick={handleCertificateClick} />
                ))}
              </motion.div>

              {/* Empty State */}
              {filteredCertificates.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-slate-400 text-6xl mb-4">📜</div>
                  <h3 className="text-xl font-bold text-slate-600 mb-2">No certificates found</h3>
                  <p className="text-slate-500">Try selecting a different category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      <CertificateModal 
        certificate={selectedCertificate}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}