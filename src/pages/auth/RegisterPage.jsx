import AuthLayout from '../../components/auth/AuthLayout'
import AuthForm from '../../components/auth/AuthForm'
import '../../css/auth.css'

export default function RegisterPage() {
  return (
    <AuthLayout title="Cadastro" eyebrow="Faça parte da comunidade">
      <AuthForm mode="register" />
    </AuthLayout>
  )
}
