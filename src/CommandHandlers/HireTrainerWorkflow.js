/**
 * Created by parallels on 7/16/15.
 */

module.exports = function(appdomain, eventhandlerbase, eventrepository, logger) {
    return class HireTrainerWorkflow extends eventhandlerbase {
        constructor() {
            super();
            this.handlesEvents = ['hireTrainer'];
            this.eventHandlerName = 'HireTrainerWorkflow';
            logger.info('HireTrainerWorkflow started up');
        }

        hireTrainer(cmd) {
            this.createNotification(cmd);
            var trainer = new appdomain.Trainer();
            trainer.hireTrainer(cmd);
            eventrepository.save(trainer, {continuationId});
        }
    }
};
