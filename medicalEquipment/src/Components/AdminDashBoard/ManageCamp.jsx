import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import {  MdDelete } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageCamp = () => {
    const {user}= useAuth()
  const axiosSecure = UseAxiosSecure();
  const { data: campingData = [], refetch } = useQuery({
    queryKey: ["buyersData"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/manageCamp/${user?.email}`);
      return data;
    },
  });

    const handleDelete = (id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              axiosSecure.delete(`/deleteItem/${id}`).then((res) => {
                if (res.data.deletedCount) {
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                  refetch();
                }
              });
            }
          });
    }

  return (
    <>
      <div className="md:mx-5 overflow-x-auto">
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='py-3.5 px-4 text-sm font-normal text-left text-gray-500'>No</th>
            <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Thumbale</th>
            <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Camp Name</th>
            <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Camp Fee</th>
            <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Update</th>
            <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Remove</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {campingData.map((item, index) => (
            <tr key={item._id}>
              <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>{index + 1}</td>
              <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>
                <img src={item.image} alt={item.name} className='rounded-full w-16 h-16 object-cover' />
              </td>
              <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>{item.name}</td>
              <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>${item.campFees}</td>
              <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <button
                  className=' hover:text-red-500 text-white bg-blue-800 p-3 rounded-xl text-2xl focus:outline-none'
                >
                <Link to={`/dashboard/updateCamp/${item._id}`}> <FaEdit></FaEdit></Link>
                </button>
              </td>
              <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <button
                  onClick={() => handleDelete(item._id)}
                  className='  text-white bg-red-500 p-3 rounded-xl text-2xl focus:outline-none'
                  >
                 <MdDelete></MdDelete>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default ManageCamp;
