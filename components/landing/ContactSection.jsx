"use client";

import { useState } from "react";
import { organizationTypes } from "@/components/landing/content";

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    setFormStatus("Recebemos sua solicitação. A equipe Suda Core retornará em breve.");
  }

  return (
    <section className="contact" id="contato">
      <div>
        <p className="eyebrow">Fale conosco</p>
        <h2>Vamos entender o nível de organização e conformidade da sua operação?</h2>
        <p>
          Envie seus dados para receber uma primeira conversa de diagnóstico. A
          Suda Core avalia o cenário e indica os próximos passos para reduzir
          riscos fiscais, administrativos, regulatórios e institucionais.
        </p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Nome
          <input type="text" name="nome" autoComplete="name" required />
        </label>
        <label>
          E-mail
          <input type="email" name="email" autoComplete="email" required />
        </label>
        <label>
          Organização
          <input type="text" name="instituicao" autoComplete="organization" />
        </label>
        <label>
          Tipo de organização ou empresa
          <select name="tipo" defaultValue="">
            <option value="" disabled>
              Selecione
            </option>
            {organizationTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          Mensagem
          <textarea name="mensagem" rows="4" />
        </label>
        <button className="button primary" type="submit">
          Solicitar diagnóstico
        </button>
        <p className="form-status" role="status" aria-live="polite">
          {formStatus}
        </p>
      </form>
    </section>
  );
}
