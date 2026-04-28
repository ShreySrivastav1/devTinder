const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const sesClient = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});

const sendEmail = async (to, subject, body) => {
    const command = new SendEmailCommand({
        Source: "shreysrivastav134678@gmail.com",
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Subject: {
                Data: subject,
            },
            Body: {
                Text: {
                    Data: body,
                },
            },
        },
    });

    return await sesClient.send(command);
};

module.exports = sendEmail;