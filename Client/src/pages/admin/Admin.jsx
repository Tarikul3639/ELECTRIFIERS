import Logo from '../../assets/Image/logo.png';
import ScheduleManage from './ScheduleManage.jsx';
import { Link } from 'react-router-dom';
const Admin = () => {
  return (
    <div className=" w-screen h-screen lg:p-10 rounded-lg shadow-lg">
      <div className='h-full w-full md:p-4 bg-gray-200 rounded-lg overflow-auto lg:shadow-lg'>
        <div className="flex items-center justify-center pt-10 md:pt-0 w-full">
          <Link title='Home Page' to="/" className="flex items-center">
            <div className="flex items-center justify-center w-12 p-2 rounded-full">
              <img src={Logo} alt="Logo" />
            </div>
            <p className='uppercase text-[#314158] text-xl font-bold'>ELECTRIFIERS</p>
          </Link>
        </div>
        <div className='bg-white w-full h-[2px]'></div>
        <ScheduleManage />
      </div>

    </div>
  );
};

export default Admin;
