import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const resend = new Resend("re_PfFDfpyP_FqR8v4czRxv9ntz99PXvjZnm");
const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const nombre = formData.get("nombre");
    const apellido = formData.get("apellido");
    const metodoContacto = formData.get("metodo_contacto");
    const contactoDato = formData.get("contacto_dato");
    const mensaje = formData.get("mensaje");
    if (!nombre || !apellido || !contactoDato || !mensaje) {
      return new Response(
        JSON.stringify({
          error: "Todos los campos obligatorios deben estar completos."
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const attachments = [];
    const files = formData.getAll("adjuntos");
    for (const file of files) {
      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        attachments.push({
          filename: file.name,
          content: Buffer.from(arrayBuffer)
        });
      }
    }
    const html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 24px 32px;">
          <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">
            📩 Nueva solicitud desde Inkoo Web
          </h1>
        </div>
        <div style="padding: 28px 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px; vertical-align: top; width: 140px;">Nombre</td>
              <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 500;">${nombre} ${apellido}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Contacto (${metodoContacto})</td>
              <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 500;">${contactoDato}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Mensaje</td>
              <td style="padding: 10px 0; color: #111827; font-size: 14px; line-height: 1.6;">${mensaje.replace(/\n/g, "<br>")}</td>
            </tr>
            ${attachments.length > 0 ? `
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Adjuntos</td>
              <td style="padding: 10px 0; color: #111827; font-size: 14px;">${attachments.length} archivo(s) adjunto(s)</td>
            </tr>
            ` : ""}
          </table>
        </div>
        <div style="padding: 16px 32px; background: #f3f4f6; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; color: #9ca3af; font-size: 12px;">Enviado desde el formulario de contacto de inkoo.es</p>
        </div>
      </div>
    `;
    const { data, error } = await resend.emails.send({
      from: "Inkoo Web <onboarding@resend.dev>",
      to: ["marlon.morales232409@gmail.com"],
      subject: `Nueva solicitud de ${nombre} ${apellido}`,
      html,
      ...attachments.length > 0 && { attachments }
    });
    if (error) {
      console.error("Resend error:", error);
      return new Response(
        JSON.stringify({
          error: "Error al enviar el email. Inténtalo de nuevo."
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ success: true, id: data?.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Server error:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
