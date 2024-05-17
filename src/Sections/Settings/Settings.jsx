import React from 'react';
import Languageswitcher from '../../Languageswitcher';
 
const Settings = () => {
  return (
    <div>
      <h2>Settings</h2>
      <div>
        <label htmlFor="language-selector">Languages:</label>
        <Languageswitcher id="language-selector" />
      </div>
      {/* Other settings can be added here */}
    </div>
  );
};
 
export default Settings;