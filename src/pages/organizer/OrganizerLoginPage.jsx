import '../../css/organizer.css'
import OrganizerLoginForm from '../../components/organizer/OrganizerLoginForm.jsx'
import AccessibilityBar from '../../components/layout/AccessibilityBar.jsx'
import { AccessibilityProvider } from '../../context/AccessibilityContext.jsx'

export default function OrganizerLoginPage() {
  return (
    <AccessibilityProvider>
      <AccessibilityBar />
      <OrganizerLoginForm />
    </AccessibilityProvider>
  )
}
