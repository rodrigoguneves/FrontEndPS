
import React from 'react'; 
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { CustomerNavItem } from '../../types';
import { 
    HomeIcon, 
    PlusCircleIcon, 
    ClipboardListIcon, 
    ChartBarIcon, 
    UserCircleIcon as AccountIcon, // Renamed for clarity, using UserCircleIcon for "Minha Conta"
    LogoutIcon,
} from '../icons';

const customerNavItems: CustomerNavItem[] = [
  { label: 'Painel', icon: HomeIcon, path: '/portal/dashboard', nameMatch: 'dashboard' },
  { label: 'Novo Pedido', icon: PlusCircleIcon, path: '/portal/novo-pedido', nameMatch: 'novo-pedido' },
  { label: 'Meus Pedidos', icon: ClipboardListIcon, path: '/portal/meus-pedidos', nameMatch: 'meus-pedidos' },
  { label: 'Histórico', icon: ChartBarIcon, path: '/portal/historico', nameMatch: 'historico' },
  { label: 'Minha Conta', icon: AccountIcon, path: '/portal/minha-conta', nameMatch: 'minha-conta' },
];

const CustomerHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customerName = sessionStorage.getItem('customerDisplayName') || 'Cliente Sorvetão';
  const customerInitial = customerName.length > 0 ? customerName.substring(0, 1).toUpperCase() : '?';

  const handleLogout = () => {
    sessionStorage.removeItem('isCustomerLoggedIn');
    sessionStorage.removeItem('customerDisplayName');
    navigate('/login');
  };
  
  const isActivePath = (itemPath: string, itemNameMatch?: string) => {
    if (itemPath === '/portal/dashboard' && (location.pathname === '/portal' || location.pathname === '/portal/')) {
        return true;
    }
    if (itemNameMatch) {
        return location.pathname.includes(itemNameMatch);
    }
    return location.pathname === itemPath;
  };

  return (
    <header className="bg-white shadow-md md:sticky md:top-0 md:z-50"> {/* Changed sticky classes to be conditional */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24"> {/* Adjusted height for mobile */}
          {/* Logo */}
          <Link 
            to="/portal/dashboard" 
            className="flex-shrink-0" 
            aria-label="Página inicial do portal Sorvetão"
          >
            <img src="/assets/images/logo_sorvetao.png" alt="Sorvetão Logo" className="h-10 sm:h-12 w-auto" /> {/* Adjusted logo size */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2 lg:space-x-3 items-center" aria-label="Navegação principal do cliente">
            {customerNavItems.map((item) => {
              const active = isActivePath(item.path, item.nameMatch);
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  title={item.label}
                  className={
                    `group flex flex-col items-center text-center p-2 rounded-xl transition-colors duration-150 w-28 h-28 justify-center
                    ${ active ? '' : 'hover:bg-sorvetao-pink-light' }`
                  }
                >
                    <span 
                      className={`mb-1.5 p-3 rounded-full flex items-center justify-center w-14 h-14 transition-colors duration-150
                      ${active ? 'bg-sorvetao-primary' : 'bg-gray-100 group-hover:bg-pink-200'}`}
                    >
                       <item.icon className={`w-7 h-7 ${active ? 'text-white' : 'text-sorvetao-text-secondary group-hover:text-sorvetao-primary'}`} />
                    </span>
                    <span className={`text-xs font-medium ${active ? 'text-sorvetao-primary' : 'text-sorvetao-text-secondary group-hover:text-sorvetao-primary'}`}>
                        {item.label}
                    </span>
                </NavLink>
              );
            })}
          </nav>

          {/* User Info & Logout (Visible on all sizes as per mobile screenshot showing it) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden sm:block text-right"> {/* Hide text on very small mobile, show on sm+ */}
              <div className="text-sm text-sorvetao-text-primary" aria-label={`Cliente logado: ${customerName}`}>Olá, {customerName.split(' ')[0]}</div>
            </div>
             {/* Avatar: Shows image if available, otherwise initial */}
            { sessionStorage.getItem('customerAvatarUrl') ? (
                <img src={sessionStorage.getItem('customerAvatarUrl')!} alt="Avatar do cliente" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover" />
            ) : (
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-sorvetao-gray-medium rounded-full flex items-center justify-center text-sorvetao-primary font-semibold text-base sm:text-lg">
                    {customerInitial}
                </div>
            )}
            <button
              onClick={handleLogout}
              title="Sair"
              aria-label="Sair do portal"
              className="p-2 rounded-full text-sorvetao-text-secondary hover:text-sorvetao-primary hover:bg-sorvetao-gray-light focus:outline-none focus:bg-sorvetao-gray-light transition-colors duration-150"
            >
              <LogoutIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;
