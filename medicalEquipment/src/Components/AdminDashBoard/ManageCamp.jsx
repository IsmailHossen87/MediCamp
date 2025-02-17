import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { MdCancel, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

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

//   const handleStatusChange = (userId, status) => {
//     axiosSecure.patch("/status", { userId, status }).then((res) => {
//       if (res.data.success) {
//         Swal.fire("Success", `User has been updated to ${status}`, "success");
//       }
//       refetch();
//     });
//   };

    const handleDelete = ()=>{
        console.log("delete")
    }
  return (
    <>
      <div className="md:mx-5 overflow-x-auto">
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='py-3.5 px-4 text-sm font-normal text-left text-gray-500'>No</th>
            <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Item Image</th>
            <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Item Name</th>
            <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Price</th>
            <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Action</th>
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
                  onClick={() => handleDelete(item._id)}
                  className='text-gray-500 hover:text-red-500 text-2xl focus:outline-none'
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
