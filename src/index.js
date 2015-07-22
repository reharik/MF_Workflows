/**
 * Created by parallels on 7/21/15.
 */

module.exports = function(gesDispatcher, commandHandlers){
    return function(){
        var dispatcher =  new gesDispatcher({
            targetTypeName:'commandTypeName',
            handlers:commandHandlers.map(x=>new x())
        });

        dispatcher.startDispatching();
    }
};