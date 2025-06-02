
import React, { useState } from 'react';
import CardsHeader from './cards/CardsHeader';
import CardsSummaryCards from './cards/CardsSummaryCards';
import CardsFilters from './cards/CardsFilters';
import CardItem from './cards/CardItem';
import CardsPagination from './cards/CardsPagination';

const AdminCardsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const cards = [
    {
      id: 'CARD001',
      cardNumber: '**** **** **** 1234',
      fullCardNumber: '4532123456781234',
      customerName: 'أحمد محمد علي',
      cardType: 'Visa',
      cardCategory: 'ذهبية',
      status: 'نشطة',
      expiryDate: '12/26',
      issueDate: '2023-01-15',
      linkedAccount: 'ACC001',
      creditLimit: '500,000',
      currentBalance: '125,000',
      monthlySpent: '45,000',
      lastTransaction: '2024-01-20',
      securityLevel: 'عالي'
    },
    {
      id: 'CARD002',
      cardNumber: '**** **** **** 5678',
      fullCardNumber: '5555123456785678',
      customerName: 'فاطمة حسن محمود',
      cardType: 'Mastercard',
      cardCategory: 'بلاتينية',
      status: 'نشطة',
      expiryDate: '08/25',
      issueDate: '2022-08-22',
      linkedAccount: 'ACC002',
      creditLimit: '1,000,000',
      currentBalance: '275,000',
      monthlySpent: '85,000',
      lastTransaction: '2024-01-19',
      securityLevel: 'عالي'
    },
    {
      id: 'CARD003',
      cardNumber: '**** **** **** 9012',
      fullCardNumber: '4000123456789012',
      customerName: 'محمد سعد الدين',
      cardType: 'Visa',
      cardCategory: 'فضية',
      status: 'محظورة',
      expiryDate: '03/27',
      issueDate: '2023-03-10',
      linkedAccount: 'ACC003',
      creditLimit: '200,000',
      currentBalance: '180,000',
      monthlySpent: '15,000',
      lastTransaction: '2024-01-10',
      securityLevel: 'متوسط'
    },
    {
      id: 'CARD004',
      cardNumber: '**** **** **** 3456',
      fullCardNumber: '5200123456783456',
      customerName: 'نور عبد الرحمن',
      cardType: 'Mastercard',
      cardCategory: 'ذهبية',
      status: 'منتهية الصلاحية',
      expiryDate: '01/24',
      issueDate: '2022-11-05',
      linkedAccount: 'ACC004',
      creditLimit: '750,000',
      currentBalance: '0',
      monthlySpent: '0',
      lastTransaction: '2024-01-05',
      securityLevel: 'عالي'
    }
  ];

  return (
    <div className="space-y-6">
      <CardsHeader />
      <CardsSummaryCards />
      <CardsFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {/* Cards List */}
      <div className="space-y-4">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>

      <CardsPagination />
    </div>
  );
};

export default AdminCardsManagement;
