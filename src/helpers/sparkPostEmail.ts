import config from '../config/config';
import * as request from 'request';

const url: string = config.development.sparkPost.url;
const headers: object = {
    'content-type': config.development.sparkPost.contentTtype,
    'Authorization': config.development.sparkPost.authorization,
};
//pending through generics 
let payload = {
    "content": {
        "from": {
            "name": config.development.sparkPost.name,
            "email": config.development.sparkPost.email
        },
        "subject": config.development.sparkPost.subject,
        "html": '',
    },
    "recipients": []
};

const sendEmail = async (user: string, otp: string, recipientEmail: string): Promise<string> => {
    try {
        let body: string = getBody(user, otp, recipientEmail);

        return new Promise((resolve, reject) => {
            request.post({
                headers: headers,
                url: url,
                body: body
            }, function (resp: string) {
                console.log(resp);
                resolve(resp)
            });
        });
    } catch (err) {
        console.error(err);
        return err;
    }
}
function getBody(user: string, otp: string, recipientEmail: string): string {
    let date: Date = getDate();
    let day: number = date.getDate();
    let month: number = date.getMonth() + 1;
    let year: number = date.getFullYear();
    payload.recipients = [];
    // payload.recipients.push({ 'address': recipientEmail });//issue
    payload.content.html = `
    <head>
    <style>
        h4 {
            font-family: calibri;
            font-size: 100%;
            font-weight: normal;
        }
        strong {
            font-size: 130%;
        }
    </style>
    </head>
    <h4>
    <h3 style="width:100%; background-color: #5DD2B1;">
        &ensp;<img src="${config.development.url}:${config.development.node_port}/logo.png" width="200">
    </h3>
    <br>
    Dear <b>${user}</b>,
    <br><br>Congratulations, your new credit card is on its way!<br>
    <br><b>According to our records you will receive it on ${day}-${month}-${year}.</b> If you do not receive your card by that
    <br>date, please contact us immediately at 1-800-610-8618.
    <br><br>Once you receive your card, you will have to <b>activate it</b> by following the steps below:
    <br><br>&emsp;1.&ensp;Download and install our Mobile Banking App.
    <br>&emsp;&ensp;&ensp;&nbsp;<img src="${config.development.url}:${config.development.node_port}/apple.png" width="100">&ensp;
    <img src="${config.development.url}:${config.development.node_port}/google.png" width="100">
    <br>&emsp;2.&ensp;Once it’s installed, open it, choose “Menu” and click on “Activate Your Card”.
    <br>&emsp;3.&ensp;You will then be asked to enter your One Time Password, which is <strong>${otp}.</strong>
    <br>&emsp;4.&ensp;After your card is activated you will be given the option to create a new
    PIN for your card.
    <br>&nbsp;&emsp;&emsp;We strongly suggest that you select a new PIN.
    <br><br>That’s it!
    <br><br>Thank you for choosing G+D Banking Card
    <br>
    <br>
    <h3 style="width:100%; background-color: #5DD2B1;">
        <img src="${config.development.url}:${config.development.node_port}/footer.png" width="200">
    </h3>
    </h4>`;
    return JSON.stringify(payload);
}
function getDate(): Date {
    let toDay: Date = new Date();
    let comingDay: number = toDay.setDate(toDay.getDate() + 5);
    return new Date(comingDay);
}
export = { sendEmail }