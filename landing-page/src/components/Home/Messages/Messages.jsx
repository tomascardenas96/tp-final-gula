import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import "./Messages.css";

function Messages() {
  return (
    <section className="messages_container">
      <FaEnvelope className="messages_envelope" />
      <p className="messages_text">Mensajes</p>
      <MdOutlineKeyboardDoubleArrowUp className="messages_arrow" />
    </section>
  );
}

export default Messages;
