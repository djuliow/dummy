import React, { useState, useEffect } from "react";
import axios from "axios";

const Template = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/templates')
      .then(response => {
        setTemplates(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the templates!', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-x-hidden relative transition-colors duration-300">
      {/* Subtle noise texture */}
      <div
        className="fixed inset-0 opacity-5 dark:hidden pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      ></div>
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="relative inline-block mb-8">
              <div className="w-28 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"></div>
              <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white dark:bg-gray-800 rounded-full border-4 border-indigo-500 dark:border-indigo-400 shadow-md"></div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                Pilih Template Undangan Anda
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Temukan template yang sesuai dengan tema pernikahan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105">
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{template.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{template.description}</p>
                  <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                    {template.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;