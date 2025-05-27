import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const INPUT_CLASS =
    'w-full p-3 border border-gray-300 dark:border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-primary-text-light';
  const LABEL_CLASS =
    'block text-gray-700 dark:text-primary-text-light font-medium';

  // States for form inputs using single object
  const [data, setData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_WS_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        setData({ name: "", email: "", message: "" });
        toast.success(result.message || 'Message sent successfully!');
      } else {
        toast.error(result.message || 'Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Network error. Please try again later.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-5 bg-white dark:bg-background-dark shadow-sm">
      <div className="dark:bg-background-light/5 p-6 rounded-lg">
        <h1 className="text-4xl font-bold text-center text-blue-600">Contact Us</h1>
        <p className="mt-2 text-gray-600 dark:text-primary-text-light text-center justify-center">
          Have questions about load shedding updates?
          <span className="block sm:inline"> Get in touch with us.</span>
        </p>

        {/* Contact Form */}
        <div className="mt-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className={LABEL_CLASS}>Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className={INPUT_CLASS}
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>

            <div>
              <label className={LABEL_CLASS}>Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={INPUT_CLASS}
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>

            <div>
              <label className={LABEL_CLASS}>Message</label>
              <textarea
                placeholder="Write your message here..."
                rows="4"
                className={INPUT_CLASS}
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
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

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-blue-500">Get in Touch</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-center justify-center">
            We are here to help you with load shedding
            <span className="block sm:inline"> updates and queries.</span>
          </p>

          <div className="mt-4 space-y-2">
            <p className="text-gray-700 dark:text-gray-300 flex items-center justify-center">
              <FaEnvelope className="mr-2 text-blue-500" /> support@loadshedder.com
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center justify-center">
              <FaPhone className="mr-2 text-blue-500" /> +880 1234 567 890
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center justify-center">
              <FaMapMarkerAlt className="mr-2 text-blue-500" /> Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
