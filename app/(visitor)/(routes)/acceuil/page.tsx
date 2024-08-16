

"use client";


import { useRouter } from 'next/navigation';
// import Button from "@/components/ui/buttonX";
// import NavigationCard from "@/components/ui/navigation-button";
import MapBoxApiKeyWrapper from "@/providers/map-box-apikey-wrapper";
import { withRouter } from 'next/router';
import React, { useEffect, useState, useRef ,ChangeEvent } from "react";
import { useLoadScript } from "@react-google-maps/api";



// export const revalidate = 0;
interface HomePageProps {
    searchParams: {
        colorId: string;
        sizeId: string;
        categoryId: string;
    }
}
const HomePage = () => {
    const libraries = ["places"];
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        libraries,
      });
    const [input, setInput] = useState({});
    const inputRef = useRef(null);
    useEffect(() => {
        if (!isLoaded || loadError) return;
    
        const options = {
          componentRestrictions: { country: "ng" },
          fields: ["address_components", "geometry"],
        };
    
        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);
        autocomplete.addListener("place_changed", () => handlePlaceChanged(autocomplete));
    
        // return () => autocomplete.removeListener("place_changed", handlePlaceChanged);
      }, [isLoaded, loadError]);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setInput((values) => ({ ...values, [name]: value }));
      };
      const handlePlaceChanged = async(address) => {
        if (!isLoaded) return;
        const place = address.getPlace()
    
        if (!place || !place.geometry) {
          setInput({});
          return;
        }
        formData(place);
      };
   

    const formData = (data) => {
        const addressComponents = data?.address_components;
    
        const componentMap = {
          subPremise: "",
          premise: "",
          street_number: "",
          route: "",
          country: "",
          postal_code: "",
          administrative_area_level_2: "",
          administrative_area_level_1: "",
        };
    
        for (const component of addressComponents) {
          const componentType = component.types[0];
          if (componentMap.hasOwnProperty(componentType)) {
            componentMap[componentType] = component.long_name;
          }
        }
    
        const formattedAddress =
          `${componentMap.subPremise} ${componentMap.premise} ${componentMap.street_number} ${componentMap.route}`.trim();
        const latitude = data?.geometry?.location?.lat();
        const longitude = data?.geometry?.location?.lng();
    
        setInput((values) => ({
          ...values,
          streetAddress: formattedAddress,
          country: componentMap.country,
          zipCode: componentMap.postal_code,
          city: componentMap.administrative_area_level_2,
          state: componentMap.administrative_area_level_1,
          latitude: latitude,
          longitude: longitude,
        }));
      };
    return(
        isLoaded &&(

        <div className="p-4 grid grid-cols-2 gap-5"> 
                <div className="flex flex-col w-full">
                    <label className="text -md"> street adresse</label>
                        <MapBoxApiKeyWrapper/>
                        </div>
                <div className="flex flex-col w-full">
                <label className="text -md"> street adresse alternatif</label>
                <input
                    type="text"
                    name="streetAdresse"
                    ref={inputRef}
                    value={input.streetAddress ||""}
                    onChange={handleChange}
                    className=''
                    placeholder='entrer votre adresse'
                    required
                    />
                    </div>

                <div className="flex flex-col w-full">
                <label className="text -md"> city</label>
                <input
                    type="text"
                    name="city"
                    onChange={handleChange}
                    value={input.city}
                    className=''
                    placeholder='City'
                    required
                    />
                    </div>
                <div className="flex flex-col w-full">
                <label className="text -md"> region</label>
                <input
                    type="text"
                    name="region"
                    onChange={handleChange}
                    // value={input.city}
                    className=''
                    placeholder='region'
                    required
                    />
                    </div>
                    <div className="flex flex-col w-full">
                <label className="text -md"> pays</label>
                <input
                    type="text"
                    name="city"
                    onChange={handleChange}
                    // value={input.city}
                    className=''
                    placeholder='pays'
                    required
                    />
                    </div>

            </div>

      
    ));
}
export default HomePage;




// const HomePage = () => {


  

//   const handleAddressSubmit = () => {
//     localStorage.setItem('userAddress', address);
//     router.replace('/boutiques'); // Rediriger vers la page des boutiques après la soumission
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-xl font-bold">Entrez votre adresse</h1>
//       <input
//         type="text"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         className="border p-2 mt-2"
//         placeholder="Votre adresse"
//       />
//       <button
//         onClick={handleAddressSubmit}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
//       >
//         Soumettre
//       </button>
//     </div>
//   );
// };

// export default HomePage;

