/**
 * Created by parallels on 7/16/15.
 */
module.exports = function(gesEventHandlerBase, gesRepository, Trainer, logger) {
    return class HireTrainerWorkflow extends gesEventHandlerBase {
        constructor() {
            super();
            this.handlesEvents = ['hireTrainer'];
            this.eventHandlerName = 'HireTrainerWorkflow';
            logger.info('HireTrainerWorkflow started up');
        }

        hireTrainer(cmd) {
            this.createNotification(cmd);
            var trainer = new Trainer();
            trainer.hireTrainer(cmd);
            gesRepository.save(trainer, {continuationId});
        }
    }
};