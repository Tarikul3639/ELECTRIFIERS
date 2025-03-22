//Client\src\Components\Sidebar.jsx
const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl mb-4">Navigation</h2>
      <ul>
        <li><a href="#" className="block py-2 hover:bg-gray-700">Home</a></li>
        <li><a href="#" className="block py-2 hover:bg-gray-700">About</a></li>
        <li><a href="#" className="block py-2 hover:bg-gray-700">Contact</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
