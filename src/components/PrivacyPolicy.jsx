import React from 'react';

const PrivacyPolicy = () => (
  <div className='min-h-screen bg-gray-50 py-20'>
    <div className='container-custom max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8'>
      <h1 className='text-3xl font-bold mb-6 text-gray-900'>Privacy Policy</h1>
      <p className='mb-4 text-gray-700'>
        Your privacy is important to me. This Privacy Policy explains how your personal information
        is collected, used, and protected when you use this website.
      </p>
      <h2 className='text-xl font-semibold mt-6 mb-2 text-gray-800'>Information Collected</h2>
      <ul className='list-disc pl-6 mb-4 text-gray-700'>
        <li>Contact form submissions (name, email, message)</li>
        <li>Basic analytics data (page views, device/browser info)</li>
      </ul>
      <h2 className='text-xl font-semibold mt-6 mb-2 text-gray-800'>How Information is Used</h2>
      <ul className='list-disc pl-6 mb-4 text-gray-700'>
        <li>To respond to your inquiries via the contact form</li>
        <li>To improve the website and user experience</li>
        <li>To monitor and analyze website traffic</li>
      </ul>
      <h2 className='text-xl font-semibold mt-6 mb-2 text-gray-800'>Data Protection</h2>
      <ul className='list-disc pl-6 mb-4 text-gray-700'>
        <li>Your data is not sold or shared with third parties</li>
        <li>Reasonable security measures are in place to protect your information</li>
      </ul>
      <h2 className='text-xl font-semibold mt-6 mb-2 text-gray-800'>Third-Party Services</h2>
      <ul className='list-disc pl-6 mb-4 text-gray-700'>
        <li>Email delivery is handled by Resend API</li>
        <li>Analytics may be provided by Google Analytics</li>
      </ul>
      <h2 className='text-xl font-semibold mt-6 mb-2 text-gray-800'>Contact</h2>
      <p className='mb-4 text-gray-700'>
        If you have any questions about this Privacy Policy, please contact me at{' '}
        <a href='mailto:contact@aswinlocal.in' className='text-secondary-600 underline'>
          contact@aswinlocal.in
        </a>
        .
      </p>
      <p className='text-gray-500 text-sm mt-8'>Last updated: July 6, 2025</p>
    </div>
  </div>
);

export default PrivacyPolicy;
