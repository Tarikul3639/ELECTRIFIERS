import background from "../../assets/Image/background.jpg";
import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#102210]">
      <main className="h-screen w-screen sm:h-[90vh] sm:w-[95vw] bg-center bg-no-repeat bg-fixed rounded-2xl flex flex-col justify-center p-2 sm:p-6 overflow-hidden shadow-lg"
        style={{
          backgroundImage: `linear-gradient(to right, 
      rgba(0, 0, 0, 0.95) 10%,  
      rgba(0, 0, 0, 0.85) 30%,  
      rgba(0, 0, 0, 0.70) 50%,  
      rgba(0, 0, 0, 0.45) 70%,  
      rgba(0, 0, 0, 0.20) 90%,  
      rgba(0, 0, 0, 0) 100%),  
      url(${background})`,
          backgroundSize: "cover",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
