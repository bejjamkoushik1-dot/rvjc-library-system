/**
 * Send OTP email. Configure via environment variables:
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM
 * If SMTP_USER is not set, OTP is only logged to console (for development).
 */
const nodemailer = require('nodemailer');

const FROM = process.env.MAIL_FROM || process.env.SMTP_USER || 'noreply@rvrjc-library.edu';
const LIBRARY_NAME = 'R.V.R & J.C College of Engineering Library';

function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT, 10) || 587;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  });
}

function sendOTP(toEmail, otp, callback) {
  const transporter = getTransporter();
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
      <h2 style="color: #0066b3;">${LIBRARY_NAME}</h2>
      <p>Your verification code is:</p>
      <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #0066b3;">${otp}</p>
      <p>This code expires in 10 minutes. Do not share it with anyone.</p>
      <p style="color: #666; font-size: 12px;">If you did not request this, please ignore this email.</p>
    </div>
  `;
  const text = `Your ${LIBRARY_NAME} verification code is: ${otp}. It expires in 10 minutes.`;

  if (!transporter) {
    console.log('[Mail] SMTP not configured. OTP for', toEmail, ':', otp);
    return callback(null);
  }

  transporter.sendMail(
    {
      from: FROM,
      to: toEmail,
      subject: `Your verification code - ${LIBRARY_NAME}`,
      text,
      html
    },
    (err) => {
      if (err) {
        console.error('[Mail] Send failed:', err.message);
        return callback(err);
      }
      callback(null);
    }
  );
}

function sendPasswordReset(toEmail, resetLink, callback) {
  const transporter = getTransporter();
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
      <h2 style="color: #0066b3;">${LIBRARY_NAME}</h2>
      <p>You requested a password reset. Click the link below to set a new password:</p>
      <p><a href="${resetLink}" style="color: #0066b3; word-break: break-all;">${resetLink}</a></p>
      <p>This link expires in 1 hour. If you did not request this, please ignore this email.</p>
    </div>
  `;
  const text = `Password reset for ${LIBRARY_NAME}: ${resetLink}. This link expires in 1 hour.`;

  if (!transporter) {
    console.log('[Mail] SMTP not configured. Password reset link for', toEmail, ':', resetLink);
    return callback(null);
  }

  transporter.sendMail(
    {
      from: FROM,
      to: toEmail,
      subject: `Reset your password - ${LIBRARY_NAME}`,
      text,
      html
    },
    (err) => {
      if (err) {
        console.error('[Mail] Send failed:', err.message);
        return callback(err);
      }
      callback(null);
    }
  );
}

module.exports = { sendOTP, sendPasswordReset };
