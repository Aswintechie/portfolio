import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react';

const PrivacyPolicy = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className='min-h-screen bg-gray-50 py-20'>
      <div className='container-custom'>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <div className='flex items-center justify-center mb-6'>
            <Shield size={48} className='text-secondary-600 mr-4' />
            <h1 className='text-4xl lg:text-5xl font-bold text-gray-900'>Privacy Policy</h1>
          </div>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            How we collect, use, and protect your information
          </p>
          <div className='mt-6'>
            <a
              href='/'
              className='inline-flex items-center text-secondary-600 hover:text-secondary-700 transition-colors duration-200'
            >
              <ArrowLeft size={20} className='mr-2' />
              Back to Portfolio
            </a>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 lg:p-12'
        >
          <div className='prose prose-lg max-w-none'>
            <div className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center'>
                <Eye size={24} className='mr-3 text-secondary-600' />
                Information We Collect
              </h2>
              <p className='text-gray-700 mb-4'>
                When you visit my portfolio website, we may collect the following information:
              </p>
              <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                <li>
                  <strong>Contact Form Data:</strong> Name, email address, and message content when
                  you use the contact form
                </li>
                <li>
                  <strong>Usage Data:</strong> Pages visited, time spent on site, and browser
                  information
                </li>
                <li>
                  <strong>Technical Data:</strong> IP address, browser type, operating system, and
                  device information
                </li>
              </ul>
            </div>

            <div className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center'>
                <Database size={24} className='mr-3 text-secondary-600' />
                How We Use Your Information
              </h2>
              <p className='text-gray-700 mb-4'>
                The information we collect is used for the following purposes:
              </p>
              <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To improve website functionality and user experience</li>
                <li>To analyze website traffic and usage patterns</li>
                <li>To ensure website security and prevent fraud</li>
              </ul>
            </div>

            <div className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center'>
                <Lock size={24} className='mr-3 text-secondary-600' />
                Data Protection
              </h2>
              <p className='text-gray-700 mb-4'>
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                <li>SSL encryption for all data transmission</li>
                <li>Secure hosting on Cloudflare Workers with enterprise-grade security</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal data on a need-to-know basis</li>
              </ul>
            </div>

            <div className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>Third-Party Services</h2>
              <p className='text-gray-700 mb-4'>
                This website uses the following third-party services:
              </p>
              <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                <li>
                  <strong>Resend:</strong> For sending email notifications and auto-replies
                </li>
                <li>
                  <strong>Cloudflare:</strong> For hosting, CDN, and security services
                </li>
                <li>
                  <strong>Google Fonts:</strong> For typography (fonts are loaded from Google's
                  servers)
                </li>
              </ul>
            </div>

            <div className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>Your Rights</h2>
              <p className='text-gray-700 mb-4'>
                You have the following rights regarding your personal data:
              </p>
              <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                <li>Right to access your personal data</li>
                <li>Right to correct inaccurate data</li>
                <li>Right to request deletion of your data</li>
                <li>Right to withdraw consent for data processing</li>
              </ul>
            </div>

            <div className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>Cookies</h2>
              <p className='text-gray-700 mb-4'>
                This website uses minimal cookies for essential functionality. We do not use
                tracking cookies or analytics cookies that could identify individual users.
              </p>
            </div>

            <div className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>Contact Information</h2>
              <p className='text-gray-700 mb-4'>
                If you have any questions about this Privacy Policy or how we handle your data,
                please contact me:
              </p>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <p className='text-gray-700'>
                  <strong>Email:</strong> contact@aswinlocal.in
                  <br />
                  <strong>Website:</strong> www.aswinlocal.in
                </p>
              </div>
            </div>

            <div className='border-t border-gray-200 pt-8'>
              <p className='text-sm text-gray-600'>
                <strong>Last updated:</strong> December 19, 2024
                <br />
                This Privacy Policy is effective as of the date listed above and will remain in
                effect except with respect to any changes in its provisions in the future.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
