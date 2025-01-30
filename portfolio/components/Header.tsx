'use client'

export function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex justify-center space-x-6">
          <li>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-gray-600 hover:text-blue-400"
            >
              About
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('education')} 
              className="text-gray-600 hover:text-blue-400"
            >
              Education
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('skills')} 
              className="text-gray-600 hover:text-blue-400"
            >
              Skills
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('experience')} 
              className="text-gray-600 hover:text-blue-400"
            >
              Experience
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="text-gray-600 hover:text-blue-400"
            >
              Projects
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('publications')} 
              className="text-gray-600 hover:text-blue-400"
            >
              Publications
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

