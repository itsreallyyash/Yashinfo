"use client";

import React, { useState } from "react";
import { useTypingEffect } from "../hooks/useTypingEffect";
import { playKeyboardSound } from "../utils/audio";
import { X, Minus, Square } from "lucide-react";
import { Visualizer } from "./Visualizer";
import { LinkPreview } from "./LinkPreview";

const commands = [
  { command: "help", description: "List all available commands", color: "text-yellow-400" },
  { command: "about", description: "Display information about me", color: "text-cyan-400" },
  { command: "cv", description: "View my curriculum vitae", color: "text-green-400" },
  { command: "github", description: "Visit my GitHub profile", color: "text-purple-400" },
  { command: "linkedin", description: "Connect with me on LinkedIn", color: "text-blue-400" },
  { command: "apple-music", description: "Check out my music taste", color: "text-red-400" },
  { command: "publications", description: "View my research publications", color: "text-yellow-400" },
  { command: "projects", description: "Browse my projects", color: "text-orange-400" },
  { command: "clear", description: "Clear the terminal", color: "text-gray-400" },
  { command: "exit", description: "Exit the terminal", color: "text-red-400" },
  { command: "chill", description: "Activate chill mode", color: "text-pink-400" },
];

const sections = [
  { command: "about", content: `Hey, I'm Yash Shah—think of me as the curious tinkerer who's always on a quest to break, build, and optimize. My playground? AI, machine learning, and data that tell stories most people miss. I dive deep into algorithms, weave through pipelines, and always find the sharpest edge to cut through complexity.

Off the clock, I trade my keyboard for pedals and hit the road—cycling clears my head like nothing else. Music? That's the soundtrack to every breakthrough, every idea that keeps me up at 3 AM.

I code, I explore, and I thrive on the rush of solving problems others shy away from. If you're up for pushing boundaries, hit me up. Let's hack the system—creatively, of course.` },
  { command: "cv", content: "[cv]" },
  { command: "github", content: "[github]" },
  { command: "linkedin", content: "[linkedin]" },
  { command: "apple-music", content: "[apple-music]" },
  { command: "publications", content: "Upcoming publications:\n1. Citer: Leveraging Large Language Models and XAI for Analyzing Scientific Collaboration Networks. (2024) (Accepted)" },
];

