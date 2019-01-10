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
        "html": '',
        "inline_images": [{
            "name": "googlePlay.png",
            "type": "image/png",
            "data": "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"
        },
        {
            "name": "applePlay.png",
            "type": "image/png",
            "data": "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"
        },
        {
            "name": "logo.png",
            "type": "image/png",
            "data": "iVBORw0KGgoAAAANSUhEUgAAAmIAAACZCAYAAACMnFYVAAAACXBIWXMAABcRAAAXEQHKJvM/AAAcMElEQVR4Xu3djZXbOBIE4A1hQ2AIDgEhTAgMwSEgBIfAEBwCQnAIDMEZ1LlXo7OGg0aBIEiRmqr3vnd7nu4mRVEi9DP2PwD+EREREZHj0QIRERER2QctEBEREZF90AIRERER2QctEBEREZF90AIRERER2QctEBEREZF90AIRERER2QctEBEREZF90AIRERER2QctEBEREZF90AIRERER2QctEBEREZF90AIRERER2QctEBEREZF90AIRERER2QctEBEREZF90AIRERER2QctEBEREZF90AIRERER2QctEBEREZF90AIRERER2QctEBEREZF90AIRERER2QctEBEREZF90AIRERER2QctEBEREZF90AIRERER2QctEBEREZF90AIRERER2QctEBEREZF90AIRERER2QctEBEREZF90AIRERER2Qct+IL+/SP88f2P+Mf0R+psLGy/1lixnav5gdsxH3G7D+y++EdERORV0YIvYMBt0fXzjxnHJILvFxM/TX3N2H0y4bY4s/uKHRf5LPzxhts5k/MGLXxFRJ6CFryob7i9+zLjOYng+8jET1O/Rn7htnAewI/RVzXgdozsWK3Nb9xelJz1GEesy4y/77hary06B/DtiIgcgha8mBFtF6feieD7ysRPU79eEm4XVnasvoqA2zHpFVuMsW0eLaJP7gt6vQsoIk9FC16APdFGPO/dr1xsf9h+M/HT1K8bu29H8GP2quwct3d4eyeAb/toEX1j7wDaTC3IROQpaMHFjTjXAuyeCL7vTPw0VbH7OoAfu1diC4i93uUN4Ntn7r/8crd1wROxT2bcvrLAti8i0hUtuCh7Qt3r4tQjEfw2MPHTVOWehK/xPaDWRdiM2zGaSV0A3wcmdJ4ZsW9G8H0QEemGFlxQxPlj+8huB3OF2/nM2EdOZ/yOU0+1i7D796G8d3zu71pFfPyOGdt+jYCPCRU9JRF+JuR/KzQVenLZuo8iItVowYUMqL8wPTsR/PYw8dNUJRf7DcCtH4edUQSPPR4C+KwlO169FrG2/ce07M+jCD+l2ffviv52u//Gal7xnBGRE6IFFxFQ9wR7lkTw28TET1MVLzNe6/s/A3gm8DlHCPiYUNFTEuGn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MWze5Ld+SAKfdQq04MLsgVR69aS8ZiJe812wR14i6WNPiD9R7k9OXyJ9ZnJ618Yujo/vQuTskQh/e6HQFzr2mB4LhHtKx3Ct0u1Zk5r79xuOOQbfCn01yc2cih1+7PbOzs8i1t8nwenZY87odufDnr9r7xfbLtu3U6AFL2BA+8mvXCd2H9t9zc6HV+Alkr7vfut/GVHuT05fIn130emvzQx+kf7H7b69MGOL0VwmlLcX/NbuCzEzoO12LFPaxlrs3KpJzSLszurm/JhVYdsJaF/05ebZImPtfXc/Lsn5eYS/716C07PXnJ/egExqZs5u9y12zNiC7jRowQsZ8Pn7Acq1Y/elXVztvmX3/yvxEknf4Lf+lwHl/uT0JdL3KIB/F2sZu5/tttU+sXq5z1izfeth2wtu9z4LsTvbt5bns/vxZPPXiGjP/XFce//eWX1E2zGYwV943A1Yt5C4x1tUrlmMJfx9XCanJiK/neDUA/XnWK85dptrj2HNzOh23zKBzzgNWvCC7IQYUf9AUM4Xe0Dbfcju61cVHaGi97vT+72id3R6x4reJbtI2cXXexzaxfV+P6+9QOf20YSHGvvvCflX1rZPaxb4Vudt05vR0pNzfz6bUH6XIOF2m97AZ7YacNuXH+CLXTvGts9Wv/b+XbofAztfZvixfdpyDAbw2/b7/ecR/Hbd9zk3Y8Lnx7PVx4xl3eP+5uoj1p1jveaYgNttttu4zP3Y1cwcMv2PCeAzToMWvLgBfx8MuRNDOUfuT0x2X7EnNxEReX3ei7i5ovdUaMEXY6/SR9xW+umdFmjH5f6KyBbGdh/YK9cB/H4TEZGvJSGfWNF7KrRARERE5ETskxEvQ6HvlGiBiIiIyIlMyOdnRe/p0AIRERGRJ4i4fUUlvBtR/mWJAD7zdGiBiIiIyBOsSQKfd0q0QERERORg9stztbFf9BrAZ54SLRARERE5WEB9Wv9uuFOgBSIiIiIHC+CZcdHvhT2iBSIiIiIHs7+iIuL2m5AJf/MLL/avq9ACEREREdkHLRARERGRfdACEREREdkHLRARERGRfdACEREREdkHLRARERGRfdACEREREdkHLRARERGRfdACEREREdkHLRARERGRfdACEREREdkHLRARERGRfdACEREREdkHLRARERGRfdACEREREdkHLRARERGRfdACEREREdkHLRARERGRfdACEREREdkHLRARERGRfdACEREREdkHLRARERGRfdACEREREdkHLRARERGRfdACEREREdkHLRARERGRfdACEREREdnH/wDehReT4eM6lgAAAABJRU5ErkJggg=="
        },
        ]
    },
    "recipients": []
};

