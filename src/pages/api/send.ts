import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const apiKey = import.meta.env.RESEND_API_KEY;
console.log(
  "[send.ts] RESEND_API_KEY present:",
  !!apiKey,
  "length:",
  apiKey?.length,
);

const resend = new Resend(apiKey);

export const POST: APIRoute = async ({ request }) => {
  console.log("[send.ts] POST handler called");
  console.log("[send.ts] Request method:", request.method);
  console.log("[send.ts] Request URL:", request.url);

  try {
    const formData = await request.formData();
    console.log("[send.ts] FormData parsed successfully");

    const nombre = formData.get("nombre") as string;
    const apellido = formData.get("apellido") as string;
    const metodoContacto = formData.get("metodo_contacto") as string;
    const contactoDato = formData.get("contacto_dato") as string;
    const mensaje = formData.get("mensaje") as string;

    console.log("[send.ts] Fields:", {
      nombre,
      apellido,
      metodoContacto,
      contactoDato: !!contactoDato,
      mensaje: !!mensaje,
    });

    // Validate required fields
    if (!nombre || !apellido || !contactoDato || !mensaje) {
      console.log("[send.ts] Validation failed - missing fields");
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

    console.log("[send.ts] Attachments count:", attachments.length);

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
          <p style="margin: 0; color: #9ca3af; font-size: 12px;">Enviado desde el formulario de contacto de inkoo.es</p>
        </div>
      </div>
    `;

    console.log("[send.ts] About to call Resend API...");

    const { data, error } = await resend.emails.send({
      from: "Inkoo Web <onboarding@resend.dev>",
      to: ["marlon.morales232409@gmail.com"],
      subject: `Nueva solicitud de ${nombre} ${apellido}`,
      html,
      ...(attachments.length > 0 && { attachments }),
    });

    console.log(
      "[send.ts] Resend response - data:",
      JSON.stringify(data),
      "error:",
      JSON.stringify(error),
    );

    if (error) {
      console.error("[send.ts] Resend error:", JSON.stringify(error));
      return new Response(
        JSON.stringify({
          error: "Error al enviar el email. Inténtalo de nuevo.",
          details: error,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    console.log("[send.ts] Email sent successfully, id:", data?.id);
    return new Response(JSON.stringify({ success: true, id: data?.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    const errorStack = err instanceof Error ? err.stack : undefined;
    console.error("[send.ts] Server error:", errorMessage);
    console.error("[send.ts] Error stack:", errorStack);
    console.error(
      "[send.ts] Error object:",
      JSON.stringify(err, Object.getOwnPropertyNames(err as object)),
    );
    return new Response(
      JSON.stringify({
        error: "Error interno del servidor.",
        details: errorMessage,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