// const projects = [
//   { title: "Citer - Research Aid Tool", link: "https://github.com/anishCS/Citer", description: "Used by PhD students & professors at IIT Bombay. Research paper to be presented on Feb 14, 2025.", color: "text-green-400" },
//   { title: "Dyadic-ML", link: "https://github.com/itsreallyyash/musik-ml", description: "AI/ML project focused on dyadic interactions relative to music.", color: "text-green-400" },
//   { title: "Kadu Kirana - AI Grocery Chatbot", link: "https://github.com/itsreallyyash/Kadu-Kirana", description: "Cyber Cypher 2024 Hackathon - 2nd Place (Advanced). AI chatbot for personalized grocery recommendations.", color: "text-cyan-400" },
// ];
const projects = [
  {
    title: "Citer - Research Aid Tool",
    link: "https://github.com/anishCS/Citer",
    description: "Used by PhD students & professors at IIT Bombay. Research paper to be presented on Feb 14, 2025.",
    color: "text-green-400",
  },
  {
    title: "Dyadic-ML",
    link: "https://github.com/itsreallyyash/musik-ml",
    description: "AI/ML project focused on dyadic interactions relative to music.",
    color: "text-green-400",
  },
  {
    title: "Merkaba - Jewelry E-commerce",
    link: "https://github.com/itsreallyyash/merkaba",
    description: "A custom online jewelry store built for a private client.",
    color: "text-green-400",
  },
  {
    title: "Kadu Kirana - AI Grocery Chatbot",
    link: "https://github.com/itsreallyyash/Kadu-Kirana",
    description: "Cyber Cypher 2024 Hackathon - 2nd Place (Advanced). AI chatbot for personalized grocery recommendations.",
    color: "text-cyan-400",
  },
  {
    title: "Neural Theft - Secure Chatroom",
    link: "https://github.com/darshmashru/Neural_Theft_Steganography",
    description: "Cyber Cypher 2022 Hackathon - 2nd Place. Encrypted chatroom using steganography techniques.",
    color: "text-cyan-400",
  },
  {
    title: "1PB Data Lake Architecture (NDA Covered, Govt Project)",
    link: "",
    description: "Designed a 1 Petabyte-scale Data Lake Architecture for secure and efficient data storage. NDA Covered - Govt Project.",
    contact: "yashbshah13@gmail.com",
    color: "text-red-400",
  },
  {
    title: "Edge Computing Detection with CSI2 Cameras (NDA Covered, Military Project)",
    link: "",
    description: "Developed real-time convolutional detection algorithms for CSI2 cameras in edge computing. NDA Covered - Military Project.",
    contact: "yashbshah13@gmail.com",
    color: "text-red-400",
  },
  {
    title: "University of Washington - Education Consolidation & Counseling (Stealth Startup)",
    link: "",
    description: "Project-based educational platform focused on university counseling and academic consolidation. Developed under a stealth startup.",
    contact: "yashbshah13@gmail.com",
    color: "text-orange-400",
  },
];
export function Terminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<React.ReactNode[]>([]);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const { displayedText, isComplete } = useTypingEffect(
    "      Welcome to Yash Shah's portfolio. Type 'help' for available commands.",
    10
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    playKeyboardSound();
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim().toLowerCase();
    let response: React.ReactNode;

    if (trimmedInput === "help") {
      response = (
        <div>
          {commands.map((cmd, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className={`font-bold ${cmd.color} w-32`}>{cmd.command}</span>
              <span className="text-gray-400">{cmd.description}</span>
            </div>
          ))}
        </div>
      );
    } else if (trimmedInput === "clear") {
      setOutput([]);
      setInput("");
      return;
    } else if (trimmedInput === "exit") {
      window.location.reload();
      return;
    } else if (trimmedInput === "chill") {
      setShowVisualizer(true);
      response = <span>Starting chill mode... 🌊</span>;
    } else if (trimmedInput === "projects") {
      response = (
        <div className="grid grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div key={index} className="border-2 border-dashed border-gray-500 p-4">
              <h3 className={`${project.color} font-bold`}>{project.title}</h3>
              {project.link && <LinkPreview key={index} href={project.link}>{project.link}</LinkPreview>}
              <p className="text-gray-300">{project.description}</p>
            </div>
          ))}
        </div>
      );
    } else {
      const section = sections.find((s) => s.command === trimmedInput);
      response = section ? (
        <div>
          {section.content.split("\n").map((line, index) => {
            if (line.includes("[cv]")) return <LinkPreview key={index} href="/cv">View my CV</LinkPreview>;
            if (line.includes("[github]")) return <LinkPreview key={index} href="https://github.com/itsreallyyash">GitHub Profile</LinkPreview>;
            if (line.includes("[linkedin]")) return <LinkPreview key={index} href="https://linkedin.com/in/your-profile">LinkedIn Profile</LinkPreview>;
            if (line.includes("[apple-music]")) return <LinkPreview key={index} href="https://music.apple.com/profile/itsreallyyash">My Music Taste</LinkPreview>;
            return <div key={index}>{line}</div>;
          })}
        </div>
      ) : <span className="text-red-400">Command not found: {input}</span>;
    }

    setOutput((prevOutput) => [
      ...prevOutput,
      <div key={prevOutput.length} className="text-[#ff72e1]">YashShah@Portfolio ~ % {input}</div>,
      response
    ]);

    setInput("");
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white font-mono">
        {/* Top Bar Restored */}
        <div className="bg-black border-b border-gray-800 p-2 flex justify-between items-center">
          <div className="absolute left-1/2 transform -translate-x-1/2 text-[#ffffff]">YashShah@Portfolio: ~</div>
          <div className="flex gap-4">
            <button className="text-gray-400 hover:text-gray-200"><Minus className="w-4 h-4" /></button>
            <button className="text-gray-400 hover:text-gray-200"><Square className="w-4 h-4" /></button>
            <button className="text-gray-400 hover:text-gray-200"><X className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="p-4">
          <div className="text-[#ffffff]">{displayedText}</div>
          {isComplete && (
            <>
              {output.map((content, index) => <div key={index} className="mt-2">{content}</div>)}
              <form onSubmit={handleInputSubmit} className="mt-2 flex items-center">
                <span className="text-[#ff72e1] mr-2">YashShah@Portfolio ~ %</span>
                <input type="text" value={input} onChange={handleInputChange} className="bg-transparent text-white focus:outline-none flex-1" autoFocus />
              </form>
            </>
          )}
        </div>
      </div>
      {showVisualizer && <Visualizer onClose={() => setShowVisualizer(false)} />}
    </>
  );
}
