import  { useState } from "react";
import { FiMenu, FiX, FiHome, FiLogOut } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import userImg from "../assets/user.png";

// import useAdmin from "../Hooks/useAdmin";
import { FaUserMd } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";

// import useCart from "../../../Hooks/useCart";


const Navbar = () => {
  const { logOut, user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // const [cart] = useCart();
  // const [isAdmin] = useAdmin();


  const handleSignOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged out successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => console.error("Logout Error:", error.message));
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  const links = (
    <>
      <li key="home">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 hover:text-gray-300 ${
              isActive ? "text-blue-500" : "text-white"
            }`
          }
        >
          <FiHome /> Home
        </NavLink>
      </li>
      <li key="menu">
        <NavLink
          to="/available-camps"
          className={({ isActive }) =>
            `flex items-center gap-2 hover:text-gray-300 ${
              isActive ? "text-blue-500" : "text-white"
            }`
          }
        >
          Available Camps
        </NavLink>
      </li>
      <li key="menu">
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex items-center gap-2 hover:text-gray-300 ${
              isActive ? "text-blue-500" : "text-white"
            }`
          }
        >
         Contact
        </NavLink>
      </li>

      {/* &&isAdmin */}
      {
        user  && <li><Link to='/dashboard/adminHome'>Dashboard</Link></li>
      }
      {
        user  && <li><Link to={`/dashboard/participants/${user?.email}`}>Dashboard</Link></li>
      }
    </>
  );

  return (
    <nav className="text-white fixed container  z-50 bg-opacity-40 bg-[#152c54]">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold flex items-center">
          <p><FaUserMd className="text-blue-900 text-3xl mx-auto mr-1" /></p>
          <p>Medi<span className="text-blue-900">Camp</span></p>
          
          </div>
        <ul className="hidden lg:flex gap-8">{links}</ul>

        
    <div className="flex gap-2">
    <div>
          {user ? (
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div
                  title={user?.displayName || "User"}
                  className="w-10 rounded-full tooltip"
                  data-tip={user?.displayName}
                >
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile Photo"
                    src={user?.photoURL || userImg}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-500 rounded-box md:w-52 w-32 text-xs"
              >
                <li className="text-center font-extrabold underline">{user.displayName}</li>
                <li className="mt-2">
                  <button
                    onClick={handleSignOut}
                    className="bg-white text-blue-900 block text-center"
                  >
                    Logout
                  </button>
                </li>
                <li className="mt-2">
                  <button
                    className="bg-white text-blue-900 block text-center"
                  >
                    <Link to='/dashboard'>Dashboard</Link>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="rounded-full flex items-center gap-2">
              <img
                src={userImg}
                alt="user"
                className=" w-10 h-10 rounded-full"
              />
              <Link className="btn btn-outline mr-2" to="/login">
                Join Us
              </Link>
            </div>
          )}
        </div> 

    <button className="lg:hidden focus:outline-none" onClick={toggleMenu}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
    </div>
      </div>


      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-1/3 md:w-1/2 bg-black bg-opacity-45 backdrop-blur-md text-white shadow-lg z-50 lg:hidden"
          >

            <div className="flex justify-between items-center p-4 border-b">
              <span className="text-xl font-bold"></span>
              <button onClick={toggleMenu} className="text-white">
                <FiX size={24} />
              </button>
            </div>
            <ul className="flex flex-col gap-4 p-6">
              {links}
              {user ? (
                <li>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 "
                  >
                    <FiLogOut /> Logout
                  </button>
                </li>
              ) : (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `flex items-center gap-2 hover:text-gray-300 ${
                        isActive ? "text-blue-500" : "text-white"
                      }`
                    }
                  >
                    <FiLogOut /> Join Us
                  </NavLink>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;