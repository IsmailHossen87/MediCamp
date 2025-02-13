import Profile from "../Components/Profile";
import useRole from "../Hooks/useRole";

const ReausableProfile = () => {
    const [role]= useRole()
    return (
        <div>
            <Profile role={role}/>
        </div>
    );
};

export default ReausableProfile;