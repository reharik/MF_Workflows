/**
 * Created by parallels on 7/16/15.
 */

module.exports = function(DDD, Trainer) {
    return class BootstrapApplicationWorkflow extends DDD.gesEventHandlerBase {
        constructor() {
            super();
            this.handlesEvents = ['bootstrapApplication'];
            this.eventHandlerName = 'BootstrapApplicationWorkflow';
            this.repository = DDD.gesRepository({eventTypeNameHeader: 'commandTypeName'})
        }

        bootstrapApplicationloginTrainer(vnt) {
            //TODO create default user
            //TODO add states to viewstore
        }
    }
};