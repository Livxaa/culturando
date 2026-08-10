import { RouterProvider } from 'react-router-dom'
import router from './src/routes'
import { AuthProvider } from './src/context/authContext'

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
