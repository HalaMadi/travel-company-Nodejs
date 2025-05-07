import nodemailer from 'nodemailer';

export async function sendEmail(to, subject, html) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        const info = await transporter.sendMail({
            from: `"AeroCanaan" <${process.env.SENDER_EMAIL}>`,
            to,
            subject,
            html,
        });
        console.log("Email sent: ", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}