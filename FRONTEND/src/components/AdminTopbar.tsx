import React from 'react';

const AdminTopbar: React.FC = () => {
  return (
    <header className="h-16 bg-[#f6f6f6] flex justify-between items-center px-6 w-full sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-2xl">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest rounded-xl border-none ring-0 focus:ring-2 focus:ring-primary-container transition-all text-sm font-body"
            placeholder="Search users, IDs or operations..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center">
        <button className="material-symbols-outlined text-[#8137b1] hover:bg-[#f0f1f1] p-2 rounded-full transition-colors scale-95 duration-150">
          notifications
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
