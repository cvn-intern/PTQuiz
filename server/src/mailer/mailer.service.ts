import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as SMTPTransport from 'nodemailer-smtp-transport';
import { sendMailOptions } from '../auth/types/sendMail.type';

@Injectable()
export class MailerService {
    private readonly mailer;

    constructor() {
        this.mailer = nodemailer.createTransport(
            SMTPTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                },
            }),
        );
    }

    async sendMail(sendMail: sendMailOptions) {
        const { to, subject, displayName, token, type } = sendMail;
        let text = '';
        let url = '';
        if (type === 'confirm') {
            url = `${process.env.CLIENT_URL}/register/confirm/${token}`;
            text = `Hi ${displayName},\n
            Please confirm your email by clicking on the following link: ${url}\n\nThanks,\nPTQuiz`;
        } else if (type === 'reset') {
            url = `${process.env.CLIENT_URL}/forgotPassword/reset/${token}`;
            text = `Hi ${displayName},\n
            Please reset your password by clicking on the following link: ${url}\n\nThanks,\nPTQuiz`;
        }
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to,
            subject,
            text,
        };

        try {
            return await this.mailer.sendMail(mailOptions);
        } catch (error) {
            throw new Error(error);
        }
    }
}
