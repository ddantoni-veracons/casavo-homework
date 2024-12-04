/* eslint-disable @typescript-eslint/no-unused-vars */
import { City } from '@/module/city.interface';
import React, { useEffect, useState } from 'react';

interface AutoCompleteProps {
  onSelectCity: (cityUUID: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ onSelectCity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = cities.filter(
        (city) =>
          city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          city.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [searchTerm, cities]);

  const handleSelectCity = (city: City) => {
    setSearchTerm(city.name);
    onSelectCity(city.uuid);
    setIsDropdownOpen(false);
  };
  
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
        {filteredCities.length > 0 && (
            <ul
                style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '100%',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                zIndex: 1000,
                maxHeight: '200px',
                overflowY: 'auto',
                }}
            >
                {filteredCities.map((city) => (
                <li
                    key={city.uuid}
                    onClick={() => handleSelectCity(city)}
                    style={{
                        padding: '8px',
                        cursor: 'pointer',
                    }}
                >
                    <span>
                    <strong>{city.name}</strong>, {city.country}
                    </span>
                </li>
                ))}
            </ul>
        )}
    </div>
  );
};

export default AutoComplete;
