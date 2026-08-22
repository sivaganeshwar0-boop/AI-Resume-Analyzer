import React from 'react';

export const LoadingSkeleton = ({ rows = 3, type = "card" }) => {
  if (type === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-36 glass-card rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-slate-800 rounded w-24"></div>
              <div className="h-8 w-8 bg-slate-800 rounded-full"></div>
            </div>
            <div className="h-8 bg-slate-800 rounded w-32"></div>
            <div className="h-3 bg-slate-800 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="h-12 glass-card rounded-xl bg-slate-800/40 w-full"></div>
      ))}
    </div>
  );
};
