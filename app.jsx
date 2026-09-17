import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './src/context/authContext.jsx'
import { router } from './src/routes/index.jsx'
import {AudioReader} from './src/components/audioDrescricao/AudioReader.jsx' 

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <AudioReader />
    </AuthProvider>
  )
}
