/**
 * Created by parallels on 7/21/15.
 */

module.exports = function(gesDispatcher, commandHandlers, config){
    return function(){
        console.log(config);
        var dispatcher =  new gesDispatcher({
            targetType:'commandTypeName',
            handlers:commandHandlers.map(x=>new x())
        });

        dispatcher.startDispatching();
    }
};