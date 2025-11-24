import React from 'react';

const TermsPage = () => (
  <div className="bg-white min-h-screen py-12 animate-fade-in">
    <div className="max-w-3xl mx-auto px-4">
       <div className="mb-8 pb-6 border-b border-gray-100">
        <h1 className="text-4xl font-serif font-bold text-secondary mb-2">Terms & Conditions</h1>
        <p className="text-gray-500">Please read these terms carefully before using Finance with Kasif.</p>
      </div>

      <div className="prose prose-lg prose-emerald max-w-none text-gray-700">
        <p className="lead text-xl font-medium text-gray-900">
          By accessing Finance with Kasif (FK), you agree to the following Terms & Conditions.
        </p>
        
        <h3>Use of the Website</h3>
        <ul>
            <li>FK provides financial education only.</li>
            <li>You must not misuse, copy, or duplicate our content without permission.</li>
            <li>All information is for general educational purposes and may not be accurate for all users.</li>
        </ul>

        <h3>No Financial Advice</h3>
        <ul className="bg-red-50 border border-red-100 rounded-lg p-6 list-none pl-0">
            <li className="flex items-start mb-2">
                <span className="text-red-500 mr-2 font-bold">✕</span>
                The content on FK is <strong>NOT</strong> financial, legal, or investment advice.
            </li>
            <li className="flex items-start mb-2">
                <span className="text-red-500 mr-2 font-bold">✕</span>
                We are not SEBI-registered advisors.
            </li>
            <li className="flex items-start">
                <span className="text-green-600 mr-2 font-bold">✓</span>
                Always do your own research or consult a professional.
            </li>
        </ul>

        <h3>User Responsibilities</h3>
        <p>By using this website, you agree to:</p>
        <ul>
            <li>Not misuse or harm the website</li>
            <li>Not post harmful or illegal comments</li>
            <li>Not engage in spam or fraudulent behavior</li>
        </ul>

        <h3>Affiliate Links</h3>
        <p>Finance with Kasif may contain affiliate links. If you make a purchase, we may earn a commission at no extra cost to you.</p>

        <h3>Limitation of Liability</h3>
        <p>Finance with Kasif is not responsible for:</p>
        <ul>
            <li>Financial losses</li>
            <li>Decisions made based on our content</li>
            <li>Errors, inaccuracies, or delays in information</li>
        </ul>
      </div>
    </div>
  </div>
);

export default TermsPage;