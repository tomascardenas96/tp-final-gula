import React from "react";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { BsExclamationTriangleFill } from "react-icons/bs";
import Spinner from "../../components/Common/Spinner/Spinner.jsx";

function Login() {
  const token = localStorage.getItem("accessToken");

  const {
    userCredentials,
    handleChangeLogin,
    handleSubmitLogin,
    isWrongEmail,
    isWrongPassword,
    loginLoading,
  } = useLogin();

  if (token) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <main className="login-page_container">
        <section className="login-page">
          <aside className="login-page_slogan_container">
            <div className="login-page_slogan">
              <div className="login-page_slogan_title">
                <h1>
                  Bienvenido/a! a la primera App de pedidos de Benito Juarez
                </h1>
              </div>
              <div className="login-page_slogan_divider"></div>
              <div className="login-page_slogan_logo">
                <p>Tenes hambre? Tenes</p>
                <div>
                  <img
                    src="../../../assets/images/Logo-Gula-blanco.png"
                    alt="Gula-slogan-login"
                  />
                </div>
              </div>
            </div>
          </aside>
          <div className="login-page_divider"></div>
          <aside className="login-page_login_container">
            <div className="login-page_login">
              <h1>Ingresar</h1>
              <form onSubmit={handleSubmitLogin}>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={userCredentials.email}
                    onChange={handleChangeLogin}
                    required
                  />
                  {isWrongEmail && (
                    <>
                      <BsExclamationTriangleFill className="login-error-indicator" />
                      <p className="login-error">Usuario no encontrado</p>
                    </>
                  )}
                </label>
                <label htmlFor="password">
                  Contraseña
                  <input
                    type="password"
                    name="password"
                    value={userCredentials.password}
                    onChange={handleChangeLogin}
                    required
                  />
                  {isWrongPassword && (
                    <>
                      <BsExclamationTriangleFill className="login-error-indicator" />
                      <p className="login-error">Contraseña incorrecta</p>
                    </>
                  )}
                </label>
                <div className="submit-login-btn">
                  {loginLoading ? (
                    <div className="submit-login-btn_spinner">
                      <input type="submit" value="Entrar" />
                      <div className="login-spinner">
                        <Spinner />
                      </div>
                    </div>
                  ) : (
                    <input type="submit" value="Entrar" />
                  )}
                </div>
              </form>
              <p className="sign-up_link">
                <Link to="/register">
                  ¿Todavía no tenés cuenta? Registrate grátis
                </Link>
              </p>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}

export default Login;
