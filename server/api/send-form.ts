import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const emailTo = process.env.EMAIL_TO;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });

  try {
    await transporter.sendMail({
      from: `Promna`,
      to: emailTo,
      subject: body.subject || 'No subject',
      text: body.text || 'No message',
      html: body.html || undefined,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Email sending error:', error);
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
