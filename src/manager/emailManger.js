const nodemailer = require("nodemailer");

const emailManger = async (to, text, subject ) => {

  // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "f104fa2676db69",
            pass: "a47e54dfa05a12"
        }
    });

    transport.sendMail({
        to : to,
        from : "info@expensetracker.com",
        text : text,
        subject : subject
    })   
}



module.exports = {
    emailManger
}