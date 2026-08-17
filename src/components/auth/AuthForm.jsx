import { useEffect, useRef, useState } from 'react'
import { Form, useActionData, useNavigation } from 'react-router-dom'
import { useAuth } from '../../context/authContext.jsx'
import AuthLayout from './AuthLayout.jsx'
import FormField from './FormField.jsx'
import PasswordField from './PasswordField.jsx'
import StatusMessage from '../ui/StatusMessage.jsx'

const initialValues = { name: '', email: '', password: '', state: '' }

export default function AuthForm({ mode = 'login' }) {
  const isRegister = mode === 'register'
  const actionData = useActionData()
  const navigation = useNavigation()
  const { login } = useAuth()
  const [values, setValues] = useState(initialValues)
  const summaryRef = useRef(null)
  const fieldErrors = actionData?.fieldErrors || {}
  const submitting = navigation.state === 'submitting'

  useEffect(() => {
    if (actionData?.values) setValues((current) => ({ ...current, ...actionData.values }))
    if (actionData?.ok && actionData.session) login(actionData.session)
    if (actionData && !actionData.ok) summaryRef.current?.focus()
  }, [actionData, login])

  const update = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
  return <AuthLayout
    title={isRegister ? 'Criar cadastro' : 'Entrar na Culturando'}
    eyebrow={isRegister ? 'Faça parte da agenda' : 'Bem-vindo de volta'}
    description={isRegister ? 'Salve suas experiências culturais e acompanhe seus ingressos.' : 'Encontre eventos que respeitam seu tempo, seu corpo e sua forma de viver a cultura.'}
    alternateText={isRegister ? 'Já tem uma conta?' : 'Ainda não tem uma conta?'}
    alternateLabel={isRegister ? 'Entrar' : 'Criar cadastro'}
    alternateTo={isRegister ? '/login' : '/cadastro'}
  >
    <Form method="post" className="auth-form" noValidate>
      {actionData && !actionData.ok && <div ref={summaryRef} className="form-error-summary" tabIndex="-1" role="alert"><strong>Revise os campos destacados.</strong><ul>{Object.entries(fieldErrors).map(([key, message]) => <li key={key}><a href={`#${key}`}>{message}</a></li>)}</ul></div>}
      {actionData?.ok && <StatusMessage variant="success" title={actionData.message} />}
      {isRegister && <FormField id="name" label="Nome completo" error={fieldErrors.name} help="Como podemos chamar você?" required>{(props) => <input {...props} name="name" type="text" autoComplete="name" value={values.name} onChange={update} />}</FormField>}
      <FormField id="email" label="E-mail" error={fieldErrors.email} help="Nunca compartilharemos seu e-mail sem sua autorização." required>{(props) => <input {...props} name="email" type="email" autoComplete="email" value={values.email} onChange={update} />}</FormField>
      <PasswordField id="password" error={fieldErrors.password} value={values.password} onChange={update} autoComplete={isRegister ? 'new-password' : 'current-password'} />
      {isRegister && <FormField id="state" label="Estado" error={fieldErrors.state} help="Escolha o estado onde você vive." required>{(props) => <select {...props} name="state" autoComplete="address-level1" value={values.state} onChange={update}><option value="">Selecione seu estado</option><option value="SP">São Paulo</option><option value="RJ">Rio de Janeiro</option><option value="MG">Minas Gerais</option><option value="BA">Bahia</option></select>}</FormField>}
      <button className="button button--primary auth-form__submit" type="submit" disabled={submitting}>{submitting ? 'Enviando…' : isRegister ? 'Criar cadastro' : 'Entrar'}</button>
    </Form>
  </AuthLayout>
}
