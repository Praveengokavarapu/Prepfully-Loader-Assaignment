import React, { useState, useEffect } from 'react';
import LoadingComponent from './components/LoadingComponent';
import './App.css';

const App = () => {
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [loadingPaused, setLoadingPaused] = useState(false);

  useEffect(() => {
    if (!loadingPaused) {
      const timer = setInterval(() => {
        setLoadingPercentage((prevPercentage) => {
          const newPercentage = prevPercentage + 10;
          return newPercentage > 100 ? 0 : newPercentage;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [loadingPaused]);

  const handleStartLoading = () => {
    setLoadingPaused(false);
  };

  const handlePauseLoading = () => {
    setLoadingPaused(true);
  };

  return (
    <div className="app-container">
      <h1>Loader Component</h1>
      <LoadingComponent
        percentage={loadingPercentage}
        onStart={handleStartLoading}
        onPause={handlePauseLoading}
      />
      <h1>Prepfully helps you Crack your Dream Job </h1>
    </div>
  );
};

export default App;
