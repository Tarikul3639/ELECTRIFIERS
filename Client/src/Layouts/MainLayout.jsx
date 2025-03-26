// MainLayout.jsx 
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

// MainLayout.jsx
const MainLayout = () => {
  useEffect(() => {
    document.documentElement.style.backgroundColor = "#FFFFFF";
    document.body.style.backgroundColor = "#FFFFFF";
  }, []);
  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;