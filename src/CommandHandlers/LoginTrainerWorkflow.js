/**
 * Created by parallels on 7/16/15.
 */

module.exports = function(DDD, Trainer) {
    return class LoginTrainerWorkflow extends DDD.gesEventHandlerBase {
        constructor() {
            super();
            this.handlesEvents = ['loginTrainer'];
            this.eventHandlerName = 'LoginTrainerWorkflow';
            this.repository = DDD.gesRepository({eventTypeNameHeader: 'commandTypeName'})
        }

        loginTrainer(vnt) {
            this.createNotification(vnt);
            var trainer = this.repository.getById(Trainer, vnt.Id);
            trainer.loginTrainer(vnt);
            this.repository.save(trainer);
        }
    }
};