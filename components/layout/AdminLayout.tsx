
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import Footer from './Footer';

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
