import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaCheck } from 'react-icons/fa';
import './index.css';

const LoadingComponent = ({ percentage, onStart, onPause }) => {
  // State variables
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
// Update state when the percentage prop changes
  useEffect(() => {
    setLoadingPercentage(percentage);
    // Check if loading is completed
    if (percentage >= 100) {
      setIsCompleted(true);
      setIsPaused(true);
      
    } else {
      setIsPaused(false);
      setIsCompleted(false);
    }
  }, [percentage]);
  // Event handlers

  const handleStart = () => {
    onStart();
    setIsPaused(false);
    setIsCompleted(false);
  };

  const handlePause = () => {
    onPause();
    setIsPaused(true);
  };
  // Get the progress bar color based on the percentage

  const getProgressColor = (percentage) => {
    const hue = (percentage / 100) * 120;
    const saturation = 100;
    return `hsl(${hue}, ${saturation}%, 50%)`;
  };

  return (
    <div>
      <div className="circle-progress">
        <svg className="circle" viewBox="0 0 100 100">
          <circle
            className="circle-bg"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            stroke="#e5e5e5"
            strokeWidth="10"
          />
          <circle
            className="circle-fill"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            stroke={getProgressColor(loadingPercentage)}
            strokeWidth="10"
            style={{
              strokeDasharray: `${(loadingPercentage / 100) * 283} 283`, // 283 is the circumference of the circle (2 * π * 45)
              transformOrigin: 'center',
              transform: 'rotate(-90deg)',
            }}
          />
        </svg>
        <div className="progress-text">
          {isCompleted ? (
            <>
              <FaCheck className="check-icon" />
              Completed
              
            </>
          ) : (
            
            `${loadingPercentage}%`
          )}
        </div>
      </div>
      {/* Buttons for controlling the loading */}
      <div className="button-container">
        <button onClick={handleStart} disabled={!isPaused} className='start'>
          <FaPlay /> Start
        </button>
        <button onClick={handlePause} disabled={isPaused} className='pause'>
          <FaPause /> Pause
        </button>

      </div>


      
    </div>
  );
};

export default LoadingComponent;
