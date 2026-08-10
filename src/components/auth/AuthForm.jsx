import { useEffect, useRef } from 'react'
import { Form, Link, useActionData, useNavigation } from 'react-router-dom'
import { ROUTES } from '../../data/routes'
import Button from '../ui/Button'
import StatusMessage from '../ui/StatusMessage'
import FormField from './FormField'
import PasswordField from './PasswordField'

export default function AuthForm({ mode }) {
  const actionData = useActionData()
  const navigation = useNavigation()
  const summaryRef = useRef(null)
  const isRegister = mode === 'register'
  const isSubmitting = navigation.state === 'submitting'
  const errors = actionData?.fieldErrors || {}

  useEffect(() => {
    if (actionData?.ok === false) summaryRef.current?.focus()
  }, [actionData])

  return (
    <div className="auth-form-shell">
      {actionData?.message && (
        <div ref={summaryRef} tabIndex="-1" className="auth-form__status">
          <StatusMessage tone={actionData.ok ? 'success' : 'error'}>{actionData.message}</StatusMessage>
        </div>
      )}
      <Form method="post" className="auth-form">
        {isRegister && (
          <FormField id="fullName" label="Nome completo" error={errors.fullName} required>
            {({ describedBy }) => (
              <input id="fullName" name="fullName" type="text" autoComplete="name" required aria-invalid={Boolean(errors.fullName)} aria-describedby={describedBy} />
            )}
          </FormField>
        )}
        <FormField id="email" label="E-mail" error={errors.email} required>
          {({ describedBy }) => (
            <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={describedBy} />
          )}
        </FormField>
        <PasswordField id="password" label="Senha" error={errors.password} describedBy={errors.password ? 'password-error' : undefined} />
        {isRegister && (
          <FormField id="state" label="Estado" error={errors.state} required>
            {({ describedBy }) => (
              <select id="state" name="state" defaultValue="" required aria-invalid={Boolean(errors.state)} aria-describedby={describedBy}>
                <option value="" disabled>Selecione seu estado</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
              </select>
            )}
          </FormField>
        )}
        <Button type="submit" disabled={isSubmitting} className="auth-form__submit">
          {isSubmitting ? 'Enviando...' : isRegister ? 'Cadastrar' : 'Entrar'}
        </Button>
      </Form>
      <p className="auth-form__switch">
        {isRegister ? 'Já tem uma conta?' : 'Ainda não tem uma conta?'}{' '}
        <Link to={isRegister ? ROUTES.LOGIN : ROUTES.REGISTER}>
          {isRegister ? 'Entrar' : 'Cadastre-se'}
        </Link>
      </p>
    </div>
  )
}
