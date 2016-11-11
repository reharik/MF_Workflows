/**
 * Created by reharik on 1/15/16.
 */

"use strict";

module.exports = function(eventDispatcher, CommandHandlers_array, eventReceiver){
    return function(){
        var source = eventDispatcher().startDispatching('command');
        CommandHandlers_array.map(x => eventReceiver(source, x()));
    };
};