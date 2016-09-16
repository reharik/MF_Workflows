/**
 * Created by parallels on 7/16/15.
 */
"use strict";



module.exports = function(eventHandler,
                          eventRepository,
                          logger,
                          appdomain, bcryptjs) {

    var createPassword = function *(_password) {
        try {
            var salt = yield bcryptjs.genSaltSync(10);
            var hash = yield bcryptjs.hashSync(_password, salt);
            return hash;
        }
        catch (err) {
            throw err;
        }
    };

    return class BootstrapApplicationWorkflow extends eventHandler {
        constructor() {
            super();
            this.handlesEvents = ['bootstrapApplication'];
            this.handlerName   = 'bootstrapApplication';
        }

        *loginTrainer(cmd) {
            console.log(cmd);
            var trainer = yield eventRepository.getById(appdomain.Trainer, cmd.Id);
            trainer.loginTrainer(cmd);
            return yield eventRepository.save(trainer, { continuationId: cmd.continuationId });
        }

        *bootstrapApplication(cmd, continuationId) {
            console.log('inside bootstrapper handler');
            logger.info('calling hiretrainer');
            var trainer = new appdomain.Trainer();
            trainer.hireTrainer({
                credentials: {
                    userName: 'admin',
                    password: yield createPassword('123123')
                },
                contact    : {
                    firstName   : 'Raif',
                    lastName    : 'Harik',
                    emailAddress: 'reharik@gmail.com',
                    phone       : '666.666.6666',
                    secondPhone : '777.777.7777'
                },
                address    : {
                    address1: '1706 willow st',
                    address2: 'b',
                    city    : 'Austin',
                    state   : 'TX',
                    zipCode : '78702'
                },
                dob        : new Date()
            });
            logger.info('saving trainer');
            logger.trace(trainer);
            return yield eventRepository.save(trainer, { continuationId });
        }

        *hireTrainer(cmd) {
            logger.info('calling hiretrainer');
            var trainer = new appdomain.Trainer();
            trainer.hireTrainer({
                credentials: {
                    userName: 'admin',
                    password: '123456'
                },
                contact    : {
                    firstName   : 'Raif',
                    lastName    : 'Harik',
                    emailAddress: 'reharik@gmail.com',
                    phone       : '666.666.6666',
                    secondPhone : '777.777.7777'
                },
                address    : {
                    address1: '1706 willow st',
                    address2: 'b',
                    city    : 'Austin',
                    state   : 'TX',
                    zipCode : '78702'
                }
                ,
                dob        : new Date()
            });
            logger.info('saving trainer');
            logger.trace(trainer);
            return yield eventRepository.save(trainer);
        }
    };
};
