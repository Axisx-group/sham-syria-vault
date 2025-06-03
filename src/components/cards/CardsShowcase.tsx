import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Award, Star, CreditCard, Palette, Sparkles, User, Type, Upload, Signature } from "lucide-react";
import { Circle, Car, Send } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const [isCustomizing, setIsCustomizing] = useState(false);

  const translations = {
    ar: {
      title: "اختر البطاقة المثالية لك",
      subtitle: "مجموعة متنوعة من البطاقات لتناسب جميع احتياجاتك المالية",
      designCard: "صمم بطاقتك",
      designSubtitle: "اجعل بطاقتك فريدة من نوعها",
      platinum: "بلاتينية إليت",
      gold: "ذهبية برستيج", 
      classic: "كلاسيكية سمارت",
      platinumDesc: "للعملاء المميزين الذين يسعون للرفاهية المطلقة",
      goldDesc: "توازن مثالي بين المزايا والقيمة",
      classicDesc: "بداية مثالية لرحلتك المصرفية",
      orderNow: "اطلب الآن",
      customize: "تخصيص التصميم",
      chooseColor: "اختر اللون",
      addName: "أضف الاسم",
      addSignature: "أضف التوقيع",
      addIcon: "أضف أيقونة",
      addImage: "أضف صورة",
      preview: "معاينة",
      cardHolderName: "اسم حامل البطاقة",
      signature: "التوقيع",
      enterName: "ادخل اسمك",
      enterSignature: "ادخل توقيعك"
    },
    en: {
      title: "Choose your perfect card",
      subtitle: "A diverse range of cards to suit all your financial needs",
      designCard: "Design Your Card",
      designSubtitle: "Make your card uniquely yours",
      platinum: "Platinum Elite",
      gold: "Gold Prestige",
      classic: "Classic Smart", 
      platinumDesc: "For distinguished customers seeking absolute luxury",
      goldDesc: "Perfect balance between benefits and value",
      classicDesc: "Perfect start to your banking journey",
      orderNow: "Order Now",
      customize: "Customize Design",
      chooseColor: "Choose Color",
      addName: "Add Name",
      addSignature: "Add Signature",
      addIcon: "Add Icon",
      addImage: "Add Image",
      preview: "Preview",
      cardHolderName: "Card Holder Name",
      signature: "Signature",
      enterName: "Enter your name",
      enterSignature: "Enter your signature"
    }
  };

  const t = translations[language];

  const cards = [
    {
      name: t.platinum,
      description: t.platinumDesc,
      gradient: "from-slate-900 via-gray-900 to-black",
      accentGradient: "from-purple-400 via-pink-400 to-purple-600",
      icon: Crown,
      tier: "PLATINUM ELITE",
      number: "5432 **** **** 1234",
      holder: "AHMED HASSAN",
      expiry: "12/28",
      price: "$500/year"
    },
    {
      name: t.gold,
      description: t.goldDesc,
      gradient: "from-yellow-400 via-amber-500 to-orange-500",
      accentGradient: "from-yellow-300 via-orange-400 to-red-500",
      icon: Award,
      tier: "GOLD PRESTIGE",
      number: "4567 **** **** 8901",
      holder: "SARA AHMED",
      expiry: "08/27",
      price: "$200/year"
    },
    {
      name: t.classic,
      description: t.classicDesc,
      gradient: "from-blue-500 via-indigo-600 to-purple-700",
      accentGradient: "from-blue-400 via-cyan-500 to-indigo-600",
      icon: Star,
      tier: "CLASSIC SMART",
      number: "6789 **** **** 2345",
      holder: "OMAR HASSAN", 
      expiry: "03/29",
      price: "Free"
    }
  ];

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

  const handleCustomize = () => {
    setIsCustomizing(!isCustomizing);
    console.log('Customize button clicked, isCustomizing:', !isCustomizing);
  };

  const handleColorSelect = (index: number) => {
    setSelectedColor(index);
    console.log('Color selected:', designColors[index].name);
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

  const handlePreview = () => {
    console.log('Preview card with:', {
      color: designColors[selectedColor].name,
      name: customName,
      signature: customSignature,
      icon: selectedIcon,
      hasImage: !!uploadedImage
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

        {/* Realistic Cards Carousel */}
        <div className="max-w-7xl mx-auto mb-20">
          <Carousel className="w-full">
            <CarouselContent>
              {cards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="group cursor-pointer p-4">
                      {/* Realistic 3D Card - البطاقة الواقعية */}
                      <div 
                        className={`relative w-full bg-gradient-to-br ${card.gradient} rounded-2xl shadow-2xl text-white overflow-hidden transform transition-all duration-700 hover:scale-105 hover:rotate-1 hover:shadow-3xl group-hover:-translate-y-4 mb-6 card-realistic`}
                        onClick={() => setSelectedCard(index)}
                        style={{
                          aspectRatio: '1.586/1', // البعد الصحيح للبطاقة المصرفية
                          width: '100%',
                          maxWidth: '360px',
                          height: '227px',
                          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        {/* Card shine and holographic effects */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                        {/* Card Content */}
                        <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                          {/* Top Row - Syria Vault & VISA */}
                          <div className="flex justify-between items-center">
                            <div className="text-sm font-medium tracking-wider opacity-90">SYRIA VAULT</div>
                            <div className="text-2xl font-bold italic tracking-wider">VISA</div>
                          </div>

                          {/* Chip - رقاقة البطاقة */}
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

                          {/* Card Number */}
                          <div className="font-mono text-xl tracking-widest font-light">
                            {card.number}
                          </div>

                          {/* Bottom Row */}
                          <div className="flex justify-between items-end">
                            <div>
                              <div className="text-xs opacity-70 tracking-widest mb-1">CARD HOLDER</div>
                              <div className="font-semibold tracking-wide">{card.holder}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs opacity-70 tracking-widest mb-1">EXPIRES</div>
                              <div className="font-semibold">{card.expiry}</div>
                            </div>
                          </div>

                          {/* Contactless symbol */}
                          <div className="absolute top-6 right-20">
                            <div className="relative w-6 h-6">
                              <div className="absolute inset-0 border-2 border-white/40 rounded-full"></div>
                              <div className="absolute inset-1 border-2 border-white/60 rounded-full"></div>
                              <div className="absolute inset-2 border-2 border-white/80 rounded-full"></div>
                            </div>
                          </div>

                          {/* Card tier badge */}
                          <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            <span className="text-xs font-medium tracking-wider">{card.tier}</span>
                          </div>
                        </div>

                        {/* Card edge lighting */}
                        <div className="absolute inset-0 rounded-2xl border border-white/20"></div>
                      </div>

                      {/* Card Info */}
                      <div className="bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-500 group-hover:shadow-2xl">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-bold text-gray-900">{card.name}</h3>
                          <span className="text-lg font-semibold text-gray-600">{card.price}</span>
                        </div>
                        <p className="text-gray-600 mb-6">{card.description}</p>
                        <button className={`w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r ${card.accentGradient} hover:shadow-lg transform hover:scale-105 transition-all duration-300`}>
                          {t.orderNow}
                        </button>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Design Your Card Section - قسم تصميم البطاقة */}
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
                      onClick={() => handleColorSelect(index)}
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
                    onChange={handleNameChange}
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
                    onChange={handleSignatureChange}
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
                        onClick={() => handleIconSelect(iconOption.name)}
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
                    onChange={handleImageUpload}
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
                  onClick={handleCustomize}
                  className="w-full py-4 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Palette className="w-5 h-5 mr-2" />
                  {t.customize}
                </Button>
                <Button 
                  onClick={handlePreview}
                  variant="outline" 
                  className="w-full py-4 text-lg border-2 border-gray-200 hover:border-purple-300 text-gray-700 rounded-xl"
                >
                  {t.preview}
                </Button>
              </div>
            </div>

            {/* Realistic Preview Card */}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardsShowcase;
