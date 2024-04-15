import React from "react";
import useRegister from "../../hooks/useRegister";
import "./Register.css";

function Register() {
  const {
    handleSubmitRegister,
    handleChangeRegister,
    userData,
    isRegisterLoading,
    isRegisterError,
    passwordError,
    userNameError,
    emailError,
    locationError,
    birthDateError,
    passwordConfirmError,
    userInputsError,
  } = useRegister();

  console.log(userNameError)

  return (
    <main className="register-page_container">
      <section className="register-page_form">
        <aside>
          <h1>Unite a nuestra comunidad...</h1>
          <form onSubmit={handleSubmitRegister}>
            <label htmlFor="name">
              Nombre completo
              <input
                type="text"
                name="name"
                onChange={handleChangeRegister}
                value={userData.name}
              />
            </label>
            {userNameError && (
              <>
                <p className="register-input-error">{userNameError}</p>
              </>
            )}
            <label htmlFor="email">
              Email
              <input
                type="text"
                name="email"
                onChange={handleChangeRegister}
                value={userData.email}
              />
            </label>
            {emailError && <p className="register-input-error">{emailError}</p>}
            <label htmlFor="password">
              Contraseña
              <input
                type="password"
                name="password"
                onChange={handleChangeRegister}
                value={userData.password}
              />
            </label>
            {passwordError && (
              <p className="register-input-error">{passwordError}</p>
            )}
            <label htmlFor="confirm-password">
              Confirmar contraseña
              <input
                type="password"
                name="confirm-password"
                onChange={handleChangeRegister}
              />
            </label>
            {passwordConfirmError && (
              <p className="register-input-error">{passwordConfirmError}</p>
            )}
            <label htmlFor="location">
              Localidad
              <input
                type="text"
                name="location"
                onChange={handleChangeRegister}
                value={userData.location}
              />
            </label>
            {locationError && (
              <p className="register-input-error">{locationError}</p>
            )}
            <label htmlFor="birthDate">
              Fecha de nacimiento
              <input
                type="date"
                name="birthDate"
                onChange={handleChangeRegister}
                value={userData.birthDate}
              />
            </label>
            {birthDateError && (
              <p className="register-input-error">{birthDateError}</p>
            )}
            {userInputsError ? (
              <input
                type="submit"
                value="Registrarme"
                className="button-24 unabled-submit"
                role="button"
                style={{
                  background: "#0000003c",
                  border: "1px solid #00000044",
                }}
              />
            ) : (
              <input
                type="submit"
                value="Registrarme"
                className="button-24"
                role="button"
              />
            )}
          </form>
        </aside>
      </section>
      <section className="register-page_image">
        <aside>
          <img
            src="../../../assets/images/Flyer-Moto.png"
            alt="flyer-moto-gula"
          />
        </aside>
      </section>
      <section className="register-page_footer">Footer</section>
    </main>
  );
}

export default Register;
