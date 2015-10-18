/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(appdomain, eventhandlerbase, eventrepository, logger) {
    return class HireTrainerWorkflow extends eventhandlerbase {
        constructor() {
            super();
            this.handlesEvents = ['hireTrainer'];
            this.eventHandlerName = 'HireTrainerWorkflow';
            logger.info('HireTrainerWorkflow started up');
        }

        hireTrainer(cmd, continuationId) {
            logger.info('made it to hireTrainer');
            var trainer = new appdomain.Trainer();
            logger.info('created new trainer');
            trainer.hireTrainer(cmd);
            logger.info('called trainer command');
            eventrepository.save(trainer, {continuationId});
            logger.info('saved new trainer');
        }
    }
};
