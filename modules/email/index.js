/**
 * Created by ddelizia on 28/11/16.
 */

const helper = require('sendgrid').mail;

function theService() {


    const getConfigObject = (configFile) => {
        let file = '~/config.json';
        if (configFile != null) {
            file = configFile;
        }
        return require(file).email;
    };

    const sendViaSendGrid = (options, template) => {
        const from_email = new helper.Email(template.from);
        const to_email = new helper.Email(template.to);
        const subject = template.subject;
        const content = new helper.Content('text/plain', template.body);
        const mail = new helper.Mail(from_email, subject, to_email, content);

        const sg = require('sendgrid')(options.key);

        const request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });

        sg.API(request, function (error, response) {
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
        });

    };

    const sendEmail = (emailTemplate, configFile = null) => {
        const config = getConfigObject(configFile);
        const templates = config.templates;
        const options = config.options;
        sendViaSendGrid(options, templates[emailTemplate]);
    };

    return {
        sendEmail: sendEmail
    };
}

module.exports = theService;