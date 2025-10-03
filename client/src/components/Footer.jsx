import React from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Browse Cars", "List Your Car", "About Us"],
    },
    {
      title: "Resources",
      links: ["Help Center", "Terms of Service", "Privacy Policy", "Insurance"],
    },
    {
      title: "Contact",
      links: [
        "Snehareddy",
        "Phone:+555-567-908",
        "Email-sneha@gmail.com",
        "Bangalore,India",
      ],
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col md:flex-row items-start justify-between gap-10 py-10  border-borderColor text-gray-500 pb-6"
      >
        <div>
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.2 }}
            className="h-8 md:h-9"
            src={assets.logo}
            alt="dummyLogoColored"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-80 mt-3"
          >
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex gap-3 mt-6 items-center"
          >
            <a href="#">
              <img
                src={assets.instagram_logo}
                alt="instagram"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img
                src={assets.facebook_logo}
                alt="facebook"
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-between w-full md:w-[45%] gap-5"
        >
          {linkSections.map((section, index) => (
            <div key={index}>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-medium text-base text-primary md:mb-5 mb-2 uppercase"
              >
                {section.title}
              </motion.h2>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    key={i}
                  >
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </motion.div>
      <hr />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="py-4 text-center text-sm md:text-base text-gray-500/80 flex  flex-col  gap-3 md:flex-row justify-between"
      >
        <p>
          Copyright 2025 ©{" "}
          <span className="text-primary font-semibold">Car Rental</span>{" "}
        </p>
        <p className="font-medium text-sm ">Privacy | Terms | Conditions</p>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
