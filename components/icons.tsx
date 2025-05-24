// Feather-inspired icons, simplified and rounded where possible
import React from 'react';

// Fix: Export IconProps interface
export interface IconProps {
  className?: string;
  strokeWidth?: string | number; // Allow overriding stroke-width for specific icons
  fill?: string; // For solid icons
}

export const EnvelopeIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export const LockIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);
export const LockClosedIcon = LockIcon; // Alias for consistency with Heroicons naming if used elsewhere


export const LogoutIcon = ({ className = "w-6 h-6", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

export const UserCircleIcon = ({ className = "w-8 h-8", strokeWidth = 1.5, fill="none" }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} fill={fill}>
    {/* Using a filled user icon similar to the mobile screenshot */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);


export const HeadphonesIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
  </svg>
);

export const HomeIcon = ({ className = "w-6 h-6", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

export const CubeIcon = ({ className = "w-6 h-6", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

export const UsersIcon = ({ className = "w-6 h-6", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

export const ClipboardListIcon = ({ className = "w-6 h-6", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <line x1="12" x2="12" y1="10" y2="10"></line> 
    <line x1="12" x2="12" y1="14" y2="14"></line>
    <line x1="12" x2="12" y1="18" y2="18"></line>
    <line x1="16" x2="8" y1="10" y2="10"></line>
    <line x1="16" x2="8" y1="14" y2="14"></line>
    <line x1="16" x2="8" y1="18" y2="18"></line>
  </svg>
);
// Alias for specific use in CustomerAccountPage
export const IdentificationIcon = ({ className = "w-5 h-5", strokeWidth = 1.5 }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm0-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25h-15z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H10.5a.75.75 0 01-.75-.75V9.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 11.25h3M6 13.5h3M6 15.75h3" />
  </svg>
);


export const ChartBarIcon = ({ className = "w-6 h-6", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="20" x2="12" y2="10"></line>
    <line x1="18" y1="20" x2="18" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="16"></line>
  </svg>
);

export const CogIcon = ({ className = "w-6 h-6", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

export const PlusIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export const MapPinIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => ( 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export const PencilIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

export const PencilSquareIcon = ({ className = "w-5 h-5", strokeWidth = 1.5 }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

export const TrashIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

export const EyeIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

export const EyeOffIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

export const LinkIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

export const DuplicateIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m9.75 0l-2.25-2.25m0 0l-2.25 2.25m2.25-2.25v2.25" />
  </svg>
);


export const TruckIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="1" y="3" width="15" height="13" rx="2"></rect> 
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);

export const ChevronLeftIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

export const ChevronRightIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export const SearchIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export const ChevronDownIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export const ChevronUpIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

export const TagIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

export const MenuIcon = ({ className = "w-6 h-6", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

export const XIcon = ({ className = "w-6 h-6", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const LeafIcon = ({ className = "w-6 h-6", strokeWidth = 1.5 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const IceCreamConeIcon = ({ className = "w-6 h-6", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} >
    <path d="M12 19L9 12H15L12 19Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 10.6569 13.6569 12 12 12Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.5 6C10.5 4.89543 11.1716 4 12 4C12.8284 4 13.5 4.89543 13.5 6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DotsHorizontalIcon = ({ className = "w-6 h-6", strokeWidth = 1.5 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

export const SaveIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13H7v8"></polyline>
    <polyline points="7 3 7 8H15"></polyline>
  </svg>
);

export const DollarSignIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

export const ShoppingCartIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);


export const CreditCardIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

export const ShoppingBagIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

export const AlertTriangleIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);
// Alias ExclamationTriangleIcon to AlertTriangleIcon for Heroicons-like usage if desired
export const ExclamationTriangleIcon = AlertTriangleIcon;


export const BankIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="10" rx="1"></rect>
    <path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"></path>
    <line x1="3" y1="21" x2="21" y2="21"></line>
    <line x1="7" y1="15" x2="7.01" y2="15"></line>
    <line x1="12" y1="15" x2="12.01" y2="15"></line>
    <line x1="17" y1="15" x2="17.01" y2="15"></line>
  </svg>
);

export const CurrencyDollarIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 11.219 12.768 11 12 11c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const UserPlusIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <line x1="20" y1="8" x2="20" y2="14"></line>
    <line x1="17" y1="11" x2="23" y2="11"></line>
  </svg>
);

export const PlusCircleIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
);

export const ReceiptTextIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

export const ChartPieIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
  </svg>
);

export const ClockIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export const BellIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

// Icons for Criar Novo Pedido Page
export const ChatBubbleOvalLeftEllipsisIcon = ({ className = "w-5 h-5", strokeWidth = 1.5 }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-3.861 8.25-8.625 8.25C7.836 20.25 4.5 17.444 4.5 12.75c0-4.694 3.336-8.484 7.875-8.484h.75c4.764 0 8.625 3.79 8.625 8.484z" />
  </svg>
);

export const BuildingStorefrontIcon = ({ className = "w-5 h-5", strokeWidth = 1.5 }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0011.25 11.25H10.5V7.5h3V11.25a2.25 2.25 0 002.25 2.25H16.5v7.5A2.25 2.25 0 0018.75 21H21V7.5A2.25 2.25 0 0018.75 5.25h-2.519A4.5 4.5 0 0012 3a4.5 4.5 0 00-4.231 2.25H5.25A2.25 2.25 0 003 7.5V21h2.25A2.25 2.25 0 007.5 18.75V16.5h9V18.75A2.25 2.25 0 0018.75 21h-5.25zm0 0H10.5m3 0V16.5" />
  </svg>
);

export const CalendarDaysIcon = ({ className = "w-5 h-5", strokeWidth = 1.5 }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-3.75h.008v.008H12v-.008zm0 0H12m3 3.75h.008v.008H15v-.008zm0 0H15m-3-3.75h.008v.008H12v-.008zm0 0H12m-3 3.75h.008v.008H9v-.008zm0 0H9Z" />
  </svg>
);

export const ArchiveBoxIcon = ({ className = "w-5 h-5", strokeWidth = 1.5 }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    {/* Corrected SVG for ArchiveBoxIcon */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25H3m18 0c0-2.09-.946-3.988-2.475-5.162A6.014 6.014 0 0012 2.25c-1.804 0-3.43.78-4.525 2.088C6.06 5.425 4.875 7.163 4.875 9H3m18 0v10.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V8.25m15-3.375C16.5 4.005 14.25 3 12 3c-2.25 0-4.5 1.005-6 1.875m12 0c.621.437 1.242.973 1.769 1.525M6 4.875C6.519 4.322 7.14 3.886 7.769 3.45m4.462-.975c1.019-.488 2.186-.75 3.394-.75s2.375.262 3.394.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75h6" />
 </svg>
);

export const QuestionMarkCircleIcon = ({ className = "w-5 h-5", strokeWidth = 1.5 }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

export const PuzzlePieceIcon = ({ className = "w-5 h-5", strokeWidth = 1.5 }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3m-3 12h3m-10.5-6h18M9 2.25A2.25 2.25 0 0111.25 0h1.5A2.25 2.25 0 0115 2.25v1.5a2.25 2.25 0 01-2.25 2.25h-1.5A2.25 2.25 0 019 3.75v-1.5zM9 15.75A2.25 2.25 0 0111.25 13.5h1.5a2.25 2.25 0 012.25 2.25v1.5A2.25 2.25 0 0112.75 21h-1.5A2.25 2.25 0 019 18.75v-1.5zM2.25 9A2.25 2.25 0 000 11.25v1.5A2.25 2.25 0 002.25 15h1.5A2.25 2.25 0 006 12.75v-1.5A2.25 2.25 0 003.75 9h-1.5zM15.75 9A2.25 2.25 0 0013.5 11.25v1.5a2.25 2.25 0 002.25 2.25h1.5A2.25 2.25 0 0019.5 12.75v-1.5A2.25 2.25 0 0016.5 9h-1.5z" />
  </svg>
);

export const MinusIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export const CheckCircleSolidIcon = ({ className = "w-5 h-5", fill = "currentColor" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={fill} className={className}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export const BanknotesIcon = ({ className = "w-5 h-5", strokeWidth = 1.5 }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6A.75.75 0 012.25 5.25V4.5m0 A2.25 2.25 0 014.5 2.25h15A2.25 2.25 0 0121.75 4.5v9.75c0 .628-.507 1.135-1.135 1.135H4.885c-.628 0-1.135-.507-1.135-1.135V4.5zM4.5 12h15M4.5 15h15" />
  </svg>
);

export const MugHotIcon = ({ className = "w-5 h-5", strokeWidth = 1.5 }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6H8.25A2.25 2.25 0 006 8.25v7.5A2.25 2.25 0 008.25 18h7.5A2.25 2.25 0 0018 15.75V8.25A2.25 2.25 0 0015.75 6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 6V5.25A2.25 2.25 0 0015.75 3h-7.5A2.25 2.25 0 006 5.25V6m12 0H6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9.75v.008H6V9.75M9 21h6" />
 </svg>
);

export const CalendarIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export const CheckIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export const FunnelIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

export const ArrowPathIcon = ({ className = "w-5 h-5", strokeWidth = 1.5 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.994 0h4.992v4.992m0 0L19.015 15M2.985 19.644L6.166 16.46m12.858 0L19.015 15m0 0h-4.992m4.992 0l-3.181-3.182a8.25 8.25 0 00-11.667 0L2.985 15m4.992-4.652h-4.992m0 0V5.356M2.985 5.356L6.166 8.54m12.858 0L19.015 8.54m0 0v4.992m0 0h-4.992m4.992-4.993l-3.181 3.182a8.25 8.25 0 01-11.667 0L2.985 8.54m-2.984-2.984A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v13.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V5.25z" />
  </svg>
);

export const InformationCircleIcon = ({ className = "w-5 h-5", strokeWidth = 1.5, fill = "none" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);

export const XCircleIcon = ({ className = "w-5 h-5", strokeWidth = 1.5, fill = "none" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ArrowRightCircleIcon = ({ className = "w-6 h-6", strokeWidth = 1.5, fill = "none" }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ArrowTrendingUpIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

export const ArrowTrendingDownIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
    <polyline points="17 18 23 18 23 12"></polyline>
  </svg>
);

export const ScaleIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3L2 7l10 4 10-4-10-4z"></path>
    <path d="M2 7v10l10 4 10-4V7"></path>
    <path d="M12 22V11"></path>
    <path d="M6 10l-4 2"></path>
    <path d="M18 10l4 2"></path>
  </svg>
);

export const StarIcon = ({ className = "w-5 h-5", strokeWidth = 2, fill="none" }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} fill={fill}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

export const TableCellsIcon = ({ className = "w-5 h-5", strokeWidth = 2, fill="none" }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 3.375h17.25V7.5h-17.25V3.375z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 7.5h17.25v8.063H3.375V7.5zM3.375 15.563h17.25V20.25H3.375v-4.687z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.375v16.875M12 3.375v16.875m4.5-16.875v16.875" />
 </svg>
);

export const DotIcon = ({ className = "w-3 h-3", fill = "currentColor" }: IconProps): JSX.Element => (
  <svg viewBox="0 0 8 8" fill={fill} className={className}>
    <circle cx="4" cy="4" r="4" />
  </svg>
);

export const PrinterIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a8.954 8.954 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 14.471c-.386.198-.825.314-1.308.314h-5.204c-.483 0-.922-.116-1.308-.314M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25l.092-.006a21.338 21.338 0 015.816 0l.092.006M16.5 8.25L16.408 8.244a21.338 21.338 0 00-5.816 0L10.5 8.25m6-3.75h.008v.008H16.5V4.5zm-5.25 0h.008v.008H11.25V4.5z" />
  </svg>
);


export const DocumentArrowDownIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: IconProps): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
  </svg>
);