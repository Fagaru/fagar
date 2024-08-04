"use client";

import { useUser } from '@/context/userContext';


const HomePage = ({
    params
}: {
    params: { storeId: string }
}) => {
    const { user, isAuthenticated, logout } = useUser();
    console.log("Authenticated", isAuthenticated);

  if (!user) {
    return <p>Please log in.</p>;
  }
    
  return (
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-1 gap-5 p-2 auto-rows-[minmax(180px,auto)]">
          <h2>Welcome, {user.email}</h2>
        <p>Role: {user.role}</p>
        <p>Authentifié: {isAuthenticated}</p>
        <button onClick={logout}>Logout</button>
      </div>
  );
}

export default HomePage;