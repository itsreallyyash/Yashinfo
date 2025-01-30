'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { playKeyboardSound } from '../utils/audio';

const structuredCV = `
Yash Shah
===========
US Citizen | yashbshah13@gmail.com | GitHub: itsreallyyash | LinkedIn: yashshahh

EDUCATION
---------
Mukesh Patel School of Technology Management & Engineering (NMIMS University)
Bachelor of Technology, Major in Computer Engineering
Graduation: May 2025

SKILLS
------
Languages: C++, CSS, HTML, Java, NoSQL, Python, R, SQL
Technologies: NumPy, Pandas, SciPy, Scikit-Learn, TensorFlow, Natural Language Toolkit, Docker, OpenCV, Matplotlib,
              bs4, Selenium, MongoDB, ChromaDB, Apache NiFi, Apache Airflow, PostgreSQL, Express.js, Node.js, Angular, React, Vue.js

WORK EXPERIENCE
---------------
University of Washington Bothell, USA
AI & Machine Learning Research Intern
• Specialized as data analytics expert, achieved 95% accuracy in detection of fake reviews
• Applied CNNs, Random Forests, and BERT, improving detection speed by 40% through semantic analysis and cross-platform checks on 500,000+ reviews

IIT Bombay - National Centre for Aerospace Innovation and Research, Mumbai, India
AI & Machine Learning Research Intern
• Architected a 1PB data lake using Apache NiFi, Apache Airflow, and MinIO for scalable and efficient data processing
• Created a program for legal due diligence on 1 million patents, optimized filings and reduced costs by 70%
• Designed a RAG pipeline with 90% accuracy for summarizing 10,000+ research papers and generated network graphs for 1,000+ author affiliations

Somany Evergreens, Mumbai, India
Financial Data Analyst Intern
• Engineered advanced techniques such as moving averages, VCP tightness, SMA, and volume dynamics
• Integrated Monte Carlo simulations and genetic algorithms

Sarvottam Polymers, Mumbai, India
Cloud Intern
• Devised ETL pipelines for AWS migration using AWS Glue and S3
• Transitioned legacy systems to AWS, resolved 95% of infrastructure issues
• Documented migration procedures and best practices

PROJECTS
--------
1. Dyadic-ML (Team Lead)
   • Engineered a sentiment-based recommendation system using BERT for NLP and KMeans clustering on 6,200+ songs

2. Citer: Scientific Collaboration Network Analyzer (2nd Place, Dept. Research Awards '24)
   • Implemented a RAG pipeline with Qwen-2.5B LLM and LoRA fine-tuned on 21.5Mn+ papers
   • Built a dynamic knowledge graph visualization system identifying 10,000+ influential research nodes

3. Kadu Kirana - AI-Powered Grocery Chatbot (Runner-up, college's official 18hr Hackathon)
   • Integrated Kiranawala, a local LLM chatbot, for 92.3% accurate ingredient recommendations

4. Neural Theft: Secure Chatroom (Runner-up, college's official 18hr Hackathon)
   • Built a Python encoder for secure text embedding in images and developed a scalable Socket.IO chatroom

PUBLICATIONS
------------
Citer: Leveraging Large Language Models and XAI for Analyzing Scientific Collaboration Networks. (2024) (Accepted)
• Created a tool using large language models and explainable AI to analyze scientific collaboration networks
`;

export function CV() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [input, setInput] = useState('');
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 2300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (error) {
      const glitchTimer = setTimeout(() => {
        setShowPopup(true);
      }, 500);

      return () => clearTimeout(glitchTimer);
    }
  }, [error]);

  if (!mounted) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    playKeyboardSound();
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === ':wq') {
      router.push('/');
    }
    setInput('');
  };

  if (loading) {
    return (
      <div className="bg-black text-red-400 font-mono min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">Loading CV...</div>
          <div className="w-16 h-16 border-t-4 border-red-400 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-red-400 p-4 font-mono h-screen overflow-hidden relative">
      <div className={`glitch-container ${error ? 'glitch' : ''}`}>
        <div className="text-2xl mb-4">Error: CV_LOAD_FAILURE</div>
        <div className="mb-4">An error occurred while loading the CV. Displaying backup data:</div>
      </div>
      {showPopup && (
        <div className="fixed inset-4 bg-black border-2 border-green-400 p-4 overflow-auto">
          <pre className="text-green-400 whitespace-pre-wrap">{structuredCV}</pre>
          <form onSubmit={handleInputSubmit} className="mt-4">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              className="bg-transparent text-green-400 border border-green-400 px-2 py-1 w-full"
              placeholder="Type :wq to exit"
              autoFocus
            />
          </form>
        </div>
      )}
      <style jsx>{`
        .glitch-container {
          position: relative;
        }
        .glitch {
          animation: glitch 0.3s infinite;
        }
        @keyframes glitch {
          0%, 100% {
            transform: translate(0, 0);
          }
          20% {
            transform: translate(3px, -2px);
          }
          40% {
            transform: translate(-3px, 2px);
          }
          60% {
            transform: translate(2px, -3px);
          }
          80% {
            transform: translate(-2px, 3px);
          }
        }
      `}</style>
    </div>
  );
}

