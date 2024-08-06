// app/profile/page.tsx
"use client";

import getUser from '@/services/getUser';

import { useAuth } from '@/context/authContext';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && user) {
        try {
          const userId = user.id;
          const fetchedUser = await getUser({ userId });
          setCurrentUser(fetchedUser);
          console.log("PROFILE USER ID", userId);
        } catch (err) {
          console.log("Failed to fetch user data", err);
        }
      }
    };

    fetchUser();
  }, [user, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Loading user data...</p>
      </div>
    );
  }


  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl">
        <div className="flex items-center space-x-4">
          <Image
            src={currentUser.image || "/default_image.jpg"} // Placeholder image if no user image is available
            alt={`${currentUser.first_name} ${currentUser.last_name}`}
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-semibold">{`${currentUser.first_name} ${currentUser.last_name}`}</h1>
            <p className="text-gray-600">{currentUser.email}</p>
            <p className="text-gray-600">{currentUser.phone}</p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Informations personnelles</h2>
          <div className="mt-4">
            <p><span className="font-semibold">Date de naissance: </span>{format(new Date(currentUser.birthday || null), 'dd MMM yyyy')}</p>
            <p><span className="font-semibold">Genre: </span>{currentUser.gender}</p>
            <p><span className="font-semibold">Ville préférée: </span>{currentUser.lovely_town}</p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Statut du compte</h2>
          <div className="mt-4">
            <p><span className="font-semibold">Vérifié: </span>{currentUser.isVerified ? 'Oui' : 'Non'}</p>
            <p><span className="font-semibold">Compte actif: </span>{currentUser.isActive ? 'Oui' : 'Non'}</p>
            <p><span className="font-semibold">Compte suspendu: </span>{currentUser.isSuspended ? 'Oui' : 'Non'}</p>
            <p><span className="font-semibold">Dernière connexion: </span>{format(new Date(currentUser.lastLogin), 'dd MMM yyyy HH:mm')}</p>
            <p><span className="font-semibold">Dernière déconnexion: </span>{format(new Date(currentUser?.lastLogout || null), 'dd MMM yyyy HH:mm') || null}</p>
            <p><span className="font-semibold">Membre depuis: </span>{format(new Date(currentUser.createdAt), 'dd MMM yyyy')}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <Link href="/edit-profile" legacyBehavior>
            <a className="text-blue-600 hover:underline">Modifier le profil</a>
          </Link>
          <Link href="/logout" legacyBehavior>
            <a className="text-red-600 hover:underline">Déconnexion</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;