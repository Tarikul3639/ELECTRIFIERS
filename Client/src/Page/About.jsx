import loadSheddingAlert from '../assets/Image/load-shedding-alert.jpg';
import howItWorks from '../assets/Image/how-it-works.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FaClock } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
const About = () => {
  return (
    <div className="max-w-6xl mx-auto my-10 p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold text-center text-blue-600">About Our Project</h1>
      <div className='mt-6 bg-gray-100 p-4 rounded-lg p-2'>
        <img
          src={loadSheddingAlert}
          alt="Load Shedding Alert"
          className="w-full h-64 object-cover rounded-lg mt-4"
        />
        <p className="mt-4 text-gray-700 text-md text-center text-justify">
          Bangladesh faces frequent load shedding, leaving users unaware of power outage schedules.
          Our system provides real-time area-based notifications so users can plan accordingly.
        </p>

      </div>


      <div className="mt-6 bg-gray-100 p-4 rounded-lg p-2">
        <h2 className="text-2xl font-semibold text-gray-800">Key Features</h2>
        <div className='mt-4 text-black space-y-4'>
          <p className='mt-4 text-gray-600 text-md text-center text-justify'>Power outages can disrupt your daily routine, but with LoadShedding Buddy, you can stay informed and prepared. Our platform offers area-specific schedules and real-time updates.</p>
          <div className='grid grid-cols-1 gap-4 rounded-lg ml-4'>
            <div className='flex items-start p-4'>
              <FaClock className='text-[#FF5733] mt-2 text-lg' />
              <div className='ml-4'>
                <h3 className='text-md font-bold text-gray-900'>Real-Time Updates</h3>
                <p className='text-gray-600'>Receive instant notifications about changes in load-shedding schedules.</p>
              </div>
            </div>
            <div className='flex items-start p-4'>
              <FaLocationDot className='text-[#FF5733] mt-2 text-lg' />
              <div className='ml-4'>
                <h3 className='text-md font-bold text-gray-900'>Area-Specific Alerts</h3>
                <p className='text-gray-600'>Get customized alerts based on your location for precise information.</p>
              </div>
            </div>
            <div className='flex items-start p-4'>
            <FontAwesomeIcon icon={faBolt} className='text-[#FF5733] mt-2 text-lg'/>
              <div className='ml-4'>
                <h3 className='text-md font-bold text-gray-900'>Energy Insights</h3>
                <p className='text-gray-600'>Learn about energy-saving tips and strategies to manage power outages.</p>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="mt-6 bg-gray-100 p-4 rounded-lg p-2">
        <h2 className="text-2xl font-semibold text-gray-800">How It Works</h2>
        <img
          src={howItWorks}
          alt="How It Works"
          className="w-full h-64 object-cover rounded-lg mt-4"
        />
        <p className="mt-4 text-gray-600 text-md text-center text-justify">
          Users subscribe to their area, and our system fetches data from power stations
          to provide accurate and timely alerts before load shedding occurs.
        </p>
      </div>

    </div>
  );
};

export default About;
