import { useEffect, useRef } from 'react'
import { Form, Link, useActionData, useNavigation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../data/routes'
import { useAuth } from '../../context/authContext'
import Button from '../ui/Button'
import StatusMessage from '../ui/StatusMessage'

export default function OrganizerLoginForm() {
  const actionData = useActionData()
  const navigation = useNavigation()
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const statusRef = useRef(null)
  const isSubmitting = navigation.state === 'submitting'

  useEffect(() => {
    if (actionData?.ok) {
      signIn(actionData.user)
      navigate(ROUTES.ORGANIZER_HOME, { replace: true })
      return
    }

    if (actionData?.ok === false) statusRef.current?.focus()
  }, [actionData, navigate, signIn])

  return (
    <div className="organizer-login-form">
      {actionData?.message && (
        <div ref={statusRef} tabIndex="-1">
          <StatusMessage tone={actionData.ok ? 'success' : 'error'}>{actionData.message}</StatusMessage>
        </div>
      )}
      <Form method="post" className="auth-form">
        <div className="form-field">
          <label htmlFor="organizer-email">E-mail profissional</label>
          <input id="organizer-email" name="email" type="email" autoComplete="email" required aria-describedby="organizer-email-help" />
          <p id="organizer-email-help" className="form-field__help">Use o e-mail que sua equipe utiliza para administrar eventos.</p>
        </div>
        <div className="form-field">
          <label htmlFor="organizer-password">Senha</label>
          <input id="organizer-password" name="password" type="password" autoComplete="current-password" minLength="6" required />
        </div>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Entrando...' : 'Entrar como organizador'}</Button>
      </Form>
      <p className="organizer-login-form__back"><Link to={ROUTES.HOME}>Voltar para a área de ingressos</Link></p>
    </div>
  )
}
