const nodemailer = require("nodemailer")


// POST REQUEST
// Email Order to Customer email
module.exports = (userEmail, userName, firstName, newPassword) => {
    console.log("RUNNING emailPasswordReset: emailing user new password")
    console.log(userEmail, newPassword)


    const transporter = nodemailer.createTransport({
        // service: 'yahoo',
        // service: 'yahoo',
        host: "smtp.office365.com",
        port: 587,
        auth: {
            // user: 'trizmocalifornia@yahoo.com',
            // pass: "duwarbsgyqmqxxlf",
            user: 'admin@ramcast.systems', //CHANGE THIS
            // user: 'tristan@merchdirectprocessing.com',
            // pass: "Natsirt627&",
            pass: "Ramcast123!", //CHANGE THIS
        }

    });

    const mailOptions = {
        // from: 'trizmocalifornia@yahoo.com',
        from: 'admin@ramcast.systems',
        // to: ["tristan@endlinesolutions.com"],
        to: ["tristan@endlinesolutions.com", userEmail], // REPLACE AFTER TESTING COMPLETE //CHANGE THIS
        subject: `Welcome to Printgalore Admin`,
        text: `Hello ${firstName}, \nA new PrintGalore Admin account has been created for you. \nPlease proceed to https://...... and use the credentials below to log in. \nAfter you log in for the first time, you will be asked to change your password. \n\n    User Name: ${userName} \n    Password: ${newPassword}`,
        // text: `Hello ${firstName}, \nA new account has been created for you. \nPlease proceed to https://ramcast-erp.herokuapp.com/ and use the credentials below to log in. \nAfter you log in for the first time, you will be asked to change your password. \n\n    User Name: ${userName} \n    Password: ${newPassword}`,
        // html: htmlTemplate
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            // sendStatus(false)
            res.json({
                success: false,
                msg: error
            })
        } else {
            console.log('Email sent: ' + info.response);
            // sendStatus(true)
            res.json({
                success: true,
                msg: info.response
            })
        }
    });

}