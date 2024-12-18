"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Corporation as CorporationType } from "@/types/corporation";

interface DisplayProps {
  Corpo: CorporationType[];
}

const NewCorps: React.FC<DisplayProps> = ({ Corpo }) => {
  const router = useRouter();
  const [activeCorpo, setActiveCorpo] = useState(0);
  const corporations = Corpo.length > 0 ? Corpo : [];

  const clickNext = () => {
    activeCorpo === corporations.length - 1
      ? setActiveCorpo(0)
      : setActiveCorpo(activeCorpo + 1);
  };

  const clickPrev = () => {
    activeCorpo === 0
      ? setActiveCorpo(corporations.length - 1)
      : setActiveCorpo(activeCorpo - 1);
  };

  const handleClick = (corporationId: string) => {
    router.push(`/pros/${corporationId}`);
  };

  const sortedCorporations = corporations.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );


  const recentCorporations = sortedCorporations.slice(0, 6);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {recentCorporations.map((corporation) => (
        <div
          onClick={() => handleClick(corporation._id)} 
          key={corporation._id}
          className="border border-gray-200 rounded p-4 flex flex-col items-center cursor-pointer" 
        >
          <img
            src={corporation.images?.[0]?.url || "/avatar.png"} 
            alt={`${corporation.name} logo`}
            className="w-16 h-16 rounded-full mb-2"
          />
          <h3 className="font-semibold">{corporation.name}</h3>
          <p className="text-gray-500">
            {corporation.description || "Aucune description disponible"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NewCorps;
