import { motion } from "framer-motion"
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

const ConnectWithMe = () => {
  return (
    <div className="mt-2 pt-1.5 border-t border-slate-200">
        <p className="text-xs text-gray-500 mb-1">Connect with me:</p>
        <div className="flex justify-start gap-1.5">
          {contactLinks.map((link) => {
            const [hover, setHover] = useState(false);
            return (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
              >
              {link.isImage ? (
                <img
                  src={link.icon}
                  alt={link.name}
                  className="w-5 h-5 transition-all duration-300"
                  style={{ filter: hover ? 'grayscale(0%)' : 'grayscale(100%)' }}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={hover ? `#${link.icon.hex}` : "#666"}
                  className="w-5 h-5 transition-all duration-300"
                >
                  <path d={link.icon.path} />
                </svg>
              )}
            </motion.div>
          )})}
        </div>
      </div>
  )
}


const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [submitStatus, setSubmitStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email !== confirmEmail) {
      setSubmitStatus("Emails do not match.");
      setTimeout(() => setSubmitStatus(""), 5000);
      return;
    }

    let submissionCount = parseInt(localStorage.getItem("submissionCount") || "0");
    if(submissionCount >= 3) {
      let submissionResetTime = localStorage.getItem("submissionResetTime");
      let timeremaining = submissionResetTime ? new Date(submissionResetTime) - new Date() : 0;
      if(timeremaining > 0) {
        setSubmitStatus(`You have reached the maximum submission limit. Please try again after ${Math.ceil(timeremaining / 60000)} minutes.`);
        setTimeout(() => setSubmitStatus(""), 5000);
        return;
      }
    }


    setIsSubmitting(true);

    const formUrl = import.meta.env.VITE_FORM_LINK;


    const formData = new FormData();
    formData.append("entry.684226470", name);
    formData.append("entry.59949232", email);
    formData.append("entry.545915675", subject);
    formData.append("entry.667123544", message);

    let response = await fetch(formUrl, {
      method: "POST",
      body: formData,
      mode: "no-cors"
    });

    if(response) {
      setSubmitStatus("success");
      setName("");
      setEmail("");
      setConfirmEmail("");
      setSubject("");
      setMessage("");
      submissionCount += 1;
      localStorage.setItem("submissionCount", submissionCount.toString());
      if(submissionCount === 3) {
        let resetTime = new Date(new Date().getTime() + 30 * 60000);
        localStorage.setItem("submissionResetTime", resetTime.toString());
      }
      setTimeout(() => setSubmitStatus(""), 5000);
      setIsSubmitting(false);
    }
    else{
      setSubmitStatus("There was an error submitting the form. Please try again later.");
      setTimeout(() => setSubmitStatus(""), 5000);
      setIsSubmitting(false);
    }
  }

  const inputClass = "w-full px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-transparent text-sm";
  const labelClass = "block text-xs font-medium text-slate-700 mb-0.5";
  return(
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-lg p-3 md:p-2.5 shadow-sm border border-slate-200 h-full flex flex-col"
    >
      <h3 className="text-base font-semibold text-slate-800 mb-1">Send me a message</h3>
      <p className="text-gray-600 text-xs mb-2">Have a question or want to work together? I'd love to hear from you!</p>

      <form onSubmit={handleSubmit} className="space-y-2 md:space-y-1.5 flex-1 flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

          <div>
            <label className={labelClass}>Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              required
              placeholder="Your name"
            />
          </div>

          <div>
            <label className={labelClass}>Subject *</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={inputClass}
              required
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label className={labelClass}>Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className={labelClass}>Confirm Email *</label>
            <input  
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              className={inputClass}
              required
              placeholder="Confirm your email"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="mt-0.5 flex items-center gap-2">
            <label className={labelClass}>Message *</label>
            <span
              className={`text-xs ${message.length === 500 ? "text-red-500" : "text-gray-400"}`}
            >
              ({message.length}/500)
            </span>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={inputClass + " flex-1  resize-none"}
            required
            placeholder="Tell me about your project or just say hi!"
            maxLength={500}
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
          <p className={`text-xs mt-1.5 ${submitStatus === "success" ? "text-green-600" : "text-red-600"}`}>
            {submitStatus === "success" ? "Thank you for your message! I'll get back to you soon." : submitStatus}
          </p>
        )}
      </form>
      <ConnectWithMe />
    </motion.div>
  )
}

export default function Contacts({contactsRef}) {
  return(
    <section 
      ref={contactsRef}
      className="mx-1 md:mx-10 mt-6 md:mt-20 px-4 md:px-6 pb-4 mb-2"
    >
      <h2
        className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-6"
      >
          Get In Touch
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4 md:gap-6 min-h-[350px] md:h-[60vh]">
        {/*Contact Form*/}
        <ContactForm />

        {/*Location Map*/}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: window.innerWidth > 768 ? 1.02 : 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full min-h-[250px] md:min-h-0"
        >
          <div className="flex-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15721.648166668034!2d76.3766954899321!3d9.899598681547879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0874229d115d25%3A0x4c938458a42976f7!2sMulanthuruthy%2C%20Kerala%20682314!5e0!3m2!1sen!2sin!4v1759334169910!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              className="w-full h-full"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </div>
          
          <div className="p-3 bg-white">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-3 h-3 bg-green-500 animate-pulse rounded-full" />
              <div className="flex flex-col">
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
  )
}