import { FC } from "react";

export const Loading: FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium animate-pulse">
          Initializing Nexus workspace...
        </p>
      </div>
    </div>
  );
};
