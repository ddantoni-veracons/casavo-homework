import { City } from '@/module/city.interface';
import React, { useEffect, useState } from 'react';

interface AutoCompleteProps {
  onSelectCity: (cityUUID: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AutoComplete: React.FC<AutoCompleteProps> = ({ onSelectCity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          'https://etherqmshqkpehcowxqh.supabase.co/functions/v1/cities'
        );
        const data: City[] = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);

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
