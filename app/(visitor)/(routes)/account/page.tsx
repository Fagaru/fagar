"use client";

import { getUser } from '@/services/getUser';
import { useAuth } from '@/context/authContext';
import { format } from 'date-fns';
import { Suspense, useEffect, useState } from 'react';
import Loader from '@/components/loader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileForm from './components/updatePersonalData';
import UpdatePasswordForm from './components/updatePasswordProfile';
import { DeleteProfile } from './components/deleteProfile';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/errorFallback';
import ImageForm from './components/imageForm';

const AccountPage = () => {
  const { user, isAuthenticated, token } = useAuth();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && user) {
        try {
          const userId = user.id;
          const fetchedUser = await getUser({ userId }, token);
          setCurrentUser(fetchedUser);
        } catch (err) {
          console.log("Failed to fetch user data", err);
        }
      }
    };

    fetchUser();
  }, [user, isAuthenticated, token]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Chargement des données utilisateurs...</p>
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative grid grid-cols-6 p-6 bg-white dark:bg-gray-950 auto-rows-[minmax(50px,auto)] rounded-[10px] w-full">
      <div className="relative col-span-5 xl:lg:md:col-span-1 p-2 gap-2 flex justify-center w-full">
        <div className="relative inset-0 overflow-full rounded-full w-full flex justify-center">
          <ImageForm initialData={{ image: { url: currentUser.image || "/default_image.jpg" }, userId: currentUser._id }} />
        </div>
      </div>
      <div className="relative col-span-6 xl:lg:col-span-5 p-2 w-full shadow-md rounded-lg">
        <div className="p-6 w-full">
          <div className="flex items-center space-x-4 w-full">
            <div className='w-full'>
              <h1 className="text-2xl font-semibold">Mon compte</h1>
              <p className="text-gray-600 text-xs">
                <span>Dernière connexion: </span>{format(new Date(currentUser.lastLogin), 'dd MMM yyyy HH:mm')}
              </p>
              <div className="w-full space-y-4 pt-6">
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList>
                    <TabsTrigger value="profile">Profil</TabsTrigger>
                    <TabsTrigger value="actions">Mes actions</TabsTrigger>
                    <TabsTrigger value="achats">Mes achats</TabsTrigger>
                  </TabsList>
                  <TabsContent value="profile">
                    <ProfileForm initialData={currentUser} />
                    <UpdatePasswordForm userId={currentUser._id} />
                  </TabsContent>
                  <TabsContent value="actions">
                    actions
                  </TabsContent>
                  <TabsContent value="achats">
                    achats
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
          <div className="p-2 mt-6">
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Membre depuis: </span>{format(new Date(currentUser.createdAt), 'dd MMM yyyy')}
            </p>
          </div>
          <div className="relative col-span-4 p-4 gap-4 flex justify-between border-t">
            <span>Supression du compte</span>
            <DeleteProfile userId={currentUser._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WrappedAccountPage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
        <AccountPage />
      </Suspense>
    </ErrorBoundary>
  );
}
