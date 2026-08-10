import '../../css/organizer.css'
import AccessibilityInfoTabs from '../../components/organizer/AccessibilityInfoTabs.jsx'

export default function AccessibilityInfoPage() { return <section className="organizer-guide page-section" aria-labelledby="accessibility-guide-title"><div className="container"><p className="eyebrow">Boas práticas para empresas</p><h1 id="accessibility-guide-title" tabIndex="-1">Guia de acessibilidade para eventos</h1><p className="organizer-guide__intro">Informação clara ajuda a equipe a acolher pessoas com deficiência com respeito, autonomia e segurança.</p><AccessibilityInfoTabs /></div></section> }
