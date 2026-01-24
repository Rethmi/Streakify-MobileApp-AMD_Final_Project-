// // context/LoaderContext.tsx
// import React, { createContext, useState, ReactNode } from "react"
// import { View, ActivityIndicator } from "react-native"

// interface LoaderContextProps {
//   showLoader: () => void
//   hideLoader: () => void
//   isLoading: boolean
// }

// export const LoaderContext = createContext<LoaderContextProps>({
//   showLoader: () => {},
//   hideLoader: () => {},
//   isLoading: false
// })

// export const LoaderProvider = ({ children }: { children: ReactNode }) => {
//   const [isLoading, setIsLoading] = useState(false)

//   const showLoader = () => setIsLoading(true)
//   const hideLoader = () => setIsLoading(false)

//   return (
//     <LoaderContext.Provider value={{ showLoader, hideLoader, isLoading }}>
//       {children}

//       {isLoading && (
//         <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black/30">
//           <View className="bg-white p-6 rounded-2xl shadow-lg">
//             <ActivityIndicator size="large" color="#1e40af" />
//           </View>
//         </View>
//       )}
//     </LoaderContext.Provider>
//   )
// }
import React, { createContext, useContext, useState, ReactNode } from "react"
import Loader from "@/components/Loader"

interface LoaderContextType {
  showLoader: () => void
  hideLoader: () => void
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined)

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false) 

  const showLoader = () => setVisible(true)
  const hideLoader = () => setVisible(false)

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      <Loader visible={visible} />
    </LoaderContext.Provider>
  )
}

export const useLoader = () => {
  const context = useContext(LoaderContext)
  if (!context) throw new Error("useLoader must be used within LoaderProvider")
  return context
}
