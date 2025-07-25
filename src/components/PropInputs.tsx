import React from 'react';
import { BackgroundProp } from '../types/BackgroundTypes';

interface PropInputProps {
  prop: BackgroundProp;
  value: any;
  onChange: (value: any) => void;
}

export const ColorInput: React.FC<PropInputProps> = ({ prop, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {prop.prop.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || prop.defaultValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
        />
        <input
          type="text"
          value={value || prop.defaultValue}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="#000000"
        />
      </div>
    </div>
  );
};

export const NumberInput: React.FC<PropInputProps> = ({ prop, value, onChange }) => {
  const currentValue = value !== undefined ? value : prop.defaultValue;
  
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {prop.prop.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
        <span className="text-gray-500 text-xs ml-2">
          ({prop.min} - {prop.max})
        </span>
      </label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={prop.min}
          max={prop.max}
          step={(prop.max! - prop.min!) / 100}
          value={currentValue}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="flex-1"
        />
        <input
          type="number"
          min={prop.min}
          max={prop.max}
          step={(prop.max! - prop.min!) / 100}
          value={currentValue}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
    </div>
  );
};

export const BooleanInput: React.FC<PropInputProps> = ({ prop, value, onChange }) => {
  const currentValue = value !== undefined ? value : prop.defaultValue;
  
  return (
    <div className="mb-4">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={currentValue}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="text-sm font-medium text-gray-700">
          {prop.prop.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
        </span>
      </label>
    </div>
  );
};

export const PropInput: React.FC<PropInputProps> = ({ prop, value, onChange }) => {
  switch (prop.type) {
    case 'color':
      return <ColorInput prop={prop} value={value} onChange={onChange} />;
    case 'number':
      return <NumberInput prop={prop} value={value} onChange={onChange} />;
    case 'boolean':
      return <BooleanInput prop={prop} value={value} onChange={onChange} />;
    default:
      return null;
  }
};
