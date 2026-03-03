import React from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";


const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-40 text-sm text-gray-500"
    >
      {/* Top Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b"
      >
        {/* Logo Section */}
        <div>
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-8 md:h-9"
            src={assets.logo}
            alt="logo"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-80 mt-4"
          >
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </motion.p>

          <motion.div
          initial={{ opacity: 0  }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center gap-3 mt-6">
            <a href="#">
              <img
                src={assets.facebook_logo}
                alt="facebook"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img
                src={assets.instagram_logo}
                alt="instagram"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img
                src={assets.twitter_logo}
                alt="twitter"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img src={assets.gmail_logo} alt="gmail" className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

      

        {/* Quick Links */}
        <motion.div
        initial={{ opacity: 0, y:20  }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-base font-medium text-gray-800">Quick Links</h2>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <a href="#" className="hover:underline transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline transition">
                Browse Cars
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline transition">
                List Your Car
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline transition">
                About Us
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Resources */}
        <motion.div
        initial={{ opacity: 0, y:20  }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-base font-medium text-gray-800">Resources</h2>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <a href="#" className="hover:underline transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline transition">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline transition">
                Insurance
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
        initial={{ opacity: 0, y:20  }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-base font-medium text-gray-800">Contact</h2>
          <ul className="mt-4 flex flex-col gap-2">
            <li>1234 Luxury Drive</li>
            <li>San Francisco, CA 94107</li>
            <li>+1 234 567890</li>
            <li>info@example.com</li>
          </ul>
        </motion.div>
        

      </motion.div>

      {/* Bottom Section */}
      <motion.div
      initial={{ opacity: 0, y:10  }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6}}
      className="flex flex-col md:flex-row items-center justify-between gap-3 py-6 text-sm">
        <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <a href="#" className="hover:underline transition">
            Privacy
          </a>
          <span>|</span>
          <a href="#" className="hover:underline transition">
            Terms
          </a>
          <span>|</span>
          <a href="#" className="hover:underline transition">
            Cookies
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;