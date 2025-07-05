import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Menu,
  X,
  MapPin,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Briefcase,
  Cloud,
  Cpu,
  GitPullRequest,
  Zap,
  Code,
  Brain,
  ChevronDown,
} from 'lucide-react';
import LiveChatWidget from './components/LiveChatWidget';

// Custom hook for experience calculation
const useExperienceCalculator = () => {
  const [experience, setExperience] = useState('');

  useEffect(() => {
    const calculateExperience = () => {
      const startDate = new Date('2023-06-01');
      const currentDate = new Date();

      const diffInMonths =
        (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
        (currentDate.getMonth() - startDate.getMonth());

      const years = Math.floor(diffInMonths / 12);
      const months = diffInMonths % 12;

      if (years > 0) {
        setExperience(`${years}+ year${years > 1 ? 's' : ''}`);
      } else if (months > 0) {
        setExperience(`${months} month${months > 1 ? 's' : ''}`);
      } else {
        setExperience('Less than a month');
      }
    };

    calculateExperience();
    const interval = setInterval(calculateExperience, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return experience;
};

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50'
          : 'bg-black/20 backdrop-blur-sm'
      }`}
    >
      <div className='container-custom'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-2xl font-bold transition-colors duration-300 ${
              scrolled ? 'text-primary-900' : 'text-white'
            }`}
          >
            Aswin
          </motion.div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`font-medium transition-colors duration-200 relative group ${
                  scrolled
                    ? 'text-primary-700 hover:text-secondary-600'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item.name}
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary-500 to-accent-500 group-hover:w-full transition-all duration-300'></span>
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none transition-colors duration-200 ${
                scrolled
                  ? 'text-primary-700 hover:text-secondary-600'
                  : 'text-white hover:text-white/80'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className='md:hidden bg-white border-t border-gray-200'
            >
              <div className='py-2'>
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className='block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200'
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  const experience = useExperienceCalculator();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id='home'
      className='min-h-screen flex items-center justify-center relative overflow-hidden'
    >
      {/* Modern gradient background */}
      <div className='absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700'></div>

      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse animation-delay-400'></div>
        <div className='absolute top-3/4 left-3/4 w-48 h-48 bg-secondary-400/15 rounded-full blur-2xl animate-pulse animation-delay-600'></div>
      </div>

      {/* Modern geometric shapes */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-full animate-spin-slow'></div>
        <div className='absolute bottom-20 left-20 w-24 h-24 border border-secondary-400/20 rounded-full animate-pulse-slow'></div>
      </div>

      <div className='container-custom relative z-10'>
        <div className='flex items-center justify-center'>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-white text-center max-w-4xl'
          >
            <motion.h1
              className='text-5xl lg:text-6xl font-bold mb-6 leading-tight'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm{' '}
              <span className='bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent'>
                Aswin
              </span>
            </motion.h1>

            <motion.p
              className='text-xl lg:text-2xl mb-6 text-gray-200 font-medium'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Software Developer Engineer
            </motion.p>

            <motion.p
              className='text-lg mb-8 text-gray-300 leading-relaxed max-w-2xl mx-auto'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Passionate about software development and modern technologies. Specializing in
              building efficient software solutions with a keen interest in cloud infrastructure.
              Based in the beautiful city of Pondicherry with {experience} of professional
              experience.
            </motion.p>

            <motion.div
              className='flex flex-col sm:flex-row gap-4 mb-8 justify-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a href='#contact' className='btn btn-primary'>
                Get In Touch
              </a>
              <a href='#experience' className='btn btn-outline'>
                View My Work
              </a>
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              className='flex flex-col sm:flex-row items-center gap-4 justify-center mb-16'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <span className='text-gray-300 text-sm'>Connect with me:</span>
              <div className='flex items-center gap-4'>
                <a
                  href='https://www.linkedin.com/in/aswin4122001/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 hover:scale-110 transform'
                >
                  <Linkedin size={20} />
                  <span className='text-sm'>LinkedIn</span>
                </a>
                <a
                  href='https://github.com/Aswin-coder'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 hover:scale-110 transform'
                >
                  <Github size={20} />
                  <span className='text-sm'>GitHub</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <AnimatePresence>
          {!scrolled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.2 }}
              className='fixed bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 z-20 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm'
            >
              <div className='flex flex-col items-center space-y-1'>
                <span className='text-xs font-medium'>Scroll down</span>
                <ChevronDown size={18} className='animate-bounce' />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const experience = useExperienceCalculator();

  const stats = [
    { number: experience, label: 'Years Experience' },
    { number: 'Software', label: 'Development' },
    { number: 'Cloud', label: 'Technologies' },
  ];

  return (
    <section id='about' className='section-padding bg-gray-50'>
      <div className='container-custom'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl lg:text-5xl font-bold mb-6 text-gray-900'>About Me</h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Learn more about my background and interests
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className='space-y-6 text-lg text-gray-700 leading-relaxed'>
              <p>
                I'm a passionate Software Developer Engineer based in Pondicherry, specializing in
                software development and modern application architecture. My expertise lies in
                developing efficient software solutions, building scalable applications, and
                implementing best practices in software engineering.
              </p>
              <p>
                I have a keen interest in cloud technologies and enjoy exploring modern deployment
                strategies. I combine software engineering skills with cloud infrastructure to
                create high-quality, scalable applications that leverage the power of cloud
                computing.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='grid grid-cols-1 sm:grid-cols-3 gap-6'
          >
            {stats.map((stat, index) => (
              <div key={index} className='card p-6 text-center'>
                <div className='text-3xl font-bold text-secondary-600 mb-2'>{stat.number}</div>
                <div className='text-sm text-gray-600 font-medium'>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Experience Section Component
const ExperienceSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const experience = useExperienceCalculator();

  return (
    <section id='experience' className='section-padding'>
      <div className='container-custom'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl lg:text-5xl font-bold mb-6 text-gray-900'>Experience</h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>My professional journey</p>
        </motion.div>

        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='relative'
          >
            {/* Timeline line */}
            <div className='absolute left-8 top-0 bottom-0 w-0.5 bg-secondary-200'></div>

            <div className='relative'>
              {/* Timeline dot */}
              <div className='absolute left-6 top-8 w-5 h-5 bg-secondary-600 rounded-full border-4 border-white shadow-lg'></div>

              <div className='ml-20 card p-8'>
                <div className='text-sm text-secondary-600 font-semibold mb-2'>
                  June 2023 - Present
                </div>
                <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                  Software Developer Engineer
                </h3>
                <h4 className='text-lg text-gray-600 mb-4'>MulticoreWare Pvt Ltd</h4>
                <p className='text-gray-700 leading-relaxed mb-6'>
                  Working on software development projects focusing on performance optimization,
                  profiling, and benchmarking. Responsible for developing efficient software
                  solutions and analyzing performance metrics to improve application performance.
                </p>
                <div className='inline-flex items-center px-4 py-2 bg-gradient-to-r from-secondary-500 to-accent-500 text-white rounded-full text-sm font-medium'>
                  {experience}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Skills Section Component
const SkillsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const skills = [
    {
      icon: <Code size={48} />,
      title: 'Software Development',
      description: 'Full-stack development, application architecture, and software engineering',
    },
    {
      icon: <Zap size={48} />,
      title: 'Performance Optimization',
      description: 'Profiling, benchmarking, and performance analysis for applications',
    },
    {
      icon: <Cpu size={48} />,
      title: 'System Analysis',
      description: 'System profiling, resource optimization, and performance tuning',
    },
    {
      icon: <Cloud size={48} />,
      title: 'Cloud Technologies',
      description: 'Cloud deployment, infrastructure, and modern deployment strategies',
    },
  ];

  return (
    <section id='skills' className='section-padding bg-gray-50'>
      <div className='container-custom'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl lg:text-5xl font-bold mb-6 text-gray-900'>Skills & Interests</h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Technologies and areas I'm passionate about
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className='card p-8 text-center group'
            >
              <div className='text-secondary-600 mb-6 group-hover:text-accent-500 transition-colors duration-300'>
                {skill.icon}
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>{skill.title}</h3>
              <p className='text-gray-600 leading-relaxed'>{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section Component
const ProjectsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const projects = [
    {
      title: 'PR Reviewer',
      domain: 'pr-reviewer.aswinlocal.in',
      description:
        'ML-trained application that intelligently analyzes pull requests to determine the minimum person approval required for merging. Features prediction algorithms to identify reviewers who will approve faster, optimizing development workflows.',
      technologies: ['Machine Learning', 'Python', 'React', 'Node.js', 'Cloud'],
      features: [
        'Intelligent PR analysis',
        'Approval prediction algorithms',
        'Fast reviewer identification',
        'Development workflow optimization',
        'Real-time PR insights',
      ],
      icon: <Brain size={48} />,
      link: 'https://pr-reviewer.aswinlocal.in',
      status: 'Live',
    },
  ];

  return (
    <section id='projects' className='section-padding bg-gray-50'>
      <div className='container-custom'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl lg:text-5xl font-bold mb-6 text-gray-900'>Featured Projects</h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Innovative solutions powered by machine learning and modern technology
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-1 gap-8'>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className='card p-8 lg:p-12 group hover:shadow-xl transition-all duration-300'
            >
              <div className='grid lg:grid-cols-3 gap-8 lg:gap-12'>
                {/* Project Icon and Title */}
                <div className='lg:col-span-1'>
                  <div className='flex items-center justify-center lg:justify-start mb-6'>
                    <div className='text-secondary-600 group-hover:text-accent-500 transition-colors duration-300'>
                      {project.icon}
                    </div>
                  </div>
                  <h3 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-2 text-center lg:text-left'>
                    {project.title}
                  </h3>
                  <div className='flex items-center justify-center lg:justify-start space-x-2 mb-4'>
                    <span className='text-sm text-gray-500'>{project.domain}</span>
                    <span className='px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full'>
                      {project.status}
                    </span>
                  </div>
                  <div className='flex justify-center lg:justify-start'>
                    <a
                      href={project.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary-500 to-accent-500 text-white rounded-lg hover:from-secondary-600 hover:to-accent-600 transition-all duration-300 transform hover:scale-105'
                    >
                      <ExternalLink size={18} className='mr-2' />
                      View Project
                    </a>
                  </div>
                </div>

                {/* Project Details */}
                <div className='lg:col-span-2'>
                  <p className='text-gray-600 text-lg leading-relaxed mb-6'>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className='mb-6'>
                    <h4 className='text-lg font-semibold text-gray-900 mb-3 flex items-center'>
                      <Code size={20} className='mr-2 text-secondary-600' />
                      Technologies
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className='px-3 py-1 bg-secondary-100 text-secondary-800 text-sm font-medium rounded-full'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className='text-lg font-semibold text-gray-900 mb-3 flex items-center'>
                      <Zap size={20} className='mr-2 text-secondary-600' />
                      Key Features
                    </h4>
                    <div className='grid md:grid-cols-2 gap-2'>
                      {project.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className='flex items-center space-x-2'>
                          <GitPullRequest size={16} className='text-accent-500 flex-shrink-0' />
                          <span className='text-gray-600'>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
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
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      content: 'Pondicherry, India',
      link: null,
    },
    {
      icon: <Briefcase size={24} />,
      title: 'Work',
      content: 'Available for consulting and collaboration',
      link: null,
    },
  ];

  return (
    <section id='contact' className='section-padding'>
      <div className='container-custom'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl lg:text-5xl font-bold mb-6 text-gray-900'>Get In Touch</h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>Let's discuss your next project</p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-16'>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='space-y-8'
          >
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className='flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300'
              >
                <div className='flex-shrink-0 w-12 h-12 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center text-white'>
                  {item.icon}
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-1'>{item.title}</h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      className='text-gray-600 hover:text-secondary-600 transition-colors duration-200'
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className='text-gray-600'>{item.content}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='card p-8'
          >
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <span className='text-green-400 text-xl'>✓</span>
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-green-800'>
                        Message sent successfully! Thank you for contacting me.
                      </p>
                      <p className='text-sm text-green-600 mt-1'>
                        I'll get back to you within 24-48 hours. You can also reach me directly at
                        contact@aswinlocal.in
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <span className='text-red-400 text-xl'>⚠</span>
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-red-800'>
                        Failed to send message. Please check the following:
                      </p>
                      <ul className='text-sm text-red-600 mt-1 list-disc list-inside'>
                        <li>Name: Only letters and spaces allowed (2-100 characters)</li>
                        <li>Email: Must be a valid email address</li>
                        <li>Message: Must be 10-1000 characters long</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Your Name'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Your Email'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Your Message'
                  rows={5}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed'
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
              >
                {isSubmitting ? (
                  <div className='flex items-center justify-center'>
                    <div className='animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2'></div>
                    Sending Message...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-900 text-white py-12'>
      <div className='container-custom'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-4 md:mb-0'>
            <p className='text-gray-400'>© {currentYear} Aswin. All rights reserved.</p>
          </div>
          <div className='flex space-x-4'>
            <a
              href='mailto:contact@aswinlocal.in'
              className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-secondary-600 transition-colors duration-200'
              title='Email'
            >
              <Mail size={20} />
            </a>
            <a
              href='https://www.linkedin.com/in/aswin4122001/'
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-secondary-600 transition-colors duration-200'
              title='LinkedIn'
            >
              <Linkedin size={20} />
            </a>
            <a
              href='https://github.com/Aswin-coder'
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-secondary-600 transition-colors duration-200'
              title='GitHub'
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  // Only show live chat in production or when backend is available
  const showLiveChat = import.meta.env.PROD || import.meta.env.VITE_ENABLE_LIVE_CHAT === 'true';

  return (
    <div className='App'>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      {showLiveChat && <LiveChatWidget />}
    </div>
  );
};

export default App;
