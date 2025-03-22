import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import Sidebar from "../Components/Sidebar.jsx";
import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
