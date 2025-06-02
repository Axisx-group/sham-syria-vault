
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessApplicationForm from '@/components/business-application/BusinessApplicationForm';

const ApplyBusiness = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return <BusinessApplicationForm onBackClick={handleBackClick} />;
};

export default ApplyBusiness;
