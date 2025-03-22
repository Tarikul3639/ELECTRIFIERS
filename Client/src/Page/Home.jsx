//Client\src\Page\Home.jsx
const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Welcome to Electrifiers</h1>
            <p>Your one-stop solution for all your electrical needs.</p>
            <button 
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
                onClick={() => alert('Explore More!')}
            >
                Explore More
            </button>
        </div>
    );
};

export default Home;