/**
 * Created by parallels on 7/16/15.
 */

module.exports = function(gesEventHandlerBase, gesRepository, Trainer) {
    return class BootstrapApplicationWorkflow extends gesEventHandlerBase {
        constructor() {
            super();
            this.handlesEvents = ['bootstrapApplication'];
            this.eventHandlerName = 'BootstrapApplicationWorkflow';
        }

        bootstrapApplicationloginTrainer(vnt) {
            //TODO create default user
            //TODO add states to viewstore
        }
    }
};