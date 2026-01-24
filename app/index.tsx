// import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
// import { Link, Redirect } from 'expo-router'
// import React from 'react'
// import '../global.css'
// import { useAuth } from '@/hooks/useAuth'

// const Index = () => {

//   const {user, loading} = useAuth();

//   if(loading){
//     return <View className='flex-1 justify-center items-center'>
//       <ActivityIndicator size={"large"} color={"#4ade80"} /> 
//       {/* karakena bole */}
//     </View>
//   }

//   if(user) {
//     return <Redirect href={'/home'} />
//   } else {
//     return <Redirect href={'/login'} />
//   }


//   // return (

//   //   <Redirect href={'/login'} />  // When open App, redirect to the login page ....

//   //   // <View className="flex-1 items-center justify-center bg-white px-6">
//   //   //   <Text className="text-2xl font-bold mb-6">
//   //   //     Welcome to Task Manager App
//   //   //   </Text>

//   //   //   <Link href="/login" asChild>
//   //   //     <TouchableOpacity className="bg-indigo-600 px-6 py-3 rounded-xl">
//   //   //       <Text className="text-white font-bold text-lg text-center">
//   //   //         Go to Login
//   //   //       </Text>
//   //   //     </TouchableOpacity>
//   //   //   </Link>
//   //   // </View>
//   // )
// }

// export default Index

import { View, Text, Pressable, Button, ActivityIndicator } from "react-native"
import React, { useEffect } from "react"
import { useRouter } from "expo-router"
import { useAuth } from "@/context/AuthContext"

const Index = () => {
  const router = useRouter()
  const { user, loading } = useAuth()
  console.log("User Data : ", user)

  useEffect(() => {
    if (!loading) {
      if (user) {
      //  router.push("/(tabs)")
      } else {
        router.push("/(auth)/authScreen")
      }
    }
  }, [user, loading])

  return loading ? (
    <View className="flex-1 w-full justify-center align-items-center">
      <ActivityIndicator size="large" />
    </View>
  ) : null
}

export default Index
