"use client";

import { useEffect, useState } from 'react';
import getCorporations from '@/services/getCorporations';
import { Corporation } from '@/types/corporation';

const HomePage = () => {
  const [corporations, setCorporations] = useState<Corporation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCorporations = async () => {
      try {
        const data = await getCorporations({});
        setCorporations(data);
      } catch (err) {
        setError("Failed to fetch corporations");
      }
    };

    fetchCorporations();
  }, []);

  return (
    <div>
      <h1>Corporations</h1>
      {error && <p>{error}</p>}
      <ul>
        {corporations.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
