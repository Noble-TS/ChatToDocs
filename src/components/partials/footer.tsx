import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 dark:bg-gray-950 border-t border-gray-800 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white dark:text-gray-100">
              <span className="text-indigo-400">Docs</span>AI
            </h3>
            <p className="text-gray-400 dark:text-gray-300 text-sm">
              Intelligent documentation assistant powered by AI. Chat with your docs and get instant answers.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
              >
                <FaGithub size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>


          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">Company</h3>
            <ul className="space-y-2">
             
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                  Contact
                </Link>
              </li>
              
            </ul>
          </div>

         
        </div>

        {/* Technology Stack */}
        <div className="mt-8 pt-8 border-t border-gray-800 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h4 className="text-sm font-semibold text-white dark:text-gray-100 mb-2">Powered By</h4>
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <a
                  href="https://kapa.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-200"
                >
                  kapa.ai
                </a>
                
              </div>
            </div>
            
            {/* Framework Badges */}
            <div className="flex flex-wrap justify-center md:justify-end gap-2">
              {["Better Auth", "Supabase", "Next.js", "Tailwind CSS"].map((tech) => (
                <span
                  key={tech}
                  className="inline-block bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded-lg text-xs border border-indigo-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-center md:text-left text-gray-400 dark:text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} DocsAI. Built as an MVP for "Chat with Docs".
            </p>
            
            {/* Legal Links */}
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                Terms
              </Link>
              <Link to="/security" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                Security
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}