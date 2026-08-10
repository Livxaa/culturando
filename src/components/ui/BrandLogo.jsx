import logo from '../../assets/img/logo.png'

export default function BrandLogo({ dark = false }) {
  return <img className={`brand-logo${dark ? ' brand-logo--dark' : ''}`} src={logo} alt="Culturando" />
}
