import useGetProfile from "../../hooks/useGetProfile";
import useUpdateAccount from "../../hooks/useUpdateAccount";
import React from "react";
import "./Upload-account-form.css";
import Spinner from "../Common/Spinner/Spinner";
import Error from "../Common/Error/Error";

function UploadAccountForm() {
  const {
    uploadAccountLoading,
    userInput,
    handleSubmitUploadAccount,
    handleChangeUploadAccount,
  } = useUpdateAccount();

  const { activeUserLoading, activeUserError } = useGetProfile();

  return (
    <form onSubmit={handleSubmitUploadAccount}>
      <h1>Datos de cuenta</h1>
      {activeUserLoading ? (
        <div className="update-account_loading">
          <Spinner />
        </div>
      ) : activeUserError ? (
        <div className="update-account_error">
          <Error />
        </div>
      ) : (
        <>
          <label htmlFor="name">Nombre completo</label>
          <input
            type="text"
            name="name"
            onChange={handleChangeUploadAccount}
            value={userInput.name}
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            onChange={handleChangeUploadAccount}
            value={userInput.password}
          />
          <input type="submit" value="Guardar" />
          {uploadAccountLoading && (
            <div className="updating-account_loading">
              <Spinner />
            </div>
          )}
        </>
      )}
    </form>
  );
}

export default UploadAccountForm;
