import React from 'react';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import QuoteSection from '../components/QuoteSection';
import Newsletter from '../components/Newsletter';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <NewsSection />
      <QuoteSection />
      <Newsletter />
    </>
  );
};

export default Home;
