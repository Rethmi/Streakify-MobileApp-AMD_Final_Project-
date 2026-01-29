// import { useLoader } from "@/hooks/useLoader";
// import { auth } from "@/service/firebaseConfig";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { createContext, useEffect, useState } from "react";

// interface AuthContextType {
//     user: User | null;
//     loading: boolean;
// }

// export const AuthContext = createContext<AuthContextType> ({
//     user: null,
//     loading: false
// })

// export const AuthProvider = ({children}: {children: React.ReactNode}) => {

//     const {hideLoader, isLoading, showLoader} = useLoader();
    
//     const [user, setUser] = useState<User | null>(null);

//     useEffect(() => {
//         showLoader();

//         const unscrib = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//             hideLoader();
//         });

//         // cleanup functions (component unmount)
//         return () => unscrib();
//     } , []);

//     return <AuthContext.Provider value={{user , loading: isLoading}} ></AuthContext.Provider>
// }

// import React from "react"
// import { auth } from "@/service/firebaseConfig"
// import { onAuthStateChanged, User, sendPasswordResetEmail,signOut } from "firebase/auth"
// import {
//   createContext,
//   ReactNode,
//   use,
//   useContext,
//   useEffect,
//   useState
// } from "react"

// type AuthContextType = { user: User | null; loading: boolean }
// const AUthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true
// })

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState<boolean>(true)

//   useEffect(() => {
//     const unsubcribe = onAuthStateChanged(auth, (user) => {
//       setUser(user ?? null)
//       setLoading(false)
//     })
//     return unsubcribe
//   }, [])
//     const logout = async () => {
//     await signOut(auth);
//   };

//   return (
//     <AUthContext.Provider value={{ user, loading }}>
//       {children}
//     </AUthContext.Provider>
//   )
// }

// export const useAuth = () => {
//   return useContext(AUthContext)
// }


import React from "react"
import { auth } from "@/service/firebaseConfig"
import { onAuthStateChanged, User, signOut } from "firebase/auth"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"

// 1. Type eka update kara logout function eka include wenna
type AuthContextType = { 
  user: User | null; 
  loading: boolean;
  logout: () => Promise<void>; // Logout function eka methana thiyenna ona
}

// 2. Initial value ekata logout ekath damma
const AUthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {}, // Default empty function
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      setUser(user ?? null)
      setLoading(false)
    })
    return unsubcribe
  }, [])

  // Logout function eka
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Signout error", error);
      throw error;
    }
  };

  return (
    // 3. MEHETANA VALUE EKATA 'logout' ADD KARA
    <AUthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AUthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AUthContext)
}