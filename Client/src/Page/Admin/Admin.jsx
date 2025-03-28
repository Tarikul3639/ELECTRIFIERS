import Logo from '../../assets/Image/logo.png';
import ScheduleManage from './ScheduleManage.jsx';
const Admin = () => {
  // Predefined area list
  //const predefinedAreas = ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Barisal", "Rangpur", "Mymensingh"];
  return (
    <div className=" w-screen h-screen lg:p-10 rounded-lg shadow-lg">
      <div className='h-full w-full md:p-4 bg-gray-200 rounded-lg overflow-auto lg:shadow-lg'>
        <div className="flex items-center justify-center pt-10 md:pt-0 w-full">
          <div className="flex items-center justify-center w-12 p-2 rounded-full">
            <img src={Logo} alt="Logo" />
          </div>
          <p className='uppercase text-[#314158] text-xl font-bold'>ELECTRIFIERS</p>
        </div>
        <ScheduleManage />
      </div>

    </div>
  );
};

export default Admin;
