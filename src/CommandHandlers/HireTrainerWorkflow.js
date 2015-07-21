/**
 * Created by parallels on 7/16/15.
 */
module.exports = function(gesEventHandlerBase, gesRepository, Trainer) {
    return class HireTrainerWorkflow extends gesEventHandlerBase {
        constructor() {
            super();
            this.handlesEvents = ['hireTrainer'];
            this.eventHandlerName = 'HireTrainerWorkflow';
        }

        hireTrainer(vnt) {
            this.createNotification(vnt);
            var trainer = new Trainer();
            trainer.hireTrainer(vnt);
            gesRepository.save(trainer);
        }
    }
};