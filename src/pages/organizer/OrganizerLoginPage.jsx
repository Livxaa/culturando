import AuthLayout from '../../components/auth/AuthLayout'
import OrganizerLoginForm from '../../components/organizer/OrganizerLoginForm'

export default function OrganizerLoginPage() {
  return (
    <AuthLayout title="Área do organizador" eyebrow="Publique experiências mais acessíveis">
      <OrganizerLoginForm />
    </AuthLayout>
  )
}
