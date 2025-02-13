
import {  useState } from "react";
import { FaBars, FaBuilding, FaClipboardList, FaHeart, FaHome, FaStar, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../Hooks/useRole";


const DashBoard = () => {

  const [role] = useRole();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const renderNavLinks = () => {
    if (role === "admin") {
      return (
        <>
          <div className="space-y-3 mt-2">
          <NavLink to="/dashboard/adminProfile" className={getLinkClasses}><FaUser /> Admin Profile</NavLink>
          <NavLink to="/dashboard/AddCamp" className={getLinkClasses}><FaClipboardList />Add Camp</NavLink>
          <NavLink to="/dashboard/ManageCamp" className={getLinkClasses}><FaUser /> Manage Camp</NavLink>
          <NavLink to="/dashboard/ManageRegCamp" className={getLinkClasses}><FaStar /> Manage Reg-Camp</NavLink>
          <NavLink to="/dashboard/Alluser" className={getLinkClasses}><FaStar />All User</NavLink>
          </div>
        </>
      );
    }else {
      return (
        <>
        <div className="space-y-3 mt-2">
        <NavLink to="/dashboard/Analytics" className={getLinkClasses}><FaUser />Analytics</NavLink>
          <NavLink to="/dashboard/ParticipantUser" className={getLinkClasses}><FaHeart />Participant Profile</NavLink>
          <NavLink to="/dashboard/Registered" className={getLinkClasses}><FaHome /> Registered Camp</NavLink>
          <NavLink to="/dashboard/Payment" className={getLinkClasses}><FaStar />Payment History</NavLink>
        </div>
        </>
      );
    }
  };

  const getLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 font-semibold transition py-2 px-4 rounded-md ${
      isActive ? "bg-yellow-500 text-white shadow-md" : "bg-orange-500 hover:bg-yellow-400 hover:text-black text-white"
    }`;

  return (
    <div className="md:flex flex-wrap">
      {/* Sidebar */}
      <div className="w-full lg:w-3/12 bg-gray-900 py-4 flex flex-col lg:block lg:min-h-screen">
        {/* Hamburger Menu for Tablets */}
        <div className="block  lg:hidden px-4">
          <button
            className="text-white text-xl flex items-center gap-2"
            onClick={toggleDropdown}
          >
            <FaBars />
          </button>
        </div>

        {/* Dropdown Menu */}
        <div className={`lg:block ${isDropdownOpen ? "block" : "hidden"} px-4`}>
          {renderNavLinks()}
          <div className="divider text-white">----OR----</div>
          <div className="space-y-3 mt-2">
          <NavLink to="/" className={getLinkClasses}><FaHome /> Home</NavLink>
          <NavLink to="/PropertyCard" className={getLinkClasses}><FaBuilding />Contract</NavLink>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
