
import React from 'react';

interface NavbarProps {
  user: any | null;
  onSearch: (query: string) => void;
  onOpenSell: () => void;
  onNavigate: (page: 'home' | 'login' | 'signup') => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onSearch, onOpenSell, onNavigate, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="bg-indigo-600 text-white p-2 rounded-lg">
            <i className="fas fa-microchip text-xl"></i>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">EduSwap <span className="text-indigo-600">Electronics</span></span>
        </div>

        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search parts..."
            className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm"
            onChange={(e) => onSearch(e.target.value)}
          />
          <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {user ? (
            <>
              <button 
                onClick={onOpenSell}
                className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-full transition-all text-sm flex items-center justify-center gap-2"
              >
                <i className="fas fa-plus"></i>
                Sell
              </button>
              <div className="flex items-center gap-3 ml-2 border-l border-slate-200 pl-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 leading-none">{user.name}</p>
                  <button onClick={onLogout} className="text-[10px] text-slate-500 hover:text-red-500 font-semibold uppercase tracking-wider">Logout</button>
                </div>
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button 
                onClick={() => onNavigate('login')}
                className="flex-1 md:flex-none text-slate-600 hover:text-indigo-600 font-semibold px-4 py-2 transition-colors text-sm"
              >
                Login
              </button>
              <button 
                onClick={() => onNavigate('signup')}
                className="flex-1 md:flex-none bg-slate-900 hover:bg-black text-white font-semibold px-5 py-2 rounded-full transition-all text-sm"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
