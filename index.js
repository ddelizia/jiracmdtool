/**
 * Created by ddelizia on 23/11/16.
 */

const program = require('commander');
const jira = require('./modules/jira/index')();
const email = require('./modules/email/index')();

module.exports = (version, args) => {
    program
        .version('0.0.1')
        .option('-s, --source [souce]', 'Source ticket example OLO-123')
        .option('-t, --target [target]', 'Target jira from configuration STRIPES')
        .option('-c, --config [configuration]', 'Configuration file. Default: ~/config.json');


    program
        .command('copyt')
        .description('Copy Jira ticket passed in -s option into -t jira environment')
        .action((env, options) => {
            jira.copyIssue(options.parent.source, options.parent.target, options.parent.config);
        });

    program
        .command('email [template]')
        .description('Send email')
        .action((env, options) => {
            email.sendEmail(env, options.parent.config);
        });


    // Parse options.
    program.parse(args);

    // Process program output.
    //processor.exec(program);
};