import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const type = formData.get("type");
    const message = formData.get("message");

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    await transporter.sendMail({
        from: `"ESGProgress Contact" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL, // ← ENV VAR TARGET
        subject: `[${type}] Message from ${name}`,
        replyTo: email as string,
        text: `
Name: ${name}
Email: ${email}
Type: ${type}

${message}
    `,
    });

    return NextResponse.redirect(
        new URL("/contribute?sent=true", req.url),
        303
    );
}
