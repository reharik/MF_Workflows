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

        loginTrainer(event) {
        var trainer = R.compose(
            eventrepository.getById(appdomain.Trainer),
            fh.safeProp('Id'),
            fh.safeProp('data'));


            R.Identity(event).map(trainer.loginTrainer)


            trainer.loginTrainer(event);
            eventrepository.save(trainer, {continuationId});
        }
    }
};
