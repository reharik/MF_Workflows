/**
 * Created by parallels on 7/16/15.
 */
"use strict";



module.exports = function(
                          eventRepository,
                          logger,
                          appdomain, bcryptjs) {

    var createPassword = function (_password) {
        try {
            var salt = bcryptjs.genSaltSync(10);
            var hash = bcryptjs.hashSync(_password, salt);
            return hash;
        }
        catch (err) {
            throw err;
        }
    };

    return function BootstrapApplicationWorkflow() {

        async function bootstrapApplication(cmd, continuationId) {
            console.log('inside bootstrapper handler');
            logger.info('calling hiretrainer');
            var trainer = new appdomain.Trainer();
            trainer.hireTrainer({
                credentials: {
                    userName: 'admin',
                    password: createPassword('123123')
                },
                contact    : {
                    firstName   : 'Raif',
                    lastName    : 'Harik',
                    email: 'reharik@gmail.com',
                    mobilePhone       : '666.666.6666',
                    secondaryPhone : '777.777.7777',
                    address    : {
                        street1: '1706 willow st',
                        street2: 'b',
                        city    : 'Austin',
                        state   : 'TX',
                        zipCode : '78702'
                    }
                },
                dob        : new Date(),
                color: '#666666',
                defaultClientRate: 65
            });
            logger.info('saving trainer');
            logger.trace(trainer);
            return await eventRepository.save(trainer, { continuationId });
        }
        return {
            handlerName: 'BootstrapApplicationWorkflow',
            bootstrapApplication
        }
    };
};
