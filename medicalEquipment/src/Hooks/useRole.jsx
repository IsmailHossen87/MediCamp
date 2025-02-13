import useAuth from './useAuth';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const axiosSecure= UseAxiosSecure()
    const {user}= useAuth()
    const {data:role='user',refetch}= useQuery({
       queryKey:[user?.email,'userRole'],
       queryFn:async()=>{
        const res = await axiosSecure(`/user/role/${user?.email}`)
        return res?.data.role
       } 
    })
    return [role,refetch]
};

export default useRole;