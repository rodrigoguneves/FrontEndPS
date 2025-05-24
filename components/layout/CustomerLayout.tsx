import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerHeader from './CustomerHeader';
import Footer from './Footer'; // Assuming Footer can be reused
import CustomerBottomNav from './CustomerBottomNav';

const CustomerLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8 pb-24 md:pb-8"> {/* Added padding-bottom for mobile nav */}
        <Outlet />
      </main>
      <CustomerBottomNav /> {/* Render bottom nav for mobile */}
      <div className="hidden md:block"> {/* Footer only for desktop, or adjust as needed */}
        <Footer />
      </div>
    </div>
  );
};

export default CustomerLayout;
