'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image'; // Uncommented to use Next.js Image component
import { Footer } from './Footer';
import { Github, Linkedin, Mail, Music, Sun, Moon, Menu, X } from 'lucide-react';
import Link from 'next/link';

export function MinimalPortfolio() {
  // Inline Header Component
  const Header = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [menuOpen, setMenuOpen] = useState(false);

    // On component mount, check for saved theme or system preference
    useEffect(() => {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      } else {
        // If no theme is saved, use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', prefersDark);
      }
    }, []);

    // Toggle theme and save preference
    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem('theme', newTheme);
    };

    // Toggle mobile menu
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    return (
      <header className="bg-white dark:bg-black shadow-md fixed w-full z-50 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo or Site Name */}
          <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            Yash Shah
          </Link>

          {/* Navigation Links (Hidden on Mobile) */}
          <nav className="hidden md:flex space-x-6">
            <a
              href="#about"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#education"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Education
            </a>
            <a
              href="#skills"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Skills
            </a>
            <a
              href="#experience"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Projects
            </a>
            <a
              href="#publications"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Publications
            </a>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-800" />
              ) : (
                <Sun className="w-5 h-5 text-blue-800" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-gray-800 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <nav className="md:hidden bg-white dark:bg-black shadow-md">
            <div className="px-4 py-2 space-y-2">
              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                About
              </a>
              <a
                href="#education"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Education
              </a>
              <a
                href="#skills"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Skills
              </a>
              <a
                href="#experience"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Experience
              </a>
              <a
                href="#projects"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Projects
              </a>
              <a
                href="#publications"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Publications
              </a>
            </div>
          </nav>
        )}
      </header>
    );
  };

  const Section = ({
    id,
    title,
    children,
    className = "",
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <section id={id} className={`py-20 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-gray-800 dark:text-gray-200 relative group">
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-blue-700 transition-all duration-300">
            {title}
          </span>
          <div className="absolute -bottom-4 left-0 w-20 h-1 bg-blue-400 dark:bg-blue-600 group-hover:w-32 transition-all duration-300"></div>
        </h2>
        {children}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-black dark:to-gray-900 text-black dark:text-gray-100 font-inter transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-blue-50 to-white dark:from-black dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:bg-grid-pattern-dark"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 relative">
            <div className="flex-1 z-10">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                Yash Shah
              </h1>
              <p className="text-2xl text-blue-500 dark:text-blue-400 mb-8 font-medium">AI/ML Enthusiast</p>
              <p className="text-gray-600 dark:text-gray-300 mb-8">US Citizen | yashbshah13@gmail.com</p>
              <div className="flex gap-6">
                {[
                  { href: "https://github.com/itsreallyyash", icon: Github },
                  { href: "https://www.linkedin.com/in/yashshahh", icon: Linkedin },
                  { href: "mailto:yashbshah13@gmail.com", icon: Mail },
                  { href: "https://music.apple.com/profile/itsreallyyash", icon: Music }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="p-3 bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-full hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    target="_blank" rel="noopener noreferrer"
                  >
                    <link.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </a>
                ))}
              </div>
            </div>
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-blue-400 dark:bg-blue-600 rounded-full blur-2xl opacity-20"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <Image
                  src="/path-to-your-image.jpg" // Replace with your image path
                  alt="Yash Shah"
                  className="rounded-full object-cover border-8 border-white dark:border-black shadow-xl w-full h-full"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" title="About Me" className="bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-dark">
            <div className="bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">                
                I&apos;m Yash Shah, a passionate innovator with a knack for solving complex problems and optimizing systems. My expertise spans artificial intelligence, machine learning, and data science, where I thrive on uncovering hidden insights and crafting efficient, impactful solutions. I immerse myself in the intricacies of algorithms, design robust pipelines, and approach challenges with precision and creativity.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Outside of work, I find balance through cycling, which clears my mind and fuels my focus. Music serves as my constant companion, inspiring late-night ideas and breakthroughs. I&apos;m driven by curiosity, innovation, and the thrill of solving problems that others shy away from.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you&apos;re interested in collaborating to push the boundaries of technology and innovation, let&apos;s connect and build something extraordinary together.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Education Section */}
      <Section id="education" title="Education">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Mukesh Patel School of Technology Management & Engineering (NMIMS University)
            </h3>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">Bachelor of Technology, Major in Computer Engineering</p>
            <p className="text-gray-600 dark:text-gray-400">Graduation: May 2025</p>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="Skills" className="bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6">Languages</h3>
              <div className="flex flex-wrap gap-3">
                {["C++", "CSS", "HTML", "Java", "NoSQL", "Python", "R", "SQL"].map((lang) => (
                  <span key={lang} className="px-4 py-2 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6">Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "NumPy", "Pandas", "SciPy", "Scikit-Learn", "TensorFlow", "Docker",
                  "OpenCV", "Matplotlib", "MongoDB", "ChromaDB", "Apache NiFi",
                  "PostgreSQL", "Express.js", "Node.js", "Angular", "React", "Vue.js"
                ].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Work Experience Section */}
      <Section id="experience" title="Work Experience">
        <div className="max-w-6xl mx-auto space-y-8">
          {[
            {
              company: "University of Washington Bothell, USA",
              role: "AI & Machine Learning Research Intern",
              achievements: [
                "Specialized as data analytics expert, achieved 95% accuracy in detection of fake reviews",
                "Applied CNNs, Random Forests, and BERT, improving detection speed by 40% through semantic analysis and cross-platform checks on 500,000+ reviews"
              ]
            },
            {
              company: "IIT Bombay - National Centre for Aerospace Innovation and Research, Mumbai, India",
              role: "AI & Machine Learning Research Intern",
              achievements: [
                "Architected a 1PB data lake using Apache NiFi for data routing, Apache Airflow for workflow automation, and MinIO for object storage",
                "Created a program for legal due diligence on 1 million patents, optimized filings and reduced costs by 70%",
                "Designed a RAG pipeline with 90% accuracy for summarizing 10,000+ research papers"
              ]
            },
            {
              company: "Somany Evergreens, Mumbai, India",
              role: "Financial Data Analyst Intern",
              achievements: [
                "Engineered advanced techniques such as moving averages, VCP tightness, SMA, and volume dynamics",
                "Integrated Monte Carlo simulations and genetic algorithms"
              ]
            },
            {
              company: "Sarvottam Polymers, Mumbai, India",
              role: "Cloud Intern",
              achievements: [
                "Devised ETL pipelines for AWS migration using AWS Glue and S3",
                "Transitioned legacy systems to AWS, resolved 95% of infrastructure issues",
                "Documented migration procedures and best practices"
              ]
            }
          ].map((exp, index) => (
            <div key={index} className="bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{exp.company}</h3>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">{exp.role}</p>
              <ul className="space-y-3">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-500 dark:text-blue-400 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Projects" className="bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Dyadic-ML",
              subtitle: "Team Lead",
              description:[ "Engineered a sentiment-based recommendation system using BERT for NLP and KMeans clustering on 6,200+ songs, delivering mood-aligned music therapy recommendations."]
            },
            {
              title: "Citer: Scientific Collaboration Network Analyzer",
              subtitle: "2nd Place, Dept. Research Awards '24",
              description: [
                "Implemented a RAG pipeline with Qwen-2.5B LLM and LoRA fine-tuned on 21.5Mn+ papers",
                "Built a dynamic knowledge graph visualization system identifying 10,000+ influential research nodes"
              ]
            },
            {
              title: "Kadu Kirana- AI-Powered Grocery Chatbot",
              subtitle: "Runner-up, college's official 18hr Hackathon",
              description:[ "Integrated Kiranawala, a local LLM chatbot, for 92.3% accurate ingredient recommendations, used Ollama and Mistral's GPU-accelerated 7B parameter model."]
            },
            {
              title: "Neural Theft: Secure Chatroom",
              subtitle: "Runner-up, college's official 18hr Hackathon",
              description:[ "Built a Python encoder for secure text embedding in images, and developed a scalable Socket.IO chatroom with 28% faster file transmission."]
            }
          ].map((project, index) => (
            <div key={index} className="bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.subtitle}</p>
              {Array.isArray(project.description) ? (
                <ul className="space-y-3">
                  {project.description.map((desc, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-500 dark:text-blue-400 mr-2">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{desc}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Publications Section */}
      <Section id="publications" title="Publications">
        <div className="max-w-4xl mx-auto space-y-8">
          {[
            {
              title: "Citer: Leveraging Large Language Models and XAI for Analyzing Scientific Collaboration Networks",
              year: "2024",
              description: ["Created a tool that uses large language models and explainable AI to analyze scientific collaboration networks, enabling discovery of collaboration patterns and research insights."]
            },
            {
              title: "Leveraging Deep Learning and Generative AI for Personalized Music Therapy: Enhancing Mental Well-Being Through Tailored Musical Interventions",
              year: "2024",
              description: ["Explored the intersection of deep learning, generative AI, and music therapy to create personalized musical interventions for improving mental well-being."]
            }
          ].map((pub, index) => (
            <div key={index} className="bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4 hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300">
                {pub.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{pub.year} (Accepted, presentation pending)</p>
              <p className="text-gray-700 dark:text-gray-300">{pub.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Wrap Footer with dark/light background support */}
      <div className="bg-white dark:bg-black">
        <Footer />
      </div>
    </div>
  );
}
