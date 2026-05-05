"use client";

import { useState } from "react";
import { organizationTypes } from "@/components/landing/content";

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setFormStatus("Enviando sua solicitação...");

    try {
      const response = await fetch("https://formsubmit.co/ajax/heliofpjunior@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("FormSubmit request failed");
      }

      form.reset();
      setFormStatus("Recebemos sua solicitação. A equipe Suda Core retornará em breve.");
    } catch {
      setFormStatus("Não foi possível enviar agora. Tente novamente em instantes.");
    } finally {
      setIsSubmitting(false);
    }
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
        <input type="hidden" name="_subject" value="Novo contato pelo site Suda Core" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="text" name="_honey" style={{ display: "none" }} tabIndex="-1" />
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
        <button className="button primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Solicitar diagnóstico"}
        </button>
        <p className="form-status" role="status" aria-live="polite">
          {formStatus}
        </p>
      </form>
    </section>
  );
}
