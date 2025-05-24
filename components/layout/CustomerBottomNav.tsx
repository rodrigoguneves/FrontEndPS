
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HomeIcon, PlusIcon, ClipboardListIcon, ChartBarIcon, UserCircleIcon as ProfileIcon } from '../icons'; // Changed MapPinIcon to ClipboardListIcon

interface BottomNavItem {
  label: string;
  icon: React.FC<{ className?: string; strokeWidth?: string | number; fill?: string; }>; // Adjusted Icon type for fill/strokeWidth
  path: string;
  nameMatch?: string;
}

const bottomNavItems: BottomNavItem[] = [
  { label: 'Painel', icon: HomeIcon, path: '/portal/dashboard', nameMatch: 'dashboard' },
  { label: 'Novo Pedido', icon: PlusIcon, path: '/portal/novo-pedido', nameMatch: 'novo-pedido' },
  { label: 'Pedidos', icon: ClipboardListIcon, path: '/portal/meus-pedidos', nameMatch: 'meus-pedidos' }, // Icon updated
  { label: 'Histórico', icon: ChartBarIcon, path: '/portal/historico', nameMatch: 'historico' },
  { label: 'Perfil', icon: ProfileIcon, path: '/portal/minha-conta', nameMatch: 'minha-conta' },
];

const CustomerBottomNav: React.FC = () => {
  const location = useLocation();

  const isActivePath = (itemPath: string, itemNameMatch?: string) => {
    if (itemPath === '/portal/dashboard' && (location.pathname === '/portal' || location.pathname === '/portal/')) {
        return true;
    }
    if (itemNameMatch) {
        return location.pathname.startsWith(itemPath);
    }
    return location.pathname === itemPath;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-sorvetao-gray-medium shadow-top-md z-40 h-[72px]">
      <div className="flex justify-around items-center h-full px-1">
        {bottomNavItems.map((item) => {
          const isActive = isActivePath(item.path, item.path); 
          
          // Determine default fill/stroke based on icon. ProfileIcon is already solid-like.
          // ClipboardListIcon needs to be filled when active.
          let iconFill = 'none';
          let iconStrokeWidth: string | number = 2;
          let iconClassName = `w-6 h-6 mb-0.5`;

          if (isActive) {
            iconClassName = `w-7 h-7 mb-0.5 text-sorvetao-primary`;
            if (item.label === 'Perfil') { // Profile icon is inherently filled-like
                iconStrokeWidth = 0; // Or a very small value if needed
                iconFill = 'currentColor'; // Use text color for fill
            } else if (item.label === 'Pedidos') { // Make ClipboardListIcon filled
                iconFill = 'currentColor'; // Use text color for fill
                // iconStrokeWidth = 0; // Or adjust if the filled version still needs a stroke
            } else {
                // For other active icons, keep stroke, primary color
                 iconFill = 'none'; // Ensure it's not filled if not intended
            }
          } else {
            iconClassName = `w-6 h-6 mb-0.5 text-sorvetao-text-secondary`;
             if (item.label === 'Perfil') {
                iconFill = 'none'; 
             }
          }


          return (
            <NavLink
              key={item.label}
              to={item.path}
              title={item.label}
              className={`flex flex-col items-center justify-center w-1/5 h-full text-center p-1 transition-colors duration-150 rounded-md
                ${isActive ? 'text-sorvetao-primary' : 'text-sorvetao-text-secondary hover:text-sorvetao-primary focus:bg-sorvetao-pink-light'}`}
            >
              <item.icon className={iconClassName} strokeWidth={iconStrokeWidth} fill={iconFill} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-sorvetao-primary' : 'text-sorvetao-text-secondary'}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default CustomerBottomNav;
