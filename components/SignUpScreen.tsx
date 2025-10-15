import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserIcon, EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from './icons';

interface SignUpScreenProps {
  onSwitchToLogin: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSwitchToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    signup(fullName, email, password);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm animate-fadeIn">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-orbitron text-cyan-400 mb-2 tracking-widest">
          JOIN US
        </h1>
        <p className="text-slate-300">Create Your Gamer Account</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
          />
        </div>
        <div className="relative">
          <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
          />
        </div>
        <div className="relative">
          <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 pl-10 pr-10 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
          >
            {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        </div>
        <div className="relative">
          <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 pl-10 pr-10 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
          />
           <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
          >
            {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        </div>
        <div className="text-sm">
          <label className="flex items-start space-x-2 text-slate-400 cursor-pointer">
            <input type="checkbox" required className="mt-1 rounded bg-slate-700 border-slate-600 text-cyan-500 focus:ring-cyan-500" />
            <span>I agree to the <a href="#" className="font-medium text-cyan-400 hover:text-cyan-300">Terms & Conditions</a></span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center text-sm text-slate-400 mt-8">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="font-medium text-cyan-400 hover:text-cyan-300">
          Login
        </button>
      </p>
    </div>
  );
};

export default SignUpScreen;
