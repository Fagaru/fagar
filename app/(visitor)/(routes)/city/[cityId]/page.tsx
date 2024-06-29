"use client";

import { useEffect, useState } from 'react';
import getCorporations from '@/services/getCorporations';
import { Corporation } from '@/types/corporation';

interface CityPageProps {
    params: {
        cityId: string;
    }
}

const CityPage: React.FC<CityPageProps> = ({
    params
}) => {
    const [corporations, setCorporations] = useState<Corporation[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCorporations = async () => {
        try {
            const data = await getCorporations({
                cityId: params.cityId
            });
            setCorporations(data);
        } catch (err) {
            setError("Failed to fetch corporations");
        }
        };

        fetchCorporations();
    }, [params.cityId]);

    return (
        <div>
        <h1>City Id {params.cityId}</h1>
        {error && <p>{error}</p>}
        <ul>
            {corporations.map((item) => (
            <li key={item._id}>{item.name}</li>
            ))}
        </ul>
        </div>
    );
};

export default CityPage;