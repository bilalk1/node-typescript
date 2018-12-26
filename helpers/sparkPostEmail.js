const { config } = require('../config/config');
const request = require('request');

const url = config.development.sparkPost.url;
const headers = {
    'content-type': config.development.sparkPost.contentTtype,
    'Authorization': config.development.sparkPost.authorization,
};
let payload = {
    "content": {
        "from": {
            "name": config.development.sparkPost.name,
            "email": config.development.sparkPost.email
        },
        "subject": config.development.sparkPost.subject,
        "html": ''
    }, "recipients": []
};

const sendEmail = (otp, recipientEmail) => {
    try {
        let body = getBody(otp, recipientEmail);
        return new Promise((resolve, reject) => {
            request.post({
                headers: headers,
                url: url,
                body: body
            }, function (err, resp, body) {
                if (err) {
                    reject(err);
                } else {
                    let obj = JSON.parse(body);
                    (obj.hasOwnProperty('errors')) ?
                        reject(obj.errors[0]) :
                        resolve();
                }
            });
        })

    } catch (err) {
        console.error(err)
    }

}
function getBody(otp, recipientEmail) {
    payload.recipients = [];
    payload.recipients.push({ "address": recipientEmail });
    payload.content.html = `Your Verification 4 digit OTP is ${otp}`;
    return JSON.stringify(payload);
}
module.exports = { sendEmail }