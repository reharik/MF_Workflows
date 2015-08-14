/**
 * Created by parallels on 7/16/15.
 */

module.exports = function(core, domain, logger) {
    return class LoginTrainerWorkflow extends core.gesEventHandlerBase {
        constructor() {
            super();
            this.handlesEvents = ['loginTrainer'];
            this.eventHandlerName = 'LoginTrainerWorkflow';
            logger.info('LoginTrainerWorkflow started up');
        }

        loginTrainer(vnt) {
            this.createNotification(vnt);
            var trainer = core.gesRepository.getById(domain.Trainer, vnt.Id);
            trainer.loginTrainer(vnt);
            core.gesRepository.save(trainer, {continuationId});
        }
    }
};