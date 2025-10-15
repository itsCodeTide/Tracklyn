import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, GoogleIcon, PhoneIcon } from './icons';

interface LoginScreenProps {
  onSwitchToSignUp: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm animate-fadeIn">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-orbitron text-cyan-400 mb-2 tracking-widest">
          TRACKLYN
        </h1>
        <p className="text-slate-300">Welcome Back, Gamer!</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
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
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 text-slate-400 cursor-pointer">
            <input type="checkbox" className="rounded bg-slate-700 border-slate-600 text-cyan-500 focus:ring-cyan-500" />
            <span>Remember Me</span>
          </label>
          <a href="#" className="font-medium text-cyan-400 hover:text-cyan-300">Forgot Password?</a>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
        >
          Login
        </button>
      </form>
      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-600"></div>
        </div>
        <div className="relative inline-block px-2 bg-slate-800 text-slate-400 text-sm">OR</div>
      </div>
      <div className="space-y-4">
        <button className="w-full flex items-center justify-center space-x-2 bg-white text-slate-800 font-medium py-3 rounded-lg hover:bg-slate-200 transition">
          <GoogleIcon className="w-6 h-6" />
          <span>Login with Google</span>
        </button>
        <button className="w-full flex items-center justify-center space-x-2 border border-blue-500 text-blue-400 font-medium py-3 rounded-lg hover:bg-blue-500/10 transition">
          <PhoneIcon className="w-5 h-5" />
          <span>Login with Phone OTP</span>
        </button>
      </div>
      <p className="text-center text-sm text-slate-400 mt-8">
        New here?{' '}
        <button onClick={onSwitchToSignUp} className="font-medium text-cyan-400 hover:text-cyan-300">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginScreen;
