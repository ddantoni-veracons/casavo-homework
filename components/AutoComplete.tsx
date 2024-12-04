/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchCities } from '@/api/fetchCities';
import { City } from '@/module/city.interface';
import React, { useEffect, useRef, useState } from 'react';

interface AutoCompleteProps {
  onSelectCity: (cityUUID: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ onSelectCity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const data = await fetchCities();
        setCities(data);
      } catch (error) {
        console.error('Failed to load cities:', error);
      }
    };
    loadCities();
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = cities.filter(
        (city) =>
          city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          city.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
      setIsDropdownOpen(filtered.length > 0);
    } else {
      setFilteredCities([]);
      setIsDropdownOpen(false);
    }
  }, [searchTerm, cities]);

  const handleSelectCity = (city: City) => {
    setSearchTerm(city.name);
    onSelectCity(city.uuid);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
        {isDropdownOpen && (
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
                    backgroundColor: searchTerm === city.name ? '#e6e6e6' : '#fff',
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
