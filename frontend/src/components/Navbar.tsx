
import { FC, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { Menu, X, ChevronRight, LogOut } from 'lucide-react';
import { authService } from '../services/api';

const navLinks = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Máquinas', path: '/machines' },
  { name: 'Manutenções', path: '/maintenance' },
  { name: 'Peças', path: '/parts' },
  { name: 'Mão-de-obra', path: '/labor' },
  { name: 'Custos Indiretos', path: '/costs' },
  { name: 'Relatórios', path: '/reports' },
];

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="z-50">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`relative py-2 px-1 subtle-underline ${
                    location.pathname === link.path
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-primary transition-colors'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={handleLogout}
            className="ml-6 flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <LogOut size={18} className="mr-1" />
            <span>Sair</span>
          </button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="z-50 md:hidden text-primary p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
        <motion.div
          className="fixed inset-0 bg-white z-40 md:hidden"
          initial={{ x: '100%' }}
          animate={{ x: isOpen ? '0%' : '100%' }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        >
          <div className="flex flex-col h-full pt-24 px-8">
            <ul className="space-y-6">
              {navLinks.map((link) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                  transition={{ delay: isOpen ? 0.1 : 0 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center justify-between text-xl font-medium py-2"
                  >
                    <span>{link.name}</span>
                    <ChevronRight size={18} />
                  </Link>
                </motion.li>
              ))}
              
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ delay: isOpen ? 0.1 : 0 }}
              >
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-between text-xl font-medium py-2 w-full text-left"
                >
                  <span>Sair</span>
                  <LogOut size={18} />
                </button>
              </motion.li>
            </ul>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;
