import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './src/context/authContext.jsx'
import { router } from './src/routes/index.jsx'

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
