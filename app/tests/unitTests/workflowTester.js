/**
 * Created by rharik on 11/26/15.
 */
var demand = require('must');

describe('gesEventHandlerBase', function() {
    var mut;
    var _mut;
    var testHandler;
    var eventmodels;
    var uuid ;
    var JSON;
    var options = {
        logger: {
            moduleName: 'EventHandlerBase'
        },
        dagon: {}
    };
    var event;
    var _fantasy;
    var Future;
    var Maybe;
    var Left;
    var Right;
    var treis;
    var R;
    var continuationId;

    //var container = require('../../registry_test')(options);

    beforeEach(function(){
        //testHandler = container.getInstanceOf('TestEventHandler');
        //eventmodels = container.getInstanceOf('eventmodels');
        //_fantasy = container.getInstanceOf('_fantasy');
        //R = container.getInstanceOf('R');
        //treis = container.getInstanceOf('treis');
        // _fantasy = require('ramda-fantasy');
        //R = require('ramda');
        //Future = _fantasy.Future;
        //Maybe = _fantasy.Maybe;
        //uuid = require('uuid');
        //JSON = require('JSON');
        //
        //event = {
        //    data            : {
        //        some: 'data'
        //    },
        //    continuationId  : uuid.v4(),
        //    originalPosition: {
        //        CommitPosition : 1,
        //        PreparePosition: 1
        //    },
        //    eventName       : 'howardTheDuck'
        //};

        //_mut = container.getInstanceOf('handler');
        //mut = _mut(event, 'testHandler', testHandler().targetHandlerFunction)
    });

    describe('#CHECKIFPROCESSED', function() {
        context('when calling with isIdepotence equal to true', function () {
            it('should return the bool',  function () {

                //var trainer = Future((rej, ret) => {
                //    ret({
                //        login: function(event) {
                //            return event;
                //        }
                //    })
                //});
                //
                //var identity = _fantasy.Identity(event);
                //var vent = identity.ap(trainer)
                //console.log(vent);
try{

    require('../index')
}catch(ex){
    var split = ex.stack.split('\n');

split.forEach(x=>{console.log(x);console.log('\n')})
    console.log({test:split})
    //console.log(ex.stack);
}

             })
        });
    });
});
