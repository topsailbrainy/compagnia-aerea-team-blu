import React from 'react';
import { Outlet } from 'react-router';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

const AdminLayout: React.FC = () => {
  return (
    <div className="bg-background text-on-background min-h-screen flex text-left font-body">
      <AdminSidebar />
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        <AdminTopbar />
        <main className="flex-1 p-8 text-left">
          <Outlet />
        </main>
        {/* Contextual Help FAB */}
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-secondary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            help
          </span>
        </button>
      </div>
    </div>
  );
};

export default AdminLayout;
