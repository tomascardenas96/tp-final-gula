import React from "react";
import useRegister from "../../hooks/useRegister";
import "./Register.css";
import useShowHidePassword from "../../hooks/useShowHidePassword";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

function Register() {
  const { togglePasswordVisibility, showPassword } = useShowHidePassword();
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

  return (
    <main className="register-page_container">
      <section className="register-page_form">
        <aside>
          <h1>Unite a nuestra comunidad...</h1>
          <form onSubmit={handleSubmitRegister}>
            <div className="register-input_name">
              <label htmlFor="name">
                Nombre completo
                <input
                  type="text"
                  name="name"
                  onChange={handleChangeRegister}
                  value={userData.name}
                />
                {userNameError && (
                  <p className="register-input-error "> {userNameError}</p>
                )}
              </label>
            </div>
            <div className="register-input_email">
              <label htmlFor="email">
                Email
                <input
                  type="text"
                  name="email"
                  onChange={handleChangeRegister}
                  value={userData.email}
                />
                {emailError && (
                  <p className="register-input-error">{emailError}</p>
                )}
              </label>
            </div>
            <div className="register-input_password">
              <label htmlFor="password">
                Contraseña
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChangeRegister}
                  value={userData.password}
                />
                {/* Contraseña visible/oculta */}
                <div
                  onClick={togglePasswordVisibility}
                  className="toggle-show-password"
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </div>
                {passwordError && (
                  <p className="register-input-error">{passwordError}</p>
                )}
              </label>
            </div>
            <div className="register-input_confirm-password">
              <label htmlFor="confirm-password">
                Confirmar contraseña
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirm-password"
                  onChange={handleChangeRegister}
                />
                {passwordConfirmError && (
                  <p className="register-input-error">{passwordConfirmError}</p>
                )}
              </label>
            </div>
            <div className="register-input_location">
              <label htmlFor="location">
                Localidad
                <input
                  type="text"
                  name="location"
                  onChange={handleChangeRegister}
                  value={userData.location}
                />
                {locationError && (
                  <p className="register-input-error">{locationError}</p>
                )}
              </label>
            </div>
            <div className="register-input_birthdate">
              <label htmlFor="birthDate">
                Fecha de nacimiento
                <input
                  type="date"
                  name="birthDate"
                  onChange={handleChangeRegister}
                  value={userData.birthDate}
                />
                {birthDateError && (
                  <p className="register-input-error">{birthDateError}</p>
                )}
              </label>
            </div>
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
      <section className="register-page_footer">
        <p>Todos los derechos reservados - 2024</p>
        <p>©Gula</p>
      </section>
    </main>
  );
}

export default Register;
