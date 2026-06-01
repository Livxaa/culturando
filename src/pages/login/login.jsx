import '../../css/login.css';

function Login() {
  return (
    <div className="auth-page">

      <div className="auth-box">

        <h1>Login</h1>

        <form className="auth-form">

          <input type="text" placeholder="Usuário" />

          <input type="password" placeholder="Senha" />

          <button className="btn">
            Entrar
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;