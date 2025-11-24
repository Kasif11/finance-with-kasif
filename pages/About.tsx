import React from 'react';

const AboutPage = () => (
 <div className="bg-white">
   <div className="bg-secondary text-white py-20 px-4 text-center">
      <h1 className="text-5xl font-serif font-bold mb-4">Our Mission</h1>
      <p className="text-xl text-emerald-200 max-w-2xl mx-auto">Simplifying the complex world of Indian finance, one rupee at a time.</p>
   </div>
   <div className="max-w-3xl mx-auto px-4 py-16 prose prose-lg prose-emerald">
     <p className="lead text-xl text-gray-600">Finance with Kasif (FK) was born out of a simple necessity: The need for <strong>unbiased, India-specific financial advice</strong>.</p>
     <p>While the internet is flooded with "get rich quick" schemes and US-centric advice (like 401ks which don't exist here), Indian investors often struggle to find clear guidance on local instruments.</p>
     
     <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
           <div className="text-4xl mb-2">📈</div>
           <h3 className="font-bold text-gray-900">Investing</h3>
           <p className="text-sm text-gray-500 mt-2">Stocks, Mutual Funds, and Gold demystified.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
           <div className="text-4xl mb-2">🛡️</div>
           <h3 className="font-bold text-gray-900">Protection</h3>
           <p className="text-sm text-gray-500 mt-2">Insurance and emergency fund planning.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
           <div className="text-4xl mb-2">💳</div>
           <h3 className="font-bold text-gray-900">Credit</h3>
           <p className="text-sm text-gray-500 mt-2">Smart usage of credit cards and loans.</p>
        </div>
     </div>

     <h2>Why We Exist</h2>
     <p>Our mission is to simplify money for the modern Indian. We believe that financial literacy is a fundamental right, not a privilege for the wealthy.</p>
   </div>
 </div>
);

export default AboutPage;