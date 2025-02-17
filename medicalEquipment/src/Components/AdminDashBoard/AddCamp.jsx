import { useForm } from "react-hook-form";
import { FaLandmark } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const AddCamp = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    const { data: res } = await axiosPublic.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOSTING
      }`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.success) {
      const campData = {
        name: data.name,
        campFees:data.campFees,
        dataTime:data.datetime,
        location: data.location,
        Healthcare:data.Healthcare,
        description:data.message,
        image: res.data.display_url,
        AdminEmail: user?.email,
        // sellerName: user?.displayName,
        // sellerImage: user?.photoURL,
        // verification: "pending",
      };
      const menuData = await axiosSecure.post("/addCamp", campData);
      if (menuData.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/ManageCamp");
      }
    }
  };

  return (
    <div>
      <div className="bg-gray-50 lg:py-10 py-0 sm:px-6 md:p-8 ">
        <div className="lg:w-4/5  mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Add Property
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Camp Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Camp Name
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Enter Camp Name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              />
            </div>

            {/* Camp Fees */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Camp Fees
              </label>
              <div className="mt-1">
                {/* Minimum Price */}
                <input
                  {...register("campFees", { required: true })}
                  type="number"
                  placeholder="Enter Camp Fees"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                />
              </div>
            </div>
            {/* DateTime Input */}
            <div>
              <label className="block text-lg font-semibold">
                Select Date & Time
              </label>
              <input
                type="datetime-local"
                {...register("datetime", {
                  required: "Date and time are required",
                })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Property Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                {...register("location", { required: true })}
                type="text"
                placeholder="Enter property location"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              />
            </div>

            {/* Healthcare Professional Name*/}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Healthcare Professional Name
              </label>
              <input
                {...register("Healthcare", { required: true })}
                type="text"
                placeholder="Enter Healthcare Professional Name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              />
            </div>
            {/* Description */}
            <div>
              <label className="block text-lg font-semibold">
                Your Message
              </label>
              <textarea
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Minimum 10 characters required",
                  },
                })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Type your message here..."
              />
            </div>

            {/* File Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <input
                type="file"
                {...register("image", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 file:bg-lime-500 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg hover:file:bg-lime-600"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-3 text-white bg-lime-500 hover:bg-lime-600 rounded-lg shadow-lg font-medium transition-all"
              >
                <FaLandmark className="mr-2" /> Add Camp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCamp;
