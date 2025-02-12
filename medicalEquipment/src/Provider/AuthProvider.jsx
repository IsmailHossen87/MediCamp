import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import auth from "../Authentication/Firebase/Firebase";

export const AuthContext = createContext(null);
const googleProvider=new GoogleAuthProvider()
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // step1  popUp
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // step2 create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // stpe 3 signIn
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
       // signOut
       const logOut =()=>{
        setLoading(true)
        return signOut(auth)
    }


  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => { 
        setUser(currentUser)
        setLoading(false)
        
      // setUser(currentUser)
    //   if(currentUser){
    //     const userInfo = {email:currentUser?.email}
    //     axiosPublic.post('/jwt',userInfo)
    //     .then(res=>{
    //       if(res.data.token){
    //         localStorage.setItem('token',res.data?.token)
    //         setUser(currentUser)
    //         setLoading(false)
    //       }
    //     })
    //   }else{
    //     localStorage.removeItem('token')
    //     setUser(null)
    //     setLoading(false)
    //   }
    }); 

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    googleLogin,
    createUser,
    signIn,
    updateUserProfile,
    logOut
  };
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
