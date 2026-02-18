import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Main from './Main'
import Loader from '../../components/Loader';

const Login = () => {
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return (
    <div>
        <Navbar />
        <Main />
        
    </div>
  )
}

export default Login