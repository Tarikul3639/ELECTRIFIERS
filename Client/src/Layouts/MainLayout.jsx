import NavMenu from "../Components/NavMenu.jsx";
import Footer from "../Components/Footer.jsx";
import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-100">
      {/* Header with Sidebar */}
      <NavMenu />

      {/* Main Content */}
      <main className="flex-1 bg-white">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
