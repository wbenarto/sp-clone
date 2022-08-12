import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';

export default function Layout({ session, children }) {

  const token = session?.user.accessToken;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  return (
    <div className="sm:flex bg-black">
      { isAuthenticated && <Sidebar /> }
      <main className="w-full">{children}</main>
    </div>
  )
}