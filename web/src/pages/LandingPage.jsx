import HomeSection from "./Home/Home.jsx";
import AboutSection from "./About.jsx";
import ContactSection from "./Contact.jsx";
import NavMenu from "../components/navigation/NavMenu.jsx";
import Footer from "../components/navigation/Footer.jsx";
const MainPage = () => {
  return (
    <div className="scroll-smooth h-screen ">
      <NavMenu />

      {/* Content Area */}
      <section id="home" className="bg-white dark:bg-background-dark">
        <HomeSection/>
      </section>

      <section id="about" className="bg-white dark:bg-background-dark">
        <AboutSection />
      </section>

      <section id="contact" className="bg-white dark:bg-background-dark">
        <ContactSection />
      </section>

      <Footer />
    </div>

  );
};

export default MainPage;
