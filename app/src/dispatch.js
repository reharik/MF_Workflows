/**
 * Created by reharik on 1/15/16.
 */

"use strict";

module.exports = function(eventdispatcher, CommandHandlers_array){
    return function(){

        eventdispatcher(CommandHandlers_array.map(x=>new x())).startDispatching('command');
    };
};