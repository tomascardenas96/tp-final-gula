import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
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
              <form>
                <label htmlFor="email">
                  Email
                  <input type="text" name="email" />
                </label>
                <label htmlFor="password">
                  Contraseña
                  <input type="password" name="password" />
                </label>
                <div>
                  <input type="submit" value="Entrar" />
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
