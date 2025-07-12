/**
 * @file ContactSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Ultra-modern contact section with bento grid layout and advanced glassmorphism
 */

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  User, 
  MessageCircle, 
  CheckCircle,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Globe,
  Calendar,
  Clock,
  Zap
} from 'lucide-react';

// Modern Contact Section Component with Bento Grid
const ContactSection = React.memo(() => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: 'contact@aswinlocal.in',
      description: 'Drop me a line anytime',
      color: 'from-red-400 to-pink-500',
      href: 'mailto:contact@aswinlocal.in'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      value: '+91 99999 99999',
      description: 'Let\'s have a chat',
      color: 'from-green-400 to-emerald-500',
      href: 'tel:+919999999999'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      value: 'Pondicherry, India',
      description: 'Visit me here',
      color: 'from-blue-400 to-cyan-500',
      href: 'https://maps.google.com/?q=Pondicherry,India'
    }
  ];

  const socialLinks = [
    {
      icon: <Github size={20} />,
      name: 'GitHub',
      href: 'https://github.com/Aswin-coder',
      color: 'from-gray-600 to-gray-800'
    },
    {
      icon: <Linkedin size={20} />,
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/aswin4122001/',
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: <Twitter size={20} />,
      name: 'Twitter',
      href: 'https://twitter.com/aswin',
      color: 'from-sky-400 to-blue-500'
    },
    {
      icon: <Instagram size={20} />,
      name: 'Instagram',
      href: 'https://instagram.com/aswin',
      color: 'from-pink-500 to-purple-500'
    }
  ];

  return (
    <section
      id='contact'
      className='section-padding relative overflow-hidden'
    >
      {/* Darker gradient background for better text contrast */}
      <div className='absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black'></div>
      <div className='absolute inset-0 bg-black/20'></div>
      {/* Dynamic Background Elements */}
      <div className='absolute inset-0'>
        <motion.div
          className='absolute top-20 right-20 w-96 h-96 opacity-20'
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className='w-full h-full rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-600/20 blur-3xl' />
        </motion.div>

        <motion.div
          className='absolute bottom-10 left-10 w-80 h-80 opacity-15'
          animate={{
            x: [0, 70, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className='w-full h-full rounded-full bg-gradient-to-r from-purple-400/20 to-pink-500/20 blur-3xl' />
        </motion.div>

        {/* Animated Grid */}
        <div className='absolute inset-0 opacity-5'>
          <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]' />
        </div>
      </div>

      <div className='container-custom relative z-10'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 mb-6 border border-white/20 shadow-lg'
          >
            <MessageCircle size={16} className='text-cyan-400' />
            <span className='text-sm font-bold text-white/90 uppercase tracking-wide'>
              Get In Touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='text-4xl lg:text-6xl font-black mb-6 text-white'
          >
            <span className='bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent'>
              Let's Create
            </span>
            <br />
            <span className='text-white/90'>Something Amazing</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='text-xl text-white/70 max-w-3xl mx-auto leading-relaxed'
          >
            Ready to bring your ideas to life? I'm here to help you build something incredible.
          </motion.p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 max-w-7xl mx-auto'>
          
          {/* Contact Form - Main Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='lg:col-span-8 relative'
          >
            <div className='h-full bg-white/5 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/10 shadow-2xl'>
              <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none' />
              
              <div className='relative z-10'>
                <div className='flex items-center space-x-3 mb-8'>
                  <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center'>
                    <Send size={24} className='text-cyan-400' />
                  </div>
                  <h3 className='text-2xl font-bold text-white'>Send Me a Message</h3>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-semibold text-white/80 mb-2'>
                        Full Name
                      </label>
                      <div className='relative'>
                        <input
                          type='text'
                          name='name'
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className='w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300'
                          placeholder='Your name'
                        />
                        <User size={20} className='absolute right-3 top-3 text-white/40' />
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-semibold text-white/80 mb-2'>
                        Email Address
                      </label>
                      <div className='relative'>
                        <input
                          type='email'
                          name='email'
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className='w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300'
                          placeholder='your@email.com'
                        />
                        <Mail size={20} className='absolute right-3 top-3 text-white/40' />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-white/80 mb-2'>
                      Your Message
                    </label>
                    <textarea
                      name='message'
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className='w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none'
                      placeholder='Tell me about your project...'
                    />
                  </div>

                  <motion.button
                    type='submit'
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 relative overflow-hidden ${
                      isSubmitting 
                        ? 'bg-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/25'
                    }`}
                  >
                    <span className='flex items-center justify-center space-x-2'>
                      {isSubmitting ? (
                        <>
                          <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                          <span>Sending...</span>
                        </>
                      ) : submitStatus === 'success' ? (
                        <>
                          <CheckCircle size={20} />
                          <span>Message Sent!</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          <span>Send Message</span>
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='lg:col-span-4 space-y-6'
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.href}
                target='_blank'
                rel='noopener noreferrer'
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className='block bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 group'
              >
                <div className='flex items-center space-x-4'>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-white shadow-lg`}>
                    {method.icon}
                  </div>
                  <div className='flex-1'>
                    <h4 className='text-lg font-bold text-white mb-1'>{method.title}</h4>
                    <p className='text-white/70 text-sm mb-1'>{method.value}</p>
                    <p className='text-white/50 text-xs'>{method.description}</p>
                  </div>
                  <ExternalLink size={16} className='text-white/40 group-hover:text-white/60 transition-colors' />
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className='lg:col-span-8 bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10'
          >
            <div className='flex items-center space-x-3 mb-6'>
              <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center'>
                <Globe size={20} className='text-purple-400' />
              </div>
              <h3 className='text-xl font-bold text-white'>Connect With Me</h3>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className={`bg-gradient-to-br ${social.color} rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-center`}
                >
                  <div className='flex items-center justify-center mb-2'>
                    {social.icon}
                  </div>
                  <span className='text-sm font-semibold'>{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Availability Status */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className='lg:col-span-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10'
          >
            <div className='text-center'>
              <div className='w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 flex items-center justify-center'>
                <Zap size={24} className='text-green-400' />
              </div>
              <h3 className='text-xl font-bold text-white mb-2'>Available for Work</h3>
              <div className='flex items-center justify-center space-x-2 mb-2'>
                <div className='w-2 h-2 rounded-full bg-green-400 animate-pulse' />
                <span className='text-green-400 font-semibold'>Online</span>
              </div>
              <p className='text-white/70 text-sm'>
                Ready to take on new projects and challenges
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default ContactSection;
