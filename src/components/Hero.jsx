import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Hero() {
  const { session, userProfile } = useAuth();
  const [hero, setHero] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3000/hero')
      .then(response => {
        setHero(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the hero data!', error);
      });
  }, []);

  return (
    <section className="bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-6 relative overflow-x-hidden transition-colors duration-300">
      {/* Subtle noise texture */}
      <div
        className="fixed inset-0 opacity-5 dark:hidden pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      ></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Gunakan flex-col-reverse di mobile, dan flex-row di desktop */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          {/* Bagian Kiri - Teks (akan muncul di bawah di mobile) */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
              {hero.title && hero.title.split('Pernikahan').map((part, index, array) => 
                index === array.length - 1 ? part : (
                  <React.Fragment key={index}>
                    {part}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                      Pernikahan
                    </span>
                  </React.Fragment>
                )
              )}
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
              {hero.subtitle}
            </p>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
              {userProfile?.subscription_status === 'premium' ? (
                <Link
                  to="/premium-generator"
                  className="px-8 py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "linear-gradient(135deg, #764ba2 0%, #667eea 100%)";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  {hero.button1_premium}
                </Link>
              ) : (
                session ? (
                  <Link
                    to="/chat"
                    className="px-8 py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #764ba2 0%, #667eea 100%)";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    {hero.button1_user}
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="px-8 py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #764ba2 0%, #667eea 100%)";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    {hero.button1_guest}
                  </Link>
                )
              )}
              <a
                href="/template"
                className="border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-8 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                }}
              >
                {hero.button2}
              </a>
            </div>
          </div>

          {/* Bagian Kanan - Gambar (akan muncul di atas di mobile) */}
          <div className="flex-1 w-full">
            <div
              className="w-full h-80 md:h-96 lg:h-[450px] rounded-xl shadow-xl overflow-hidden relative group"
            >
              {/* Try loading image with img tag and fallback to background if needed */}
              <img
                src="/assets/bg_hero1.jpg"
                alt="Hero Background"
                className="w-full h-full object-cover"
                style={{ display: 'block', position: 'relative', zIndex: 1 }}
                onError={(e) => {
                  console.error('Primary image failed to load, trying alternative:', e.target.src);
                  e.target.style.display = 'none';
                  // Fallback to secondary image
                  e.target.src = '/assets/bg_hero1.jpg';
                }}
                onLoad={(e) => {
                  console.log('Primary image loaded successfully');
                  e.target.style.display = 'block';
                }}
              />
              {/* Overlay semi-transparent - now with lower z-index to be behind the image */}
              <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-opacity duration-300 z-0"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;