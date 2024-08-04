import { TbNetworkOff } from "react-icons/tb";
import "./Error.css";

function Error() {
  return (
    <div className="error_container">
      <TbNetworkOff className="error-icon" />
      <p className="error-description">
        {" "}
        Porfavor, verifica tu conexion a internet{" "}
      </p>
    </div>
  );
}

export default Error;
