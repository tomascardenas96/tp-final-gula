import useGetProfile from "../../hooks/useGetProfile";
import useUpdateAccount from "../../hooks/useUpdateAccount";
import React from "react";
import "./Upload-account-form.css";

function UploadAccountForm() {
  const {
    uploadAccountError,
    uploadAccountLoading,
    userInput,
    handleSubmitUploadAccount,
    handleChangeUploadAccount,
  } = useUpdateAccount();

  const { activeUserLoading, userImageURL, userImageName } = useGetProfile();

  return (
    <form onSubmit={handleSubmitUploadAccount}>
      <h1>Datos de cuenta</h1>
      {activeUserLoading ? (
        <h1>Loading</h1>
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
        </>
      )}
    </form>
  );
}

export default UploadAccountForm;