const sendEmail = (user, otp, recipientEmail) => {
    try {
        let body = getBody(user, otp, recipientEmail);
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
        });
    } catch (err) {
        console.error(err)
    }
}
function getBody(user, otp, recipientEmail) {
    let date = getDate();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    payload.recipients = [];
    payload.recipients.push({ "address": recipientEmail });
    payload.content.html = `<div style="width:100%;height:50px; background-color: #5DD2B1;"><img style="height: 100%;float:right;" src="cid:logo.png"></div>
    <p>Dear ${user},</p>
    <p>Congratulations, your new credit card is on its way!</p>
    <p><b>According to our records you will receive it on ${day}-${month}-${year}.</b> If you do not receive your card by that</p>
    <p style="margin-top: -1%;"> date, please contact us immediately at 1-800-610-8618.</p>
    <p>Once you receive your card, you will have to <b>activate it</b> by following the steps below: </p>
    <div style="margin-left:2%">
        <p>1. Download and install our Mobile Banking App.</p><img src="cid:googlePlay.png"> <img src="cid:applePlay.png">
        <p>2. Once it’s installed, open it, choose “Menu” and click on “Activate Your Card”.</p>
        <p>3. You will then be asked to enter your One Time Password, which is ${otp}</p>
        <p>4. After your card is activated you will be given the option to create a new PIN for your card.</p>
        <p style="margin-top: -1%;margin-left: 1.2%;">We strongly suggest that you select a new PIN.</p>
    </div>
    <p>That’s it!</p>
    <p>Thank you for choosing G+D Banking Card</p>
    <div style="width:100%;height:50px; background-color: #5DD2B1; position:absolute;"></div>`;
    return JSON.stringify(payload);
}
getDate = () => {
    let toDay = new Date();
    let comingDay = toDay.setDate(toDay.getDate() + 3);
    return new Date(comingDay);
}
module.exports = { sendEmail }