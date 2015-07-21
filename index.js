/**
 * Created by rharik on 7/13/15.
 */


    var container = require('./bootstrap');
    var gesDispatcher = container.getInstanceOf('gesDispatcher');

  var dispatcher =  new gesDispatcher({
        targetTypeName:'commandTypeName',
        handlers:[container.getInstanceOf('LoginTrainerWorkflow')]
    });

  dispatcher.startDispatching();