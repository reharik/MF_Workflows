/**
 * Created by rharik on 7/13/15.
 */


    var container = require('./bootstrap');
    var DDD = container.getInstanceOf('DDD');
console.log('DDD');
console.log(DDD({}));
    var dispatcher = new DDD({}).gesDispatcher({
        targetTypeName:'commandTypeName',
        handlers:[]


    });
