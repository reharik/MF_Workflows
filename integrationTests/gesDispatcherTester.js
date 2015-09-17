///**
// * Created by parallels on 7/24/15.
// */
//
//var demand = require('must');
//
//
//describe('gesDispatcher', function() {
//    var bootstrap;
//    var Mut;
//    var mut;
//    var uuid;
//    var EventData;
//    var appendData;
//    var TestEventHandler;
//    var testEventHandler;
//    var append;
//
//    before( function () {
//        bootstrap = require('../bootstrap');
//
//    });
//
//    beforeEach(function () {
//        Mut = bootstrap.getInstanceOf('gesDispatcher');
//        TestEventHandler = bootstrap.getInstanceOf('BootstrapApplicationWorkflow');
//
//        testEventHandler = new TestEventHandler();
//        var mut =  new Mut({
//            targetType:'commandTypeName',
//            handlers:[testEventHandler]
//        });
//
//        //mut = new Mut({handlers:[testEventHandler]});
//        mut.startDispatching();
//    });
//
//    context('when calling gesDispatcher', ()=> {
//        it('should retrieve events', (done)=> {
//            setTimeout(()=>{
//                done();
//            }, 1000);
//
//        });
//    });
//});
