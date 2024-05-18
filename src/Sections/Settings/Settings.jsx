// src/Sections/Settings/Settings.js
import React from 'react';
import LanguageSwitch from '../../LanguageSwitch';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const {t} = useTranslation();
  return (
    <div>
      <h2>{t('menuItems.settings')}</h2>
      <div>
        <label htmlFor="language-selector">Languages:</label>
        <LanguageSwitch id="language-selector" />
      </div>
      {/* Other settings can be added here */}
    </div>
  );
};

export default Settings;
