import React from 'react';
import { Link, NavLink } from 'react-router';

const AdminSidebar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#f6f6f6] dark:bg-[#121212] shadow-xl dark:shadow-none flex flex-col p-4 space-y-2 z-50">
      <div className="flex items-center gap-3 px-2 mb-6 pb-6 border-b border-outline-variant/10">
        <img
          alt="Admin Profile Avatar"
          className="w-10 h-10 rounded-full border-2 border-primary-container"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCBEPlkCSMWyq0kXBMGOKJQXylVF7oJl5cNz4WZrqu4MPNP2FFweTVdXauMT933bJZ_cTrQI0j1NYm9pRkwJ_YpeGZ6LsUUbg1RV9wtYcV5dhBQvIoJXsLvFxyvMB7ZFJTa0P4OuL0lSvPmGPjiG6zeC5_oWQ7ap2LIR-jU2HVNibMQB179QbilBF555RMjz7XX-DmGNcbkgEqChE74kFCnNVdlYACVWrztZGfJbh6MZeAXJ8INtfTmf0qJrmxlPHvFScrnVAocwYY"
        />
        <div>
          <p className="text-sm font-bold text-on-surface leading-none text-left">Admin Ghoan</p>
          <p className="text-[10px] text-outline font-medium text-left">System Manager</p>
        </div>
      </div>
      <nav className="space-y-1 flex-1">
        <NavLink
          to="/admin/news"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 font-['Plus_Jakarta_Sans'] text-sm transition-all rounded-lg ${
              isActive ? 'bg-[#8137b1] text-white shadow-lg shadow-[#8137b1]/20' : 'text-[#767777] hover:text-[#8137b1] hover:translate-x-1'
            }`
          }
        >
          <span className="material-symbols-outlined">newspaper</span> Notizie
        </NavLink>
        <NavLink
          to="/admin/users/create"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 font-['Plus_Jakarta_Sans'] text-sm transition-all rounded-lg ${
              isActive ? 'bg-[#8137b1] text-white shadow-lg shadow-[#8137b1]/20' : 'text-[#767777] hover:text-[#8137b1] hover:translate-x-1'
            }`
          }
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            group
          </span>{' '}
          Utenti
        </NavLink>
        <Link
          className="flex items-center gap-3 px-4 py-3 text-[#767777] font-['Plus_Jakarta_Sans'] text-sm hover:text-[#8137b1] hover:translate-x-1 transition-all rounded-lg"
          to="#"
        >
          <span className="material-symbols-outlined">map</span> Tratte
        </Link>
        <Link
          className="flex items-center gap-3 px-4 py-3 text-[#767777] font-['Plus_Jakarta_Sans'] text-sm hover:text-[#8137b1] hover:translate-x-1 transition-all rounded-lg"
          to="#"
        >
          <span className="material-symbols-outlined">confirmation_number</span> Biglietti
        </Link>
        <Link
          className="flex items-center gap-3 px-4 py-3 text-[#767777] font-['Plus_Jakarta_Sans'] text-sm hover:text-[#8137b1] hover:translate-x-1 transition-all rounded-lg"
          to="#"
        >
          <span className="material-symbols-outlined">loyalty</span> Abbonamenti
        </Link>
        <Link
          className="flex items-center gap-3 px-4 py-3 text-[#767777] font-['Plus_Jakarta_Sans'] text-sm hover:text-[#8137b1] hover:translate-x-1 transition-all rounded-lg"
          to="#"
        >
          <span className="material-symbols-outlined">flight_takeoff</span> Voli
        </Link>
        <Link
          className="flex items-center gap-3 px-4 py-3 text-[#767777] font-['Plus_Jakarta_Sans'] text-sm hover:text-[#8137b1] hover:translate-x-1 transition-all rounded-lg"
          to="#"
        >
          <span className="material-symbols-outlined">connecting_airports</span> Aeroporti
        </Link>
        <Link
          className="flex items-center gap-3 px-4 py-3 text-[#767777] font-['Plus_Jakarta_Sans'] text-sm hover:text-[#8137b1] hover:translate-x-1 transition-all rounded-lg"
          to="#"
        >
          <span className="material-symbols-outlined">person_pin</span> Piloti
        </Link>
        <Link
          className="flex items-center gap-3 px-4 py-3 text-[#767777] font-['Plus_Jakarta_Sans'] text-sm hover:text-[#8137b1] hover:translate-x-1 transition-all rounded-lg"
          to="#"
        >
          <span className="material-symbols-outlined">gate</span> Gates
        </Link>
      </nav>
      <div className="mt-auto p-4 bg-surface-container rounded-xl">
        <img
          alt="Mascot"
          className="w-full h-32 object-cover rounded-lg mb-2"
          src="https://lh3.googleusercontent.com/aida/ADBb0uhWFvxVjUITepy0i7ZVE1_kzjvimUYKWpOib-yu_bDp6XVkk3z3IRfpZe3Yd4ZYFsMzdrfquIDx3TgaNtgQGHnIpTNYtJJNTakQctc-lXK0zpVrsvlLe758vTXQ-dh2foE71TfSuP8rhDGDwu1mSprGl9_wyjyIwSAAEKFuB1eb4TB3Um3wlNkBjdwpdSZ8xeCZ0YdF3ICO1E8WPDxxtkiNyV-WVIY9-afTvnydxSOIo9rMPdLkxhnvWPMqmpopmuMIuQ_SdL0DlQ"
        />
        <p className="text-[10px] text-on-surface-variant text-center italic">cazzo guardi?</p>
      </div>
    </aside>
  );
};

export default AdminSidebar;
