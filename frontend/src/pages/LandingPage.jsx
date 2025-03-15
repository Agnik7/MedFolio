import React, { useEffect, useState } from 'react';
import HomeNav from '../Components/HomeNav';
import Home from '../Components/Home';
import AboutUs from '../Components/AboutUs';
import Contact from '../Components/Contact';
import { Slant as Hamburger } from "hamburger-react";
import Footer from '../Components/Footer';
import AuthModal from '../Components/AuthModal';

export default function LandingPage({
  user,
  setUser,
  checkName,
  setCheckName,
  setCount
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    

    // Function to add the script to the page
    const addScript = (src, id, async = false) => {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          // If the script is already added, resolve immediately
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.async = async;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.head.appendChild(script);
      });
    };

    // Add chatbot scripts
    addScript('https://cdn.botpress.cloud/webchat/v1/inject.js', 'botpress-webchat-inject')
      .then(() => addScript('https://mediafiles.botpress.cloud/8dab9aea-3fd1-404d-a7f4-eaa36cc7114f/webchat/config.js', 'botpress-webchat-config', true))
      .then(() => {
        if (window.botpressWebChat) {
          window.botpressWebChat.init({
            "composerPlaceholder": "Chat with Med AI (Say Hi to get started)",
            "botConversationDescription": "Welcome to Medfolio",
            "botId": "8dab9aea-3fd1-404d-a7f4-eaa36cc7114f",
            "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
            "messagingUrl": "https://messaging.botpress.cloud",
            "clientId": "8dab9aea-3fd1-404d-a7f4-eaa36cc7114f",
            "webhookId": "858409d3-3b14-48ee-89c6-a3a0882dd1d7",
            "lazySocket": true,
            "themeName": "galaxy",
            "botName": "Med AI",
            "stylesheet": "https://webchat-styler-css.botpress.app/prod/5c1c1ff1-25a6-4f35-b29a-1e448df8a4fa/v22951/style.css",
            "frontendVersion": "v1",
            "theme": "galaxy",
            "allowedOrigins": []
          });
        } else {
          console.error('Botpress WebChat is not available');
        }
      })
      .catch((error) => {
        console.error('Failed to load the Botpress WebChat script:', error);
      });

    // Cleanup function to remove the scripts when component unmounts
    return () => {
      const script1 = document.getElementById('botpress-webchat-inject');
      const script2 = document.getElementById('botpress-webchat-config');
      if (script1) script1.remove();
      if (script2) script2.remove();
    };
  }, []);

  return (
    <section className='min-h-[100vh] relative bg-[#BAC9D5] overflow-hidden'>
      <HomeNav open={open} setOpen={setOpen} user={user} setUser={setUser} />
      <div className={`hamburger_block z-10 min-h-screen 2xsm:hidden ${open ? "translate-x-[0rem]" : "translate-x-[50rem]"} backdrop-blur-md bg-[#BAC9D5] w-full fixed flex flex-col justify-center items-center transition-all ease-linear duration-300 top-0`}>
        <ul className="flex flex-col justify-center items-center gap-4 mb-[0.5rem] sm:text-[1.2rem] xsm:text-[1rem] text-[1.5rem] text-[#1C4C58]">
          <li className="xsm:mx-2 mx-1 text-center font-semibold hover:text-[#437e8c] transition-all ease-linear duration-150 hover:cursor-pointer">
            <a href="#home">Home</a>
          </li>
          <li className="xsm:mx-2 mx-1 text-center font-semibold hover:text-[#437e8c] transition-all ease-linear duration-150 hover:cursor-pointer">
            <a href="#about">About Us</a>
          </li>
          <li className="xsm:mx-2 mx-1 text-center font-semibold hover:text-[#437e8c] transition-all ease-linear duration-150 hover:cursor-pointer">
            <a href="#contact">Contact Us</a>
          </li>
          <AuthModal user={user} setUser={setUser} />
        </ul>
      </div>
      <Home user={user} setUser={setUser} />
      <AboutUs />
      <Contact />
      <Footer />
    </section>
  );
}
