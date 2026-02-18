import React from "react";
import {
  quickLinks,
  categories,
  contact,
  socials,
} from "../../constants/Index";
import { MdOutlineSchool } from "react-icons/md";
const Footer = () => {
  return (
    <footer  id="about" className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-2 text-white mb-6">
              <span className="material-symbols-outlined text-primary text-2xl">
                <MdOutlineSchool className="text-blue-600" />
              </span>
              <span className="text-xl font-bold tracking-tight">
                EduEvents
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Connecting students, faculty, and campus life through a seamless
              event management experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              {quickLinks.map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-6">Categories</h4>
            <ul className="space-y-4 text-sm">
              {categories.map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              {contact.map((item, index) => {
                const Icon = item.icon;

                return (
                  <li key={index} className="flex items-center gap-3">
                    <Icon className="text-primary text-sm text-blue-600" />
                    {item.text}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            © 2024 EduEvents College Portal. All rights reserved.
          </p>

          <div className="flex gap-6">
            {socials.map((icon, index) => {
              const Icon = icon;
              return (
                <a
                  key={index}
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  <Icon className="text-primary text-3xl text-gray-400" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
