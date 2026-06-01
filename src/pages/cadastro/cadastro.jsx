import '../../css/cadastro.css';
import '../../css/auth.css';

function Cadastro() {
  return (
    <div className="auth-page">

      <div className="auth-box">

        <h1>Cadastro</h1>

        <form className="auth-form">

          <input type="text" placeholder="Nome completo" />

          <input type="email" placeholder="Email" />

          <input type="password" placeholder="Senha" />

          <select defaultValue="Estado">
            <option disabled>Estado</option>
            <option value="SP">SP</option>
            <option value="RJ">RJ</option>
          </select>

          <button className="btn">
            Cadastrar
          </button>

        </form>

      </div>

    </div>
  );
}

export default Cadastro;