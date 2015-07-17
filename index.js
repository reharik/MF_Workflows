/**
 * Created by rharik on 7/13/15.
 */


    var container = require('./bootstrap');
    var DDD = container.getInstanceOf('DDD');
    console.log('DDD');

    var ddd = DDD({
        registry: x=> x.complete(),
        configValues:{
            "eventstore":{
                "ip":"172.0.0.1"
            }
        }

    });

  var dispatcher =  new ddd.gesDispatcher({
        targetTypeName:'commandTypeName',
        handlers:[container.getInstanceOf('LoginTrainerWorkflow')]


    });
