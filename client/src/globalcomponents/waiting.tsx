import React from 'react';
import '../css/loading_style.css';

const LoadingPage = () => {

  const array = Array.from(Array(5), (_, index) => index + 1);
    return (
      <div className="relative p-4 h-20">
        <div className="absolute left-1/2 bottom-7 wrapper space-x-1">
          {array.map((item) => (
            <span id={`circle-${item}`} key={item} className="w-3 h-3 relative bg-violet-500 rounded-full inline-block circle" />
          ))}
        </div>
      </div>
    );
};

export default LoadingPage;