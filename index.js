/**
 * Created by rharik on 7/13/15.
 */

var extend = require('extend');

module.exports = function(_options) {
    var options = {};
    extend(options, config.get('all') || {}, _options || {});
    var container = require('./registry')(options);

    var dispatcher = container.getInstanceOf('eventdispatcher');
    var handlers = container.getInstanceOf('CommandHandlers');
    dispatcher.startDispatching(handlers,options.eventdispatcher)
};

