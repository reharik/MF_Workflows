/**
 * Created by reharik on 1/15/16.
 */

"use strict";

module.exports = function(eventDispatcher, CommandHandlers_array){
    return function(){
        eventDispatcher(CommandHandlers_array.map(x => new x())).startDispatching('command');
    };
};