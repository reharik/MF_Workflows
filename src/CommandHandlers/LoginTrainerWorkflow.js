/**
 * Created by parallels on 7/16/15.
 */

var domain = require('domain');

module.exports = function(eventHandlerBase, eventRepository, logger) {
    return class LoginTrainerWorkflow extends eventHandlerBase {
        constructor() {
            super();
            this.handlesEvents = ['loginTrainer'];
            this.eventHandlerName = 'LoginTrainerWorkflow';
            logger.info('LoginTrainerWorkflow started up');
        }

        loginTrainer(vnt) {
            this.createNotification(vnt);
            var trainer = eventRepository.getById(domain.Trainer, vnt.Id);
            trainer.loginTrainer(vnt);
            eventRepository.save(trainer, {continuationId});
        }
    }
};