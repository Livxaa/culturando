import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './src/context/authContext.jsx'
import { AccessibilityProvider } from './src/context/AccessibilityContext.jsx'
import { AudioReader } from './src/components/audioDescricao/AudioReader.jsx'
import { router } from './src/routes/index.jsx'

export default function App() {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        <RouterProvider router={router} />
        <AudioReader />
      </AccessibilityProvider>
    </AuthProvider>
  )
}


