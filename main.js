const express = require('express');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

sgMail.setApiKey('your-sendgrid-api-key');

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const msg = {
        to: 'jrajesh@calpoly.edu',
        from: email,
        subject: `Contact Form Submission from ${name}`,
        text: message,
    };

    sgMail
        .send(msg)
        .then(() => res.status(200).send('Email sent successfully'))
        .catch((error) => res.status(500).send('Error sending email: ' + error));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});