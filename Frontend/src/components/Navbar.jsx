import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../config';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    
    return () => unsubscribe();
  }, []);
  
  const handleLogin = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <Link to="/">
          <h1 className="text-2xl font-bold text-orange-500 cursor-pointer">
            Vendi
          </h1>
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/">
                <button className="bg-orange-700 text-white px-4 py-2 rounded-md">
                  Home
                </button>
              </Link>
            </>
          ) : (
            <>
            
            </>
          ) }

          {user ? (
            <>
              <Link to="/create">
                <button className="bg-orange-700 text-white px-4 py-2 rounded-md">
                  Create
                </button>
              </Link>
            </>
          ) : (
            <>
            
            </>
          ) }
          
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-orange-700 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-orange-700 text-white px-4 py-2 rounded-md"
            >
              Sign In with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
