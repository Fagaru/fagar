"use client";
import React, { useEffect } from 'react';
import '@/styles/vineAnimation.css';

const VineAnimation: React.FC = () => {
  useEffect(() => {
    // Fonction pour créer des éléments de vigne et les ajouter au DOM
    const createVines = () => {
      const container = document.querySelector('.vine-container'); // Sélectionner le conteneur d'animation
      if (container) {
        // Boucle pour créer plusieurs éléments de vigne
        for (let i = 0; i < 10; i++) {
          const vine = document.createElement('div'); // Créer un nouvel élément div pour la vigne
          vine.classList.add('vine'); // Ajouter la classe 'vine' pour le style CSS
          vine.style.top = `${Math.random() * 100}vh`; // Positionner aléatoirement verticalement
          vine.style.left = `${Math.random() * 100}vw`; // Positionner aléatoirement horizontalement
          container.appendChild(vine); // Ajouter l'élément de vigne au conteneur
        }
      }
    };

    createVines(); // Appeler la fonction pour créer les éléments de vigne

    // Fonction de nettoyage pour supprimer les éléments de vigne lors du démontage du composant
    return () => {
      document.querySelectorAll('.vine-container .vine').forEach((el) => el.remove());
    };
  }, []); // Effet qui s'exécute une seule fois au montage du composant

  return <div className="vine-container"></div>; // Conteneur pour les éléments de vigne
};

export default VineAnimation;