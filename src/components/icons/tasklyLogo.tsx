export const TasklyLogo = () => {
    return (
      <svg width="280" height="80" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#4A90E2", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#50E3C2", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
  
        <polyline
          points="40,50 55,70 80,40"
          stroke="url(#grad1)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
  
        <text x="100" y="65" fontFamily="Arial, sans-serif" fontSize="50" fontWeight="bold" fill="url(#grad1)">
          Taskly
        </text>
      </svg>
    );
  };