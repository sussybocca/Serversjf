import nodemailer from "nodemailer";
import { getSecrets } from "./secrets/getSecrets.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success: false });

  const { email, username, code } = req.body;
  const { EMAIL_USER, EMAIL_PASS } = getSecrets();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: EMAIL_USER, pass: EMAIL_PASS }
  });

  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: "Your verification code",
      text: `Hello ${username}, your code is: ${code}`
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
}

