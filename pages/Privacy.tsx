import React from 'react';

const PrivacyPage = () => (
  <div className="bg-white min-h-screen py-12 animate-fade-in">
    <div className="max-w-3xl mx-auto px-4">
      <div className="mb-8 pb-6 border-b border-gray-100">
        <h1 className="text-4xl font-serif font-bold text-secondary mb-2">Privacy Policy & Disclaimer</h1>
        <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
      
      <div className="prose prose-lg prose-emerald max-w-none text-gray-700 font-serif">
        <p>
          The information provided on Finance with Kasif (FK) is for educational and informational purposes only. I am not a SEBI-registered financial advisor, and the content on this website should not be considered financial, investment, or legal advice.
        </p>
        
        <p>
          All articles, guides, and recommendations are based on personal research, publicly available information, and general financial knowledge. Investing involves risks, including the possible loss of capital. Always conduct your own research (DYOR) and/or consult a certified financial advisor before making any investment decisions.
        </p>
        
        <p>
          Finance with Kasif does not guarantee the accuracy, completeness, or reliability of any information presented. Some links may be affiliate links, through which the site may earn a small commission at no extra cost to you.
        </p>
        
        <div className="bg-gray-50 border-l-4 border-primary p-4 my-6 rounded-r-lg">
          <p className="mb-0 font-medium text-secondary">
            By using this website, you agree that Finance with Kasif and its author(s) are not responsible for any financial losses, decisions, or outcomes resulting from the use of the information provided.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default PrivacyPage;