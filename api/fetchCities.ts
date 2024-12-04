import { City } from "@/module/city.interface";

export const fetchCities = async (): Promise<City[]> => {
    try {
      const response = await fetch(
        'https://etherqmshqkpehcowxqh.supabase.co/functions/v1/cities'
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: City[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
  };