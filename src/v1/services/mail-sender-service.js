import nodemailer from 'nodemailer';
import { mailSenderOptions } from '../../config';
import logger from '../../lib/logger';

class MailSender {
  constructor(senderOptions) {
    this.transporter = nodemailer.createTransport(senderOptions);
    this.author = mailSenderOptions.auth.user;
  }

  configMailOptions(to, subject, text, html) {
    const mailOptions = {
      from: this.author,
      to,
      subject,
      text,
      html
    };
    return mailOptions;
  }

  sendMail(to, subject, text, html) {
    const mailOptions = this.configMailOptions(to, subject, text, html);

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return logger.error(error);
      }
      logger.info(`Message sent: ${info.response}`);
      logger.info(info);
      return info;
    });
  }

  testMail = (to, subject, text, html) => {
    nodemailer.createTestAccount((err, account) => {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass // generated ethereal password
        }
      });

      const mailOptions = {
        from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        return info;
      });
    });
  };
}

export default new MailSender(mailSenderOptions);
