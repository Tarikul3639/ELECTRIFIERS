// Client/src/Page/Home.jsx
const Home = () => {
    return (
        <div className="text-center py-16 min-h-[500vh] flex flex-col items-center justify-center bg-gray-100">
            <h1 className="font-extrabold text-4xl text-gray-800 mb-4">
                Welcome to Electrifiers
            </h1>
            <p className="text-xl text-gray-600 mb-8">
                Your one-stop solution for all your electrical needs.
            </p>
            <button
                className="px-6 py-3 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition duration-300"
                onClick={() => alert('Explore More!')}
            >
                Explore More
            </button>
        </div>
    );
};

export default Home;
