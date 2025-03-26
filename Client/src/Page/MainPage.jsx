import HomeSection from "./HomeSection.jsx";
import AboutSection from "./About.jsx";
import ContactSection from "./Contact.jsx";
import NavMenu from "../Components/NavMenu.jsx";
import Footer from "../Components/Footer.jsx";
const MainPage = () => {
  return (
    <div className="scroll-smooth h-screen">
      <NavMenu />

      {/* Content Area */}
      <section id="home" className="bg-white ">
        <HomeSection />
      </section>

      <section id="about" className="bg-white ">
        <AboutSection />
      </section>

      <section id="contact" className="bg-white">
        <ContactSection />
      </section>

      <Footer />
    </div>

  );
};

export default MainPage;
