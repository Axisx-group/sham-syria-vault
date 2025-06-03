
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { CreditCard, Palette } from "lucide-react";
import CardsCarousel from './CardsCarousel';
import CardDesignOptions from './CardDesignOptions';
import CardPreview from './CardPreview';

interface CardsShowcaseProps {
  language: 'ar' | 'en';
}

const CardsShowcase: React.FC<CardsShowcaseProps> = ({ language }) => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [customName, setCustomName] = useState('YOUR NAME');
  const [customSignature, setCustomSignature] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageDisplayMode, setImageDisplayMode] = useState<'corner' | 'fullscreen'>('corner');
  const [isCustomizing, setIsCustomizing] = useState(false);

  const translations = {
    ar: {
      title: "اختر البطاقة المثالية لك",
      subtitle: "مجموعة متنوعة من البطاقات لتناسب جميع احتياجاتك المالية",
      designCard: "صمم بطاقتك",
      designSubtitle: "اجعل بطاقتك فريدة من نوعها"
    },
    en: {
      title: "Choose your perfect card",
      subtitle: "A diverse range of cards to suit all your financial needs",
      designCard: "Design Your Card",
      designSubtitle: "Make your card uniquely yours"
    }
  };

  const t = translations[language];

  const handleCustomize = () => {
    setIsCustomizing(!isCustomizing);
    console.log('Customize button clicked, isCustomizing:', !isCustomizing);
  };

  const handleColorSelect = (index: number) => {
    setSelectedColor(index);
    console.log('Color selected:', index);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value.toUpperCase() || 'YOUR NAME';
    setCustomName(newName);
    console.log('Name changed to:', newName);
  };

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomSignature(e.target.value);
    console.log('Signature changed to:', e.target.value);
  };

  const handleIconSelect = (iconName: string) => {
    setSelectedIcon(selectedIcon === iconName ? null : iconName);
    console.log('Icon selected:', iconName);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        console.log('Image uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDisplayModeChange = (mode: 'corner' | 'fullscreen') => {
    setImageDisplayMode(mode);
    console.log('Image display mode changed to:', mode);
  };

  const handlePreview = () => {
    console.log('Preview card with:', {
      color: selectedColor,
      name: customName,
      signature: customSignature,
      icon: selectedIcon,
      hasImage: !!uploadedImage,
      imageMode: imageDisplayMode
    });
  };

  return (
    <section className="py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border-purple-200 shadow-lg">
            <CreditCard className="w-4 h-4 mr-2" />
            البطاقات المصرفية
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Cards Carousel */}
        <CardsCarousel 
          language={language}
          selectedCard={selectedCard}
          onCardSelect={setSelectedCard}
        />

        {/* Design Your Card Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-6 py-2 text-sm bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border-indigo-200">
              <Palette className="w-4 h-4 mr-2" />
              {t.designCard}
            </Badge>
            <h3 className="text-4xl font-bold text-gray-900 mb-4">{t.designCard}</h3>
            <p className="text-xl text-gray-600">{t.designSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Design Options */}
            <CardDesignOptions
              language={language}
              selectedColor={selectedColor}
              customName={customName}
              customSignature={customSignature}
              selectedIcon={selectedIcon}
              uploadedImage={uploadedImage}
              imageDisplayMode={imageDisplayMode}
              onColorSelect={handleColorSelect}
              onNameChange={handleNameChange}
              onSignatureChange={handleSignatureChange}
              onIconSelect={handleIconSelect}
              onImageUpload={handleImageUpload}
              onImageDisplayModeChange={handleImageDisplayModeChange}
              onCustomize={handleCustomize}
              onPreview={handlePreview}
            />

            {/* Card Preview */}
            <CardPreview
              selectedColor={selectedColor}
              customName={customName}
              customSignature={customSignature}
              selectedIcon={selectedIcon}
              uploadedImage={uploadedImage}
              imageDisplayMode={imageDisplayMode}
              isCustomizing={isCustomizing}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardsShowcase;
