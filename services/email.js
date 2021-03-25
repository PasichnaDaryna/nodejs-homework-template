const Mailgen = require('mailgen')
const sgMail = require('@sendgrid/mail')
const config = require('../config/email.json')
require('dotenv').config()

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailService {
    #sender = sgMail
    #generateTemplate = Mailgen

    sendEmail(verifyToken, email, name) {
        switch (env) {
            case 'development':
                this.link = config.dev

                break;

            case 'stage':
                this.link = config.stage
                break;

            case 'production':
                this.link = config.prod
                break;

            default:
                break;
        }
    }
    #createTemplate(verifyToken, name = "Guest") {
        const mailGenerator = new this.#generateTemplate({
            theme: 'neopolitan',
            product: {

                name: 'System Contacts',
                link: this.link

            }
        });

        const template = {
            body: {
                name: 'John Appleseed',
                intro: 'This is intro',
                action: {
                    instructions: 'To finish the registration click the button',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Confirm your account',
                        link: `${this.link}/api/users/verify${verifyToken}`
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }

        };
        return mailGenerator.generate(template)
    }



    async sendEmail(verifyToken, email, name) {
        const emailBody = this.#createTemplate(verifyToken, name)
        this.#sender.setApiKey(process.env.SENDGRID_API_KEY)

        const msg = {
            to: email,
            from: 'check-contacts-hw@gmail.com', // Use the email address or domain you verified above
            subject: 'Confirm registration',
            html: emailBody,
        }

        await this.#sender.send(msg)
    }


}






module.exports = EmailService