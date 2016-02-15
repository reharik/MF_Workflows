/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(eventhandlerbase,
                          eventrepository,
                          logger,
                          appdomain) {

    return class BootstrapApplicationWorkflow extends eventhandlerbase {
        constructor() {
            super();
            this.handlesEvents = ['bootstrapApplication'];
            this.handlerName   = 'bootstrapApplication';
        }

        loginTrainer(vnt) {
            console.log(vnt);
            this.createNotification(vnt);
            var trainer = eventrepository.getById(appdomain.Trainer, vnt.Id);
            trainer.loginTrainer(vnt);
            eventrepository.save(trainer, {continuationId});
        }

        bootstrapApplication(vnt) {
            console.log('inside bootstrapper handler');
            console.log(vnt);
            //hireTrainer();
            return 'success';
        }

        hireTrainer(vnt) {
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
            eventrepository.save(trainer);
        }
    };
};
