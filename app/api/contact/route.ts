// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { to, subject, formData }: { to: string; subject: string; formData: { name: string, email: string, subject: string, message: string}} = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Samzy Media Contact App" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
        margin: 0;
        padding: 0;
        font-family: "Arial", sans-serif;
        background-color: #000000;
        color: #ffffff;
        }
        .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #1a1a1a;
        border-radius: 10px;
        }
        h2 {
        font-size: 24px;
        margin-bottom: 10px;
        color: #fea85b;
        }
        p {
        font-size: 16px;
        margin: 5px 0;
        color: #cccccc;
        }
        .label {
        font-weight: bold;
        color: #c228e3;
        margin-top: 15px;
        }
        .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #777777;
        text-align: center;
        }
        @media screen and (max-width: 600px) {
        .container {
            padding: 15px;
        }
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h2>New Contact Form Submission</h2>
        <p>You've received a new message via your contact form.</p>

        <div class="label">Name:</div>
        <p>${formData.name}</p>

        <div class="label">Email:</div>
        <p>${formData.email}</p>

        <div class="label">Subject:</div>
        <p>${formData.subject}</p>

        <div class="label">Message:</div>
        <p>${formData.message}</p>

        <div class="footer">
        &copy; 2025 Your Company. All rights reserved.
        </div>
    </div>
    </body>
    </html>
    `,
    });

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
