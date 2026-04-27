import React from 'react';

const AdminCreateUser: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Title */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight text-on-surface mb-2">
            Crea Nuovo Utente
          </h1>
          <p className="text-on-surface-variant font-body text-left">
            Aggiungi un nuovo profilo passeggero o amministratore alla rete Ghoan.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal Info */}
        <section className="lg:col-span-2 bg-surface-container-lowest rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              person_add
            </span>
            <h2 className="text-2xl font-bold text-on-surface">Dati Anagrafici</h2>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-outline">
                Full Name
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary-container transition-all font-body text-sm"
                  placeholder="e.g. Mario Rossi"
                  type="text"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-outline">
                Email Address
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary-container transition-all font-body text-sm"
                  placeholder="mario.rossi@example.com"
                  type="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-outline">
                Date of Birth
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary-container transition-all font-body text-sm"
                  type="date"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-outline">
                Codice Fiscale
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary-container transition-all font-body text-sm"
                  placeholder="RSSMRA80A01H501U"
                  type="text"
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-outline">
                Passport / ID Number
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary-container transition-all font-body text-sm"
                  placeholder="AA0000000"
                  type="text"
                />
              </div>
            </div>
          </form>
        </section>

        {/* Right Column: Subscription & Actions */}
        <div className="space-y-8">
          {/* Subscription Card */}
          <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-secondary">loyalty</span>
              <h3 className="text-xl font-bold text-on-surface">Abbonamento</h3>
            </div>
            <div className="space-y-4">
              <label className="block cursor-pointer">
                <input
                  defaultChecked
                  className="hidden peer"
                  name="subscription"
                  type="radio"
                  value="basic"
                />
                <div className="p-4 border-2 border-surface-container-low rounded-xl peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold text-on-surface text-sm">Basic</p>
                    <div className="w-4 h-4 rounded-full border border-outline-variant peer-checked:bg-primary flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-[10px] text-outline text-left">Standard fleet access</p>
                </div>
              </label>
              <label className="block cursor-pointer">
                <input className="hidden peer" name="subscription" type="radio" value="sayan" />
                <div className="p-4 border-2 border-surface-container-low rounded-xl peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-on-surface text-sm">Sayan Class</p>
                      <span
                        className="material-symbols-outlined text-secondary text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    </div>
                    <div className="w-4 h-4 rounded-full border border-outline-variant flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-[10px] text-outline text-left">Premium lounge & priority</p>
                </div>
              </label>
              <div className="pt-6 mt-6 border-t border-outline-variant/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-xs text-left">Admin Permissions</p>
                    <p className="text-[10px] text-outline text-left">Enable panel access</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input className="sr-only peer" type="checkbox" />
                    <div className="w-9 h-5 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="space-y-4">
            <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dim transition-all shadow-lg shadow-primary/20 active:scale-95">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                save
              </span>
              Salva Utente
            </button>
            <button className="w-full py-2 text-outline font-bold text-sm hover:text-on-surface transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">close</span>
              Annulla
            </button>
          </div>

          {/* Info Card */}
          <div className="bg-primary rounded-2xl p-6 relative overflow-hidden text-on-primary">
            <img
              alt="Visual accent"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSiTSvhW_xJgqwCHezfu9MkV5m4NBkMD0KV4VbxhdXy89OoBm3COUDBj-MCHUF1ItJCXy_hTsqIlAnD6-CP_vHnHMau0NZcS6o4r84mEAnLaIV7zpu65tt97A9sFABWbEt8UCT3AomTByz60cVwTsPL30T-5H2wF2xzwMsRAAt31XXebpQ9emLHshm8ctlm1JUwpAK-4PwAP_9xjlyFaIUQtWBxUMjqkudZo5WjmIQ5VZbZFeu0GE3UEdIpwOj6huMstgpDVDVE-fM"
            />
            <div className="relative z-10 text-left">
              <p className="text-[10px] font-black uppercase tracking-widest mb-2">
                Fleet Intelligence
              </p>
              <p className="text-xs leading-relaxed opacity-90">
                Adding a user to the Ghoan network automatically synchronizes their flight history
                across the global fleet nodes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateUser;
