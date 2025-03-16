import React from 'react'
import footer from "../assets/footer.svg"
import foot from "../assets/foot.svg"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-[#0E282D] text-[#BAC9D5] py-6 px-4 mt-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-[#F8F9FA]">MedFolio</h2>
          <p className="text-sm text-[#BAC9D5]">Navigating your health, one step at a time.</p>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
          <li className="hover:text-[#437e8c] transition duration-200 cursor-pointer">
            <a href="#home">Home</a>
          </li>
          <li className="hover:text-[#437e8c] transition duration-200 cursor-pointer">
            <a href="#about">About</a>
          </li>
          <li className="hover:text-[#437e8c] transition duration-200 cursor-pointer">
            <a href="#contact">Contact</a>
          </li>
        </ul>

        {/* Social Media Icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-[#BAC9D5] hover:text-[#F8F9FA] transition duration-200">
            <FaFacebookF size={18} />
          </a>
          <a href="#" className="text-[#BAC9D5] hover:text-[#F8F9FA] transition duration-200">
            <FaTwitter size={18} />
          </a>
          <a href="#" className="text-[#BAC9D5] hover:text-[#F8F9FA] transition duration-200">
            <FaInstagram size={18} />
          </a>
          <a href="#" className="text-[#BAC9D5] hover:text-[#F8F9FA] transition duration-200">
            <FaLinkedin size={18} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-[#BAC9D5] mt-4">
        © {new Date().getFullYear()} MedFolio. All rights reserved.
      </div>
    </footer>
  )
}
