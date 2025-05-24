import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AdminNavItem } from '../../types';
import { HomeIcon, CubeIcon, UsersIcon, ClipboardListIcon, ChartBarIcon, CogIcon, LogoutIcon, UserCircleIcon, MenuIcon, XIcon } from '../icons';

const navItems: AdminNavItem[] = [
  { label: 'Painel', icon: HomeIcon, path: '/admin/dashboard' },
  { label: 'Produtos', icon: CubeIcon, path: '/admin/produtos' },
  { label: 'Clientes', icon: UsersIcon, path: '/admin/clientes' },
  { label: 'Pedidos', icon: ClipboardListIcon, path: '/admin/pedidos' },
  { label: 'Financeiro', icon: ChartBarIcon, path: '/admin/financeiro' },
  { label: 'Opções', icon: CogIcon, path: '/admin/opcoes' },
];

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem('userName') || 'Usuário Admin';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userName');
    navigate('/login');
    setIsMobileMenuOpen(false); // Close menu on logout
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link 
            to="/admin/dashboard" 
            className="flex-shrink-0" 
            aria-label="Página inicial do painel Sorvetão"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div>
              <img src="/assets/images/logo_sorvetao.png" alt="Sorvetão Logo" className="h-12 w-auto" />
              
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 items-end" aria-label="Navegação principal do administrador">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `group flex flex-col items-center text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'text-sorvetao-primary'
                      : 'text-sorvetao-text-secondary hover:text-sorvetao-primary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span 
                      className={`mb-1 p-2 rounded-full flex items-center justify-center 
                      ${isActive ? 'bg-sorvetao-pink-light' : 'group-hover:bg-sorvetao-gray-light'}`}
                    >
                       {/* Using w-8 h-8 for larger desktop nav icons */}
                       <item.icon className={`w-8 h-8 ${isActive ? 'text-sorvetao-primary' : 'text-sorvetao-text-secondary group-hover:text-sorvetao-primary'}`} />
                    </span>
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Section for Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-sorvetao-text-primary" aria-label={`Usuário logado: ${userName}`}>{userName}</div>
            </div>
            <UserCircleIcon className="w-10 h-10 text-sorvetao-gray-medium rounded-full" aria-hidden="true" />
            <button
              onClick={handleLogout}
              title="Sair"
              aria-label="Sair do sistema"
              className="p-2 rounded-full text-sorvetao-text-secondary hover:text-sorvetao-primary hover:bg-sorvetao-gray-light focus:outline-none focus:bg-sorvetao-gray-light transition-colors duration-150"
            >
              <LogoutIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile: Logout and Hamburger Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={handleLogout}
              title="Sair"
              aria-label="Sair do sistema"
              className="p-2 rounded-full text-sorvetao-text-secondary hover:text-sorvetao-primary hover:bg-sorvetao-gray-light focus:outline-none focus:bg-sorvetao-gray-light transition-colors duration-150"
            >
              <LogoutIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
              className="p-2 rounded-md text-sorvetao-text-secondary hover:text-sorvetao-primary focus:outline-none focus:bg-sorvetao-pink-light"
            >
              {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

       {/* Mobile Navigation Drawer */}
       {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full inset-x-0 bg-white shadow-lg z-40 border-t border-sorvetao-gray-medium transform transition-transform duration-300 ease-in-out">
            <nav className="flex flex-col p-4 space-y-1">
              {/* User Info at the top of the drawer */}
              <div className="flex items-center space-x-3 px-3 py-3 mb-3 border-b border-sorvetao-gray-light">
                  <UserCircleIcon className="w-10 h-10 text-sorvetao-gray-medium rounded-full" />
                  <div>
                    <div className="text-base font-medium text-sorvetao-text-primary">{userName}</div>
                    {/* You can add role or other info here if available */}
                    {/* <div className="text-xs text-sorvetao-text-secondary">Administrator</div> */}
                  </div>
              </div>
              {navItems.map((item) => (
                <NavLink
                  key={item.label + "-mobile-drawer"}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors duration-150 ${
                      isActive
                        ? 'text-sorvetao-primary bg-sorvetao-pink-light'
                        : 'text-sorvetao-text-secondary hover:bg-sorvetao-gray-light hover:text-sorvetao-primary'
                    }`
                  }
                >
                  {/* Fix: Use NavLink's children render prop to correctly scope 'isActive' for styling child elements. */}
                  {({ isActive }) => (
                    <>
                      <item.icon className={`w-6 h-6 ${isActive ? 'text-sorvetao-primary' : 'text-sorvetao-text-secondary'}`} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
    </header>
  );
};

export default AdminHeader;
