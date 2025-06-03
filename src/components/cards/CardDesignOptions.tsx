
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, User, Type, Upload, Signature, Star, Palette } from "lucide-react";
import { Circle, Car, Send } from "lucide-react";

interface CardDesignOptionsProps {
  language: 'ar' | 'en';
  selectedColor: number;
  customName: string;
  customSignature: string;
  selectedIcon: string | null;
  uploadedImage: string | null;
  onColorSelect: (index: number) => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSignatureChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconSelect: (iconName: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCustomize: () => void;
  onPreview: () => void;
}

const CardDesignOptions: React.FC<CardDesignOptionsProps> = ({
  language,
  selectedColor,
  customName,
  customSignature,
  selectedIcon,
  uploadedImage,
  onColorSelect,
  onNameChange,
  onSignatureChange,
  onIconSelect,
  onImageUpload,
  onCustomize,
  onPreview
}) => {
  const translations = {
    ar: {
      designCard: "صمم بطاقتك",
      designSubtitle: "اجعل بطاقتك فريدة من نوعها",
      chooseColor: "اختر اللون",
      addName: "أضف الاسم",
      addSignature: "أضف التوقيع",
      addIcon: "أضف أيقونة",
      addImage: "أضف صورة",
      preview: "معاينة",
      cardHolderName: "اسم حامل البطاقة",
      signature: "التوقيع",
      enterName: "ادخل اسمك",
      enterSignature: "ادخل توقيعك",
      customize: "تخصيص التصميم"
    },
    en: {
      designCard: "Design Your Card",
      designSubtitle: "Make your card uniquely yours",
      chooseColor: "Choose Color",
      addName: "Add Name",
      addSignature: "Add Signature",
      addIcon: "Add Icon",
      addImage: "Add Image",
      preview: "Preview",
      cardHolderName: "Card Holder Name",
      signature: "Signature",
      enterName: "Enter your name",
      enterSignature: "Enter your signature",
      customize: "Customize Design"
    }
  };

  const t = translations[language];

  const designColors = [
    { name: "Midnight", gradient: "from-slate-900 to-black", bgClass: "bg-gradient-to-br from-slate-900 to-black" },
    { name: "Ocean", gradient: "from-blue-600 to-cyan-500", bgClass: "bg-gradient-to-br from-blue-600 to-cyan-500" },
    { name: "Sunset", gradient: "from-orange-500 to-pink-500", bgClass: "bg-gradient-to-br from-orange-500 to-pink-500" },
    { name: "Forest", gradient: "from-green-600 to-teal-500", bgClass: "bg-gradient-to-br from-green-600 to-teal-500" },
    { name: "Aurora", gradient: "from-purple-600 to-indigo-500", bgClass: "bg-gradient-to-br from-purple-600 to-indigo-500" },
    { name: "Rose Gold", gradient: "from-pink-400 to-orange-400", bgClass: "bg-gradient-to-br from-pink-400 to-orange-400" }
  ];

  const iconOptions = [
    { name: 'circle', icon: Circle, label: 'دائرة / Circle' },
    { name: 'car', icon: Car, label: 'سيارة / Car' },
    { name: 'send', icon: Send, label: 'طائرة / Plane' }
  ];

  return (
    <div className="space-y-8">
      {/* Color Selection */}
      <div>
        <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
          {t.chooseColor}
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {designColors.map((color, index) => (
            <button
              key={index}
              onClick={() => onColorSelect(index)}
              className={`w-full h-20 ${color.bgClass} rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-4 ${
                selectedColor === index ? 'border-purple-500 ring-4 ring-purple-200' : 'border-transparent hover:border-white'
              }`}
            >
              <span className="text-white text-sm font-medium opacity-0 hover:opacity-100 transition-opacity">
                {color.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Name Input */}
      <div>
        <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-purple-600" />
          {t.cardHolderName}
        </h4>
        <div className="relative">
          <input
            type="text"
            placeholder={t.enterName}
            value={customName === 'YOUR NAME' ? '' : customName}
            onChange={onNameChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg font-medium uppercase tracking-wider"
            maxLength={26}
          />
          <Type className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Signature Input */}
      <div>
        <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Signature className="w-5 h-5 mr-2 text-purple-600" />
          {t.addSignature}
        </h4>
        <div className="relative">
          <input
            type="text"
            placeholder={t.enterSignature}
            value={customSignature}
            onChange={onSignatureChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg italic"
            maxLength={20}
          />
          <Signature className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Icon Selection */}
      <div>
        <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-purple-600" />
          {t.addIcon}
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {iconOptions.map((iconOption) => {
            const IconComponent = iconOption.icon;
            return (
              <button
                key={iconOption.name}
                onClick={() => onIconSelect(iconOption.name)}
                className={`w-full h-16 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                  selectedIcon === iconOption.name 
                    ? 'border-purple-500 bg-purple-50 text-purple-600' 
                    : 'border-gray-200 hover:border-purple-300 text-gray-600'
                }`}
              >
                <IconComponent className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{iconOption.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Upload className="w-5 h-5 mr-2 text-purple-600" />
          {t.addImage}
        </h4>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-300"
          >
            {uploadedImage ? (
              <img src={uploadedImage} alt="Uploaded" className="w-20 h-20 object-cover rounded-lg" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-gray-600">اضغط لرفع صورة</span>
              </>
            )}
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <Button 
          onClick={onCustomize}
          className="w-full py-4 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <Palette className="w-5 h-5 mr-2" />
          {t.customize}
        </Button>
        <Button 
          onClick={onPreview}
          variant="outline" 
          className="w-full py-4 text-lg border-2 border-gray-200 hover:border-purple-300 text-gray-700 rounded-xl"
        >
          {t.preview}
        </Button>
      </div>
    </div>
  );
};

export default CardDesignOptions;
