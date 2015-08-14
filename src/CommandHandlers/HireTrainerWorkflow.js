/**
 * Created by parallels on 7/16/15.
 */
module.exports = function(core, domain, logger) {
    return class HireTrainerWorkflow extends core.gesEventHandlerBase {
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
            core.gesRepository.save(trainer, {continuationId});
        }
    }
};