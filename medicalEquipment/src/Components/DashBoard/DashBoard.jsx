
import {  useState } from "react";
import { FaBars, FaBuilding, FaClipboardList, FaHeart, FaHome, FaStar, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";


const DashBoard = () => {
//   const { user } = useAuth();
//   const [role] = useRole();
//   const [reviews] = UseReviews(user?.email);
//   const [wishlist] = UseWishList();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const role = 'user'
  
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const renderNavLinks = () => {
    if (role === "admin") {
      return (
        <>
          <div className="space-y-3 mt-2">
          <NavLink to="/dashboard/adminProfile" className={getLinkClasses}><FaUser /> Admin Profile</NavLink>
          <NavLink to="/dashboard/adminManage" className={getLinkClasses}><FaClipboardList /> Manage Properties</NavLink>
          <NavLink to="/dashboard/manageRole" className={getLinkClasses}><FaUser /> Manage Role</NavLink>
          <NavLink to="/dashboard/adminReview" className={getLinkClasses}><FaStar /> Manage Reviews</NavLink>
          <NavLink to="/dashboard/advertiseProperty" className={getLinkClasses}><FaStar /> Advertise Property</NavLink>
          </div>
        </>
      );
    }else {
      return (
        <>
        <div className="space-y-3 mt-2">
        <NavLink to="/dashboard/userProfile" className={getLinkClasses}><FaUser />Analytics</NavLink>
          <NavLink to="/dashboard/WishList" className={getLinkClasses}><FaHeart />Participant Profile</NavLink>
          <NavLink to="/dashboard/propertyBought" className={getLinkClasses}><FaHome /> Registered Camp</NavLink>
          <NavLink to="/dashboard/reviews" className={getLinkClasses}><FaStar />Payment History</NavLink>
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
