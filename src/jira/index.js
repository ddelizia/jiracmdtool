/**
 * Created by ddelizia on 23/11/16.
 */

const rp = require('request-promise');

function theService() {


    const getEnvironmentObject = (configFile) => {
        let file = '~/config.json';
        if (configFile != null) {
            file = configFile;
        }
        return require(file).jira;
    };

    const getJiraInfo = (object, jiraCode) => {
        let jira;
        if (jiraCode.indexOf('-') < 0) {
            jira = jiraCode;
        } else {
            jira = jiraCode.substring(0, jiraCode.indexOf('-'));
        }
        return object[jira];
    };

    const createIssue = (options, configFile) => {
        const envInfo = getJiraInfo(getEnvironmentObject(configFile), options.code);
        const baseUrl = envInfo.url;
        const endpoint = baseUrl + '/rest/api/2/issue/';
        const auth = "Basic " + new Buffer(envInfo.username + ":" + envInfo.password).toString("base64");

        let finalObject = {
            fields: {
                project: {
                    key: envInfo.code
                },
                summary: options.summary,
                description: options.description,
                issuetype: {
                    name: envInfo.typeOutMapping[options.type]
                },
                assignee: {
                    name: envInfo.username
                }
            }
        };

        let reqoOtions = {
            url: endpoint,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            body: finalObject,
            json: true,
            method: 'POST'
        };

        return rp(reqoOtions);

    };

    const getIssue = (ticket, configFile) => {
        const sourceEnvInfo = getJiraInfo(getEnvironmentObject(configFile), ticket);
        const baseUrl = sourceEnvInfo.url;
        const endpoint = baseUrl + '/rest/api/2/search?jql=key=' + ticket;
        const auth = "Basic " + new Buffer(sourceEnvInfo.username + ":" + sourceEnvInfo.password).toString("base64");

        let options = {
            url: endpoint,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            json: true
        };


        return rp(options);

    };

    const copyIssue = (sTicket, tCode, configFile) => {
        const sourceEnvInfo = getJiraInfo(getEnvironmentObject(configFile), sTicket);
        const source = getIssue(sTicket, configFile);

        source.then((data) => {
            const sourceTicket = data.issues[0];
            const options = {
                type: sourceEnvInfo.typeInMapping[sourceTicket.fields.issuetype.name],
                summary: `[${sTicket}] ${sourceTicket.fields.summary}`,
                description: sourceTicket.fields.description,
                code: tCode
            };
            createIssue(options, configFile).then((data) => {
                console.log(JSON.stringify(data, null, 4));
            });
        });


    };

    return {
        getEnvironmentObject: getEnvironmentObject,
        getJiraInfo: getJiraInfo,
        createIssue: createIssue,
        getIssue: getIssue,
        copyIssue: copyIssue
    };
}

module.exports = theService;