// import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/UseAxiosPublic";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = UseAxiosSecure()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/';

  const navigate = useNavigate();
  const handlelogin = () => {
    googleLogin().then((res) => {
      const user =res.user;
      const userInfo = {
        email: res?.user?.email,
        name: res?.user?.displayName,
        firebaseUid:user.uid,
        role:'user'
      };

      axiosPublic.post("/user", userInfo).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your signUp has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log("social login")
      });
       navigate(from, { replace: true } || '/');
    });
  };
  return (
    <div>
      <div className="flex justify-center p-5">
      <button onClick={handlelogin} className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-all">
          <FcGoogle className="text-2xl" />
          <span className="font-medium">Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
