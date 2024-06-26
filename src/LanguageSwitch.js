// src/Sections/Settings/LanguageSelector.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <select onChange={handleLanguageChange} value={i18n.language}>   
      <option value="te">తెలుగు</option>
      <option value="hi">हिंदी</option>
      <option value="en">English</option>
    </select>
  );
};

export default LanguageSwitch;
