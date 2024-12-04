import React, { useState } from 'react';

interface AutoCompleteProps {
  onSelectCity: (cityUUID: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AutoComplete: React.FC<AutoCompleteProps> = ({ onSelectCity }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a city..."
        style={{
          width: '100%',
          padding: '8px',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
};

export default AutoComplete;
