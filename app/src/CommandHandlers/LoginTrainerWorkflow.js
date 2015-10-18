/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(appdomain, eventhandlerbase, eventrepository, logger) {
    return class LoginTrainerWorkflow extends eventhandlerbase {
        constructor() {
            super();
            this.handlesEvents = ['loginTrainer'];
            this.eventHandlerName = 'LoginTrainerWorkflow';
            logger.info('LoginTrainerWorkflow started up');
        }

        loginTrainer(vnt) {
            this.createNotification(vnt);
            var trainer = eventrepository.getById(appdomain.Trainer, vnt.Id);
            trainer.loginTrainer(vnt);
            eventrepository.save(trainer, {continuationId});
        }
    }
};
