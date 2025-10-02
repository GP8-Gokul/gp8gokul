import { motion } from "framer-motion";
import { useState } from "react";
import { siGmail, siGithub, siLeetcode, siHackerrank, siDuolingo } from 'simple-icons';

const contactLinks = [
  { name: 'Email', href: 'mailto:gokulpjayanwork@gmail.com', icon: siGmail },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/gokulpjayan/', icon: '/icons/linkedin.svg', isImage: true },
  { name: 'GitHub', href: 'https://github.com/GP8-Gokul', icon: siGithub },
  { name: 'LeetCode', href: 'https://leetcode.com/u/gokulpjayan2004/', icon: siLeetcode },
  { name: 'HackerRank', href: 'https://www.hackerrank.com/profile/GP8_Gokul', icon: siHackerrank },
  { name: 'Duolingo', href: 'https://www.duolingo.com/profile/GokulPJayan', icon: siDuolingo }
];

const ContactIcon = ({ name, href, icon, isImage }) => {
  const [hover, setHover] = useState(false);
  
  return (
    <a
      href={href}
      {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      title={name}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {isImage ? (
        <img 
          src={icon} 
          alt={name}
          className="w-5 h-5 transition-all duration-300"
          style={{ filter: hover ? 'grayscale(0%)' : 'grayscale(100%)' }}
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={hover ? `#${icon.hex}` : "#666"}
          className="w-5 h-5 transition-all duration-300"
        >
          <path d={icon.path} />
        </svg>
      )}
    </a>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', confirmEmail: '', subject: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear any existing status when user starts typing
    if (submitStatus) {
      setSubmitStatus('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.email !== formData.confirmEmail) {
      setSubmitStatus('email-mismatch');
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
      return;
    }
    
    setIsSubmitting(true);

    const formUrl = import.meta.env.VITE_FORM_LINK;
    
    if (!formUrl) {
      console.error('Form URL not configured');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    const newFormData = new FormData();
    newFormData.append('entry.684226470', formData.name);
    newFormData.append('entry.59949232', formData.email);
    newFormData.append('entry.545915675', formData.subject);
    newFormData.append('entry.667123544', formData.message);

    fetch(formUrl, {
      method: 'POST',
      body: newFormData,
      mode: 'no-cors',
    })
    .then(() => {
      setFormData({ name: '', email: '', confirmEmail: '', subject: '', message: '' });
      setSubmitStatus('success');
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    })
    .catch((error) => {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const inputClass = "w-full px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-transparent text-sm";
  const labelClass = "block text-xs font-medium text-slate-700 mb-0.5";

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-lg p-2.5 shadow-sm border border-slate-200"
    >
      <h3 className="text-base font-semibold text-slate-800 mb-1">Send me a message</h3>
      <p className="text-gray-600 text-xs mb-2">Have a question or want to work together? I'd love to hear from you!</p>
      
      <form onSubmit={handleSubmit} className="space-y-1.5">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="name" className={labelClass}>Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="subject" className={labelClass}>Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="What's this about?"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="email" className={labelClass}>Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="confirmEmail" className={labelClass}>Confirm Email *</label>
            <input
              type="email"
              id="confirmEmail"
              name="confirmEmail"
              required
              value={formData.confirmEmail}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="Confirm your email"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className={labelClass}>Message *</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            className={`${inputClass} py-1.5 resize-none`}
            placeholder="Tell me about your project or just say hi!"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-slate-800 text-white py-1.5 px-3 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:ring-offset-1 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        
        {submitStatus && (
          <p className={`text-sm text-center ${submitStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {submitStatus === 'success' 
              ? 'Thank you! Your message has been sent.' 
              : submitStatus === 'email-mismatch'
              ? 'Email addresses do not match. Please check and try again.'
              : 'Something went wrong. Please try again.'
            }
          </p>
        )}
      </form>
      
      <div className="mt-2 pt-1.5 border-t border-slate-200">
        <p className="text-xs text-gray-500 mb-1">Connect with me:</p>
        <div className="flex justify-start gap-1.5">
          {contactLinks.map((link) => (
            <ContactIcon key={link.name} {...link} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Contacts({ contactsRef }) {
  return (
    <section ref={contactsRef} className="mx-1 md:mx-10 mt-10 md:mt-20 px-6 mb-2">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-4">Get In Touch</h2>

      <div className="grid md:grid-cols-[3fr_2fr] gap-6 items-stretch min-h-[460px]">
        <ContactForm />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15721.648166668034!2d76.3766954899321!3d9.899598681547879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0874229d115d25%3A0x4c938458a42976f7!2sMulanthuruthy%2C%20Kerala%20682314!5e0!3m2!1sen!2sin!4v1759334169910!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            className="h-full w-full"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          />
          
          <div className="p-3 bg-white">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-3 h-3 bg-green-500 animate-pulse rounded-full" />
              <div>
                <h4 className="font-medium text-slate-800 text-sm">Mulanthuruthy, Kerala</h4>
                <p className="text-xs text-gray-600">Open to work</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1.5">
              Based in Kerala, India • Available for remote work worldwide
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}