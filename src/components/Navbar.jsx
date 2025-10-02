import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ aboutRef, projectsRef, certificationsRef, contactsRef }) {
  const [open, setOpen] = useState(false);
  const navItems = [
    { name: 'About', ref: aboutRef },
    { name: 'Projects', ref: projectsRef },
    { name: 'Qualifications', ref: certificationsRef },
    { name: 'Connect', ref: contactsRef },
  ];

  const handleNavClick = (item) => {
      item.ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav 
      className="
        fixed top-0 z-50 w-full 
        bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 
        shadow-sm
      "
    >
      <div className="mx-0 md:mx-20 px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-8 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          />

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) =>
              item.name === "Resume" ? (
                <Link
                  key={item.name}
                  to="/resume"
                  className="text-slate-800 hover:text-slate-950 hover:underline font-medium"
                >
                  {item.name}
                </Link>
              ) : (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="text-slate-800 hover:text-slate-950 hover:underline font-medium cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </div>
          
          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-slate-800 text-2xl"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${open ? "block" : "hidden"} md:hidden mt-4`}>
          <div className="flex flex-col">
            {navItems.map((item) => {
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavClick(item);
                    setOpen(false);
                  }} 
                  className="
                    px-4 py-3 
                  text-slate-800 font-medium text-left
                    border-b border-slate-200 last:border-b-0 active:bg-slate-100 
                    "
                  >
                    {item.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
