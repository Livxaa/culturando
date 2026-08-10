import { useEffect, useRef } from 'react'
import { Form, Link, useActionData, useNavigate, useNavigation } from 'react-router-dom'
import { useAuth } from '../../context/authContext.jsx'
import BrandLogo from '../ui/BrandLogo.jsx'

export default function OrganizerLoginForm() {
  const actionData = useActionData()
  const navigation = useNavigation()
  const navigate = useNavigate()
  const { loginOrganizer } = useAuth()
  const summaryRef = useRef(null)
  useEffect(() => {
    if (actionData?.ok && actionData.session) {
      loginOrganizer(actionData.session)
      navigate('/organizador', { replace: true })
    }
    if (actionData && !actionData.ok) summaryRef.current?.focus()
  }, [actionData, loginOrganizer, navigate])
  return <section className="organizer-login" aria-labelledby="organizer-login-title"><div className="organizer-login__brand"><BrandLogo /></div><div className="organizer-login__card"><p className="eyebrow">Portal para empresas</p><h1 id="organizer-login-title" tabIndex="-1">Área do organizador</h1><p>Acesse o espaço profissional da Culturando para publicar experiências acessíveis.</p><Form method="post" className="organizer-form" noValidate>{actionData && !actionData.ok && <div ref={summaryRef} className="form-error-summary" tabIndex="-1" role="alert"><strong>Revise seus dados.</strong><ul>{Object.entries(actionData.fieldErrors || {}).map(([key, value]) => <li key={key}><a href={`#organizer-${key}`}>{value}</a></li>)}</ul></div>}<div className="form-field"><label htmlFor="organizer-email">E-mail profissional *</label><input id="organizer-email" name="email" type="email" autoComplete="email" required aria-describedby="organizer-email-help" defaultValue={actionData?.values?.email || ''} /><p id="organizer-email-help" className="field-help">Use o e-mail que sua equipe utiliza para administrar eventos.</p>{actionData?.fieldErrors?.email && <p className="field-error">{actionData.fieldErrors.email}</p>}</div><div className="form-field"><label htmlFor="organizer-password">Senha *</label><input id="organizer-password" name="password" type="password" autoComplete="current-password" required aria-describedby="organizer-password-help" /><p id="organizer-password-help" className="field-help">A senha deve ter pelo menos 6 caracteres.</p>{actionData?.fieldErrors?.password && <p className="field-error">{actionData.fieldErrors.password}</p>}</div><button className="button button--primary" type="submit" disabled={navigation.state === 'submitting'}>{navigation.state === 'submitting' ? 'Entrando…' : 'Entrar como organizador'}</button></Form><p className="organizer-login__back"><Link to="/">Voltar para a experiência de compradores</Link></p></div></section>
}
