import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaLandmark } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";

const UpdateCamp = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const axiosPublic = useAxiosPublic(); 
  const [propertyData, setPropertyData] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  // Fetch property details
  useEffect(() => {
    axiosSecure
      .get(`/details/${id}`)
      .then((res) => {
        setPropertyData(res.data);
        reset(res.data);
      })
      .catch((err) => console.error("Error fetching property:", err));
  }, [id]); 


  const onSubmit = async (data) => {
    try {
      let imageUrl = propertyData?.image;
      if (typeof data?.image !== 'string' && data.image[0]) {
        const formData = new FormData();
        console.log("hellow",formData)

        formData.append("image", data.image[0]);

        const res = await axiosPublic.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (res.data.success) {
          imageUrl = res.data.data.display_url;
        } else {
          throw new Error("Image upload failed.");
        }
      }
      const updatedProperty = {
        name: data.name,
        campFees: parseFloat(data.campFees),
        dateTime: data.dateTime,
        location: data.location,
        Healthcare: data.Healthcare,
        description: data.description,
        image: imageUrl,
      };
      const response = await axiosSecure.patch(`/updateData/${id}`, updatedProperty);

      if (response.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Property updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/ManageCamp");
      } else {
        Swal.fire({
          icon: "warning",
          title: "No changes were made!",
          text: "The data is already up-to-date.",
        });
      }
    } catch (error) {
      console.error("Error updating property:", error);
      Swal.fire({
        icon: "error",
        title: "Update failed!",
        text: "Something went wrong while updating the property.",
      });
    }
  };
  if (!propertyData) {
    return (
      <div className="text-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="bg-gray-50 lg:py-10 py-0 sm:px-6 md:p-8">
      <div className="lg:w-4/5 mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Update Property
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
            <input
              {...register("campFees", { required: true })}
              type="number"
              placeholder="Enter Camp Fees"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            />
          </div>

          {/* DateTime Input */}
          <div>
            <label className="block text-lg font-semibold">
              Select Date & Time
            </label>
            <input
              type="datetime-local"
              {...register("dateTime", { required: "Date and time are required" })}
            // defaultValue={propertyData?.dateTime}
            name={'dateTime'}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Property Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              {...register("location")}
              type="text"
              placeholder="Enter property location"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            />
          </div>

          {/* Healthcare Professional Name */}
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
            <label className="block text-lg font-semibold">Your Message</label>
            <textarea
              {...register("description", {
                required: "Message is required",
                minLength: { value: 10, message: "Minimum 10 characters required" },
              })}
            // value={propertyData?.message}
            name='message'
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
              {...register("image")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 file:bg-lime-500 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg hover:file:bg-lime-600"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 text-white bg-lime-500 hover:bg-lime-600 rounded-lg shadow-lg font-medium transition-all"
            >
              <FaLandmark className="mr-2" /> Update Camp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCamp;
