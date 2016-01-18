/**
 * Created by reharik on 1/15/16.
 */

"use strict";

module.exports = function(eventdispatcher, CommandHandlers){
    return function(){
        eventdispatcher(CommandHandlers).startDispatching('command');
    };
};