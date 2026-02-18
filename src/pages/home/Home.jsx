import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Search from "./Search";
import Events from "./Events";
import Loader from "../../components/Loader"; 
import Footer from "./Footer";

const Home = () => {
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
      <Header />
      <div className="-mb-9">
        <Search />
      </div>
      <Events />
      <Footer/>
    </div>
  );
};

export default Home;
