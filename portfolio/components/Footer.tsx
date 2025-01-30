import { Mail, Github, Linkedin, Music } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black-100 dark:bg-black-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
            &copy; 2024 Yash Shah. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="mailto:yashbshah13@gmail.com"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-400"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/itsreallyyash"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/yashshahh"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://music.apple.com/profile/itsreallyyash"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Music className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

