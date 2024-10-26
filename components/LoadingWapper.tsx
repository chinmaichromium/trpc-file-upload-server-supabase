import React from "react";

const LoadingWapper: React.FC<{
  children: React.ReactNode;
  loading?: boolean;
}> = ({ children, loading = true }) => {
  return (
    <div
      className={`duration-400 w-full transition-opacity ${loading ? "pointer-events-none opacity-40" : "pointer-events-auto opacity-100"}`}
    >
      {children}
    </div>
  );
};

export default LoadingWapper;
