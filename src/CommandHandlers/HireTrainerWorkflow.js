/**
 * Created by parallels on 7/16/15.
 */
module.exports = function(DDD, Trainer) {
    return class HireTrainerWorkflow extends DDD.gesEventHandlerBase {
        constructor() {
            super();
            this.handlesEvents = ['hireTrainer'];
            this.eventHandlerName = 'HireTrainerWorkflow';
            this.repository = DDD.gesRepository({eventTypeNameHeader: 'commandTypeName'})
        }

        hireTrainer(vnt) {
            this.createNotification(vnt);
            var trainer = new Trainer();
            trainer.hireTrainer(vnt);
            this.repository.save(trainer);
        }
    }
};