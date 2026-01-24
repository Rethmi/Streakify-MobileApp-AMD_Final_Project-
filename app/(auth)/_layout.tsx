// import { View, Text } from 'react-native'
// import React from 'react'
// import { Stack } from 'expo-router'
// import { StackScreen } from 'react-native-screens'

// const AuthLayout = () => {
//   return (
//     <Stack
//         screenOptions={{
//             headerShown: true,   // title bar eka nopene (false)
//             animation: "slide_from_right"  // animations damiya hakiya
//         }}
//     >
//         <Stack.Screen name="login" options={{title: " Login"}}/>
//         <Stack.Screen name='register' options={{title: " Register"}} />
//     </Stack>
//   )
// }

// export default AuthLayout
import { View, Text } from "react-native"
import React from "react"
import { Stack } from "expo-router"

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right"
      }}
    >
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Login" }} />
    </Stack>
  )
}

export default AuthLayout
