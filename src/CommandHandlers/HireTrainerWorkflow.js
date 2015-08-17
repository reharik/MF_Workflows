/**
 * Created by parallels on 7/16/15.
 */
var domain = require('domain');

module.exports = function(eventHandlerBase, eventRepository, logger) {
    return class HireTrainerWorkflow extends eventHandlerBase {
        constructor() {
            super();
            this.handlesEvents = ['hireTrainer'];
            this.eventHandlerName = 'HireTrainerWorkflow';
            logger.info('HireTrainerWorkflow started up');
        }

        hireTrainer(cmd) {
            this.createNotification(cmd);
            var trainer = new domain.Trainer();
            trainer.hireTrainer(cmd);
            eventRepository.save(trainer, {continuationId});
        }
    }
};