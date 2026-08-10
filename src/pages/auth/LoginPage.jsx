import AuthLayout from '../../components/auth/AuthLayout'
import AuthForm from '../../components/auth/AuthForm'
import '../../css/auth.css'

export default function LoginPage() {
  return (
    <AuthLayout title="Entrar" eyebrow="Sua próxima experiência começa agora">
      <AuthForm mode="login" />
    </AuthLayout>
  )
}
