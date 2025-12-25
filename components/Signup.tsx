
import React, { useState } from 'react';

interface SignupProps {
  onSignup: (user: any) => void;
  onNavigate: (page: 'home' | 'login' | 'signup') => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    university: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock signup
    onSignup({ name: formData.name, email: formData.email });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <div className="text-center mb-8">
          <div className="inline-flex bg-indigo-600 text-white p-3 rounded-xl mb-4">
            <i className="fas fa-user-plus text-2xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
          <p className="text-slate-500 mt-2">Join the student maker community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              required
              type="text"
              placeholder="John Doe"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">University Email</label>
            <input
              required
              type="email"
              placeholder="student@university.edu"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">University Name</label>
            <input
              required
              type="text"
              placeholder="State University"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.university}
              onChange={(e) => setFormData({...formData, university: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            By signing up, you agree to our <a href="#" className="text-indigo-600 underline">Terms</a> and <a href="#" className="text-indigo-600 underline">Privacy Policy</a>.
          </p>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-indigo-100"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-600">
            Already have an account?{' '}
            <button 
              onClick={() => onNavigate('login')}
              className="text-indigo-600 font-bold hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
