import React from 'react';

const LoadingState = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-primary">
      <div className="text-center">
        <div className="mb-4 inline-block">
          {/* Minimalist animated logo/text */}
          <h2 className="text-2xl font-headline font-bold text-on-primary tracking-[0.2em] animate-pulse uppercase">
            onewholefuture
          </h2>
        </div>
        <div className="w-48 h-[1px] bg-white/10 mx-auto overflow-hidden relative">
          <div className="absolute inset-0 bg-on-primary/40 animate-loading-bar" />
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
