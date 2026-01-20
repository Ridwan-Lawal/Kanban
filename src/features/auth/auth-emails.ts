import { sendEmail } from "@/lib/nodemailer";

interface VerifyEmailProps {
  to: string;
  url: string;
  subject: string;
}

export async function sendVerificationEmail({ to, url, subject }: VerifyEmailProps) {
  await sendEmail({
    to,
    subject,
    text: `Click the link below to verify your email address: ${url}`,
    html: `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify your email</title>
    <style>
        /* Base Resets */
        body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
        
        /* Client-specific styles */
        table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        
        /* Hover effect for supported clients */
        .btn:hover { background-color: #a8a4ff !important; }
    </style>
</head>
<body style="background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 0;">

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center">
                
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); max-width: 600px; width: 100%;">
                    
                    <tr>
                      
                    
                    <td height="6" style="background-color: #635fc7; font-size: 0; line-height: 0;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="padding: 48px 40px;">
                            
                            <h2 style="margin: 0 0 24px; color: #20212c; font-size: 24px; font-weight: 700;">
                                Verify your email address
                            </h2>

                            <p style="margin: 0 0 24px; color: #828fa3; font-size: 16px; line-height: 26px;">
                                Thanks for signing up for our Kanban Platform. We want to make sure it's really you. Please click the button below to verify your account.
                            </p>

                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="left" style="padding-bottom: 32px;">
                                        <a href=${url} class="btn" style="display: inline-block; background-color: #635fc7; color: #ffffff; padding: 14px 32px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 24px; transition: background-color 0.3s ease;">
                                            Verify Email
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0 0 16px; color: #828fa3; font-size: 14px; line-height: 24px;">
                                If the button above doesn't work, copy and paste this link into your browser:
                            </p>
                            <p style="margin: 0; word-break: break-all;">
                                <a href=${url} style="color: #635fc7; text-decoration: underline; font-size: 14px;">
                                    ${url}
                                </a>
                            </p>

                            <br>
                            <hr style="border: 0; border-top: 1px solid #e4ebfa; margin: 24px 0;">

                            <p style="margin: 0; color: #828fa3; font-size: 12px;">
                                If you didn't request this email, you can safely ignore it.
                            </p>

                        </td>
                    </tr>
                </table>
                <p style="margin-top: 24px; color: #828fa3; font-size: 12px; text-align: center;">
                    &copy; 2026 Kanban App. All rights reserved.
                </p>

            </td>
        </tr>
    </table>

</body>
</html>
    `,
  });
}

export async function sendPasswordResetMail({ to, url, subject }: VerifyEmailProps) {
  await sendEmail({
    to,
    subject,
    text: `Click the link below to verify your email address: ${url}`,
    html: `
  <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset your password</title>
    <style>
        /* Base Resets */
        body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
        
        /* Client-specific styles */
        table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        
        /* Hover effect for supported clients */
        .btn:hover { background-color: #a8a4ff !important; }
    </style>
</head>
<body style="background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 0;">

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center">
                
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); max-width: 600px; width: 100%;">
                    
                    <tr>
                        <td height="6" style="background-color: #635fc7; font-size: 0; line-height: 0;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="padding: 48px 40px;">
                            
                            <h2 style="margin: 0 0 24px; color: #20212c; font-size: 24px; font-weight: 700;">
                                Reset your password
                            </h2>

                            <p style="margin: 0 0 24px; color: #828fa3; font-size: 16px; line-height: 26px;">
                                We received a request to reset the password for your Kanban Platform account. If you made this request, click the button below to choose a new password.
                            </p>

                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="left" style="padding-bottom: 32px;">
                                        <a href="${url}" class="btn" style="display: inline-block; background-color: #635fc7; color: #ffffff; padding: 14px 32px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 24px; transition: background-color 0.3s ease;">
                                            Reset Password
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0 0 16px; color: #828fa3; font-size: 14px; line-height: 24px;">
                                If the button above doesn't work, copy and paste this link into your browser:
                            </p>
                            <p style="margin: 0; word-break: break-all;">
                                <a href="${url}" style="color: #635fc7; text-decoration: underline; font-size: 14px;">
                                    ${url}
                                </a>
                            </p>

                            <br>
                            <hr style="border: 0; border-top: 1px solid #e4ebfa; margin: 24px 0;">

                            <p style="margin: 0; color: #828fa3; font-size: 12px; line-height: 20px;">
                                If you didn't ask to reset your password, you can safely ignore this email. Your password will not be changed.
                            </p>

                        </td>
                    </tr>
                </table>

                <p style="margin-top: 24px; color: #828fa3; font-size: 12px; text-align: center;">
                    &copy; 2026 Kanban App. All rights reserved.
                </p>

            </td>
        </tr>
    </table>

</body>
</html>
    `,
  });
}
