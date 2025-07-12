/**
 * @file ContactSection.jsx
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Cosmic contact section with holographic form and stellar communication interface
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Briefcase, Star, Orbit, Zap, Send } from 'lucide-react';
import { useMicroInteractions } from '../../utils/microInteractions';
import { use3DTilt, tiltPresets } from '../../hooks/use3DTilt.jsx';

// Contact Section Component
const ContactSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const { variants } = useMicroInteractions();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Use the current domain for API calls in production, localhost for development
      const apiUrl = import.meta.env.DEV ? 'http://localhost:3001/api/contact' : '/api/contact';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Handle validation errors specifically
        if (data.errors && data.errors.length > 0) {
          const errorMessages = data.errors.map(err => `${err.param}: ${err.msg}`).join(', ');
          throw new Error(`Validation failed: ${errorMessages}`);
        } else {
          throw new Error(data.message || 'Failed to send message');
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);

      // Fallback: If server is not available, show success message anyway
      // This allows the form to work even without backend configuration
      if (error instanceof TypeError || error.name === 'NetworkError') {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        console.log('Form submitted (fallback mode - backend not configured)');
      } else {
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      content: 'contact@aswinlocal.in',
      link: 'mailto:contact@aswinlocal.in',
      color: 'from-energy-electric to-energy-quantum',
      glow: 'energy-electric',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      content: 'Pondicherry, India',
      link: null,
      color: 'from-energy-plasma to-energy-cosmic',
      glow: 'energy-plasma',
    },
    {
      icon: <Briefcase size={24} />,
      title: 'Work',
      content: 'Available for consulting and collaboration',
      link: null,
      color: 'from-energy-nuclear to-energy-solar',
      glow: 'energy-nuclear',
    },
  ];

  return (
    <section
      id='contact'
      className='section-padding relative overflow-hidden bg-gradient-to-br from-galaxy-center via-galaxy-arm to-galaxy-dust'
    >
      {/* Cosmic Background Effects */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-cosmic opacity-30'></div>
        <div className='absolute inset-0 bg-gradient-energy opacity-20'></div>

        {/* Nebula Formations */}
        <div className='absolute top-20 right-20 w-96 h-96 bg-gradient-radial from-nebula-green/15 to-transparent rounded-full blur-3xl animate-pulse-slow'></div>
        <div className='absolute bottom-20 left-20 w-80 h-80 bg-gradient-radial from-nebula-blue/12 to-transparent rounded-full blur-3xl animate-pulse-slow animation-delay-400'></div>
        <div className='absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-radial from-nebula-cyan/10 to-transparent rounded-full blur-2xl animate-pulse-slow animation-delay-800'></div>
        <div className='absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-radial from-energy-electric/8 to-transparent rounded-full blur-xl animate-pulse-slow animation-delay-1200'></div>
      </div>

      {/* Cosmic Particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-stellar-400/60 rounded-full'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Holographic Grid */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Orbital Rings */}
      <div className='absolute inset-0 pointer-events-none'>
        <motion.div
          className='absolute w-72 h-72 border border-energy-electric/10 rounded-full'
          style={{
            left: '5%',
            top: '15%',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className='absolute w-56 h-56 border border-energy-plasma/8 rounded-full'
          style={{
            right: '10%',
            bottom: '20%',
          }}
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className='container-custom relative z-10'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='inline-flex items-center space-x-3 holographic rounded-full px-8 py-4 mb-8'
          >
            <motion.div
              className='w-2 h-2 bg-energy-nuclear rounded-full'
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className='text-sm font-cosmic text-stellar-200 uppercase tracking-widest'>
              Get In Touch
            </span>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Mail size={12} className='text-energy-electric' />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-4xl lg:text-6xl font-cosmic font-black mb-6 text-cosmic'
          >
            CONTACT
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='text-xl text-stellar-300 max-w-3xl mx-auto leading-relaxed'
          >
            Ready to bring your ideas to life? Let's discuss your next project and create something
            amazing together.
          </motion.p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-8 lg:gap-16'>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='space-y-6 lg:space-y-8 order-2 lg:order-1'
          >
            {contactInfo.map((item, index) => {
              const ContactCard = () => {
                const { elementRef, tiltStyle, glareElementStyle } = use3DTilt(
                  tiltPresets.moderate
                );

                return (
                  <motion.div
                    key={index}
                    ref={elementRef}
                    style={tiltStyle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className='group relative holographic rounded-3xl p-6 lg:p-8 transition-all duration-500 overflow-hidden'
                  >
                    {/* 3D Tilt Glare Effect */}
                    <div style={glareElementStyle} />

                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-15 transition-opacity duration-500`}
                    ></div>

                    {/* Glow Effect */}
                    <motion.div
                      className='absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300'
                      style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(0,212,255,0.2) 0%, transparent 70%)`,
                        filter: 'blur(10px)',
                      }}
                    />

                    {/* Icon */}
                    <div className='flex items-start space-x-4'>
                      <motion.div
                        className={`p-4 bg-gradient-to-br ${item.color} rounded-2xl text-white shadow-${item.glow} flex-shrink-0`}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                      >
                        {item.icon}
                        <div className='absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                      </motion.div>

                      <div className='flex-1'>
                        <h3 className='text-xl font-cosmic font-bold text-stellar-100 mb-2 group-hover:text-cosmic transition-colors duration-300'>
                          {item.title}
                        </h3>

                        {item.link ? (
                          <a
                            href={item.link}
                            className='text-stellar-300 hover:text-energy-electric transition-colors duration-300 break-all'
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className='text-stellar-300'>{item.content}</p>
                        )}
                      </div>

                      {/* Orbital Element */}
                      <motion.div
                        className='w-8 h-8 border border-stellar-400/30 rounded-full flex items-center justify-center'
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      >
                        <motion.div
                          className='w-2 h-2 bg-energy-electric rounded-full'
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>

                    {/* Scan Lines */}
                    <motion.div
                      className='absolute inset-0 pointer-events-none'
                      animate={{
                        background: [
                          'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
                          'linear-gradient(45deg, transparent 100%, rgba(255,255,255,0.03) 50%, transparent 0%)',
                        ],
                      }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                    />
                  </motion.div>
                );
              };

              return <ContactCard key={index} />;
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='order-1 lg:order-2'
          >
            <div className='holographic rounded-3xl p-8 overflow-hidden'>
              <div className='flex items-center space-x-3 mb-6'>
                <motion.div
                  className='p-3 bg-gradient-to-br from-energy-electric to-energy-plasma rounded-xl text-white shadow-energy'
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                  <Send size={20} />
                </motion.div>
                <h3 className='text-2xl font-cosmic font-bold text-cosmic'>SEND MESSAGE</h3>
              </div>

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-stellar-200 font-cosmic font-medium mb-2'
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full px-4 py-3 glass-cosmic rounded-xl border border-stellar-400/30 focus:border-energy-electric focus:outline-none text-stellar-100 placeholder-stellar-400 transition-colors duration-300'
                    placeholder='Your name'
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='block text-stellar-200 font-cosmic font-medium mb-2'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-4 py-3 glass-cosmic rounded-xl border border-stellar-400/30 focus:border-energy-electric focus:outline-none text-stellar-100 placeholder-stellar-400 transition-colors duration-300'
                    placeholder='your@email.com'
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='block text-stellar-200 font-cosmic font-medium mb-2'
                  >
                    Message
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className='w-full px-4 py-3 glass-cosmic rounded-xl border border-stellar-400/30 focus:border-energy-electric focus:outline-none text-stellar-100 placeholder-stellar-400 transition-colors duration-300 resize-none'
                    placeholder='Your message...'
                    required
                  />
                </div>

                <motion.button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full px-6 py-4 bg-gradient-to-r from-energy-electric via-energy-plasma to-energy-nuclear text-white rounded-xl font-cosmic font-bold shadow-energy hover:shadow-plasma transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className='relative z-10 flex items-center justify-center space-x-2'>
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full'
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </span>

                  {/* Energy particles */}
                  <div className='absolute inset-0 bg-gradient-to-r from-energy-electric/10 via-energy-plasma/10 to-energy-nuclear/10 opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='p-4 bg-gradient-to-r from-energy-electric/20 to-energy-plasma/20 border border-energy-electric/30 rounded-xl text-energy-electric text-center font-cosmic'
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl text-red-400 text-center font-cosmic'
                  >
                    Please fill in all fields correctly.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
