/**
 * Created by reharik on 8/15/15.
 */

var _BootstrapApplication = require('./BootstrappApplication');
var _HireTrainerWorkflow = require('./HireTrainerWorkflow');
var _LoginTrainerWorkflow= require('./LoginTrainerWorkflow');

module.exports = function(eventHandlerBase,
                          eventRepository,
                          readStoreRepository,
                          logger){

    var BootstrapApplication = _BootstrapApplication(eventHandlerBase, eventRepository, readStoreRepository, logger);
    var HireTrainerWorkflow = _HireTrainerWorkflow(eventHandlerBase, eventRepository, logger);
    var LoginTrainerWorkflow = _LoginTrainerWorkflow(eventHandlerBase, eventRepository, logger);

    return [new BootstrapApplication(),
    new HireTrainerWorkflow(),
    new LoginTrainerWorkflow()]
};