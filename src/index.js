/**
 * Created by parallels on 7/21/15.
 */

module.exports = function(gesDispatcher, commandHandlers, logger){
    return function(){
        logger.debug('dispatcher waiting for connection');
        setTimeout(function(){
            logger.debug('instantiating dispatcher');
            var dispatcher =  new gesDispatcher({
                targetStreamType:'command',
            handlers:commandHandlers.map(x=>new x())
        });

        dispatcher.startDispatching();
        },3000);
    }
};