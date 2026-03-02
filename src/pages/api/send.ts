import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const prerender = false;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: import.meta.env.CONTACT_EMAIL,
    pass: import.meta.env.EMAIL_PASS,
  },
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const nombre = formData.get("nombre") as string;
    const empresa = formData.get("empresa") as string;
    const metodoContacto = formData.get("metodo_contacto") as string;
    const contactoDato = formData.get("contacto_dato") as string;
    const mensaje = formData.get("mensaje") as string;

    // Validate required fields
    if (!nombre || !empresa || !contactoDato || !mensaje) {
      return new Response(
        JSON.stringify({
          error: "Todos los campos obligatorios deben estar completos.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Process attachments
    const attachments: { filename: string; content: Buffer }[] = [];
    const files = formData.getAll("adjuntos") as File[];

    for (const file of files) {
      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        attachments.push({
          filename: file.name,
          content: Buffer.from(arrayBuffer),
        });
      }
    }

    // Build email HTML
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
              <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 500;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Empresa</td>
              <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 500;">${empresa}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Contacto (${metodoContacto})</td>
              <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 500;">${contactoDato}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Mensaje</td>
              <td style="padding: 10px 0; color: #111827; font-size: 14px; line-height: 1.6;">${mensaje.replace(/\n/g, "<br>")}</td>
            </tr>
            ${
              attachments.length > 0
                ? `
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Adjuntos</td>
              <td style="padding: 10px 0; color: #111827; font-size: 14px;">${attachments.length} archivo(s) adjunto(s)</td>
            </tr>
            `
                : ""
            }
          </table>
        </div>
        <div style="padding: 16px 32px; background: #f3f4f6; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; color: #9ca3af; font-size: 12px;">Enviado desde el formulario de contacto de inkoosub.com</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Inkoo Web" <${import.meta.env.CONTACT_EMAIL}>`,
      to: import.meta.env.CONTACT_EMAIL,
      replyTo: metodoContacto === "email" ? contactoDato : undefined,
      subject: `Nueva solicitud de ${nombre} — ${empresa}`,
      html,
      attachments,
    });

    // Send confirmation email to the client (only if contact method is email)
    if (metodoContacto === "email" && contactoDato) {
      const confirmationHtml = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 32px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600;">
              Inkoo Sublimation
            </h1>
            <p style="margin: 8px 0 0; color: #d1d5db; font-size: 14px;">Personalización textil de alta calidad</p>
          </div>
          <div style="padding: 32px;">
            <p style="color: #111827; font-size: 16px; margin: 0 0 16px; line-height: 1.6;">
              Hola <strong>${nombre}</strong>,
            </p>
            <p style="color: #374151; font-size: 15px; margin: 0 0 16px; line-height: 1.6;">
              Hemos recibido tu consulta correctamente. Nuestro equipo la revisará y nos pondremos en contacto contigo lo antes posible para ofrecerte una solución de alta calidad y totalmente personalizada.
            </p>
            <p style="color: #374151; font-size: 15px; margin: 0 0 24px; line-height: 1.6;">
              Si necesitas algo urgente, no dudes en escribirnos directamente por WhatsApp:
            </p>
            <div style="text-align: center; margin: 0 0 24px;">
              <a href="https://wa.me/34633272890" style="display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 50px; font-weight: 600; font-size: 15px;">
                Escribir por WhatsApp
              </a>
            </div>
            <p style="color: #374151; font-size: 15px; margin: 0; line-height: 1.6;">
              ¡Gracias por confiar en Inkoo!
            </p>
          </div>
          <div style="padding: 16px 32px; background: #f3f4f6; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="margin: 0; color: #9ca3af; font-size: 12px;">
              Inkoo Sublimation · <a href="https://www.inkoosub.com" style="color: #9ca3af;">www.inkoosub.com</a>
            </p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"Inkoo Sublimation" <${import.meta.env.CONTACT_EMAIL}>`,
        to: contactoDato,
        subject: "Hemos recibido tu consulta - Inkoo Sublimation",
        html: confirmationHtml,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Server error:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
