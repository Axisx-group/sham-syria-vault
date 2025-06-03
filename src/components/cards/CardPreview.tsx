
import React from 'react';
import { Circle, Car, Send } from "lucide-react";

interface CardPreviewProps {
  selectedColor: number;
  customName: string;
  customSignature: string;
  selectedIcon: string | null;
  uploadedImage: string | null;
  isCustomizing: boolean;
}

const CardPreview: React.FC<CardPreviewProps> = ({
  selectedColor,
  customName,
  customSignature,
  selectedIcon,
  uploadedImage,
  isCustomizing
}) => {
  const designColors = [
    { name: "Midnight", gradient: "from-slate-900 to-black" },
    { name: "Ocean", gradient: "from-blue-600 to-cyan-500" },
    { name: "Sunset", gradient: "from-orange-500 to-pink-500" },
    { name: "Forest", gradient: "from-green-600 to-teal-500" },
    { name: "Aurora", gradient: "from-purple-600 to-indigo-500" },
    { name: "Rose Gold", gradient: "from-pink-400 to-orange-400" }
  ];

  const iconOptions = [
    { name: 'circle', icon: Circle },
    { name: 'car', icon: Car },
    { name: 'send', icon: Send }
  ];

  return (
    <div className="relative">
      <div 
        className={`relative w-full bg-gradient-to-br ${designColors[selectedColor].gradient} rounded-2xl shadow-2xl text-white overflow-hidden transform ${isCustomizing ? 'rotate-3 scale-105' : 'rotate-6'} hover:rotate-3 transition-all duration-500`}
        style={{
          aspectRatio: '1.586/1',
          width: '100%',
          maxWidth: '400px',
          height: '252px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Card effects */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 animate-shimmer"></div>
        
        <div className="relative z-10 h-full p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium tracking-wider opacity-90">SYRIA VAULT</div>
            <div className="text-2xl font-bold italic">VISA</div>
          </div>

          <div className="w-12 h-9 bg-gradient-to-br from-yellow-200 via-yellow-300 to-amber-400 rounded-lg shadow-lg relative self-start">
            <div className="absolute inset-0.5 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-md">
              <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-md border border-yellow-300">
                <div className="grid grid-cols-3 gap-0.5 p-1 h-full">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="bg-yellow-400 rounded-sm opacity-60"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="font-mono text-xl tracking-widest font-light">
            **** **** **** 1234
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs opacity-70 tracking-widest mb-1">CARD HOLDER</div>
              <div className="font-semibold tracking-wide text-lg">{customName}</div>
              {customSignature && (
                <div className="italic text-sm mt-1 opacity-80">{customSignature}</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-xs opacity-70 tracking-widest mb-1">EXPIRES</div>
              <div className="font-semibold">12/28</div>
            </div>
          </div>

          {/* Icon Display */}
          {selectedIcon && (
            <div className="absolute top-6 right-6">
              {(() => {
                const IconComponent = iconOptions.find(opt => opt.name === selectedIcon)?.icon;
                return IconComponent ? <IconComponent className="w-6 h-6 text-white/80" /> : null;
              })()}
            </div>
          )}

          {/* Image Display */}
          {uploadedImage && (
            <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
              <img src={uploadedImage} alt="Custom" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="absolute top-6 right-20">
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 border-2 border-white/40 rounded-full"></div>
              <div className="absolute inset-1 border-2 border-white/60 rounded-full"></div>
              <div className="absolute inset-2 border-2 border-white/80 rounded-full"></div>
            </div>
          </div>

          <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-medium tracking-wider">CUSTOM DESIGN</span>
          </div>
        </div>

        <div className="absolute inset-0 rounded-2xl border border-white/20"></div>
      </div>
    </div>
  );
};

export default CardPreview;
