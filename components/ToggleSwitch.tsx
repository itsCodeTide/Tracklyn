import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, label }) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={checked} onChange={handleToggle} />
        <div className={`block w-14 h-8 rounded-full transition ${checked ? 'bg-cyan-500' : 'bg-slate-600'}`}></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${
            checked ? 'translate-x-6' : 'translate-x-0'
          }`}
        ></div>
      </div>
      {label && <div className="ml-3 text-slate-300 font-medium">{label}</div>}
    </label>
  );
};

export default ToggleSwitch;
