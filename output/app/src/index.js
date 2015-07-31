/**
 * Created by parallels on 7/21/15.
 */

module.exports = function(gesDispatcher, commandHandlers, config){
    return function(){
        setTimeout(function(){
        var dispatcher =  new gesDispatcher({
            targetType:'commandTypeName',
            handlers:commandHandlers.map(x=>new x())
        });

        dispatcher.startDispatching();
        },2000);
    }
};