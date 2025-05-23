import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto my-10 p-8 bg-white rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-center text-blue-600">Contact Us</h1>
      <p className="mt-2 text-gray-600 text-center justify-center">
        Have questions about load shedding updates?
        <span className="block sm:inline"> Get in touch with us.</span>
      </p>


      {/* Contact Form */}
      <div className="mt-6">
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              placeholder="Write your message here..."
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Information */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Get in Touch</h2>
        <p className="mt-2 text-gray-600 text-center justify-center">
          We are here to help you with load shedding
          <span className="block sm:inline"> updates and queries.</span>
        </p>


        <div className="mt-4 space-y-2">
          <p className="text-gray-700 flex items-center justify-center">
            <FaEnvelope className="mr-2 text-blue-500" /> support@loadshedder.com
          </p>
          <p className="text-gray-700 flex items-center justify-center">
            <FaPhone className="mr-2 text-blue-500" /> +880 1234 567 890
          </p>
          <p className="text-gray-700 flex items-center justify-center">
            <FaMapMarkerAlt className="mr-2 text-blue-500" /> Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
