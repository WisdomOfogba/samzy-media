import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { contactValidationSchema } from "@/lib/validations";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawData = body && typeof body === "object" && "formData" in body ? body.formData : body;

    const validatedData = contactValidationSchema.parse(rawData);

    const recipient = process.env.ADMIN_EMAIL;
    if (!recipient) {
      console.error("ADMIN_EMAIL environment variable is not defined");
      return NextResponse.json(
        { error: "Contact service is not configured on the server." },
        { status: 500 }
      );
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("SMTP_USER or SMTP_PASS environment variables are not defined");
      return NextResponse.json(
        { error: "Email delivery service is not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const safeName = escapeHtml(validatedData.name);
    const safeEmail = escapeHtml(validatedData.email);
    const safeSubject = escapeHtml(validatedData.subject);
    const safeMessage = escapeHtml(validatedData.message).replace(/\n/g, "<br/>");

    await transporter.sendMail({
      from: `"Samzy Media Contact App" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: validatedData.email,
      subject: `New Contact Form Submission: ${safeSubject}`,
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
        <p>${safeName}</p>

        <div class="label">Email:</div>
        <p>${safeEmail}</p>

        <div class="label">Subject:</div>
        <p>${safeSubject}</p>

        <div class="label">Message:</div>
        <p>${safeMessage}</p>

        <div class="footer">
        &copy; ${new Date().getFullYear()} Samzy Media. All rights reserved.
        </div>
    </div>
    </body>
    </html>
    `,
    });

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
