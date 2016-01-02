/**
 * Created by parallels on 9/3/15.
 */
"use strict";

var dagon = require('dagon');
var path = require('path');

module.exports = function(_options) {
    var options   = _options || {};
    var container = dagon(options.dagon).container;
    var result;
    try {
        result = container(
                x=> x.pathToRoot(path.join(__dirname, '..'))
                    .requireDirectoryRecursively('./app/src')
                    .groupAllInDirectory('./app/src/CommandHandlers', 'CommandHandlers')
                    .requiredModuleRegistires(['eventstore','eventrepository','eventhandlerbase','eventdispatcher'])
                    .for('corelogger').renameTo('logger')
                    .for('bluebird').renameTo('Promise')
                    .for('ramda').renameTo('R')
                    .for('ramdafantasy').renameTo('_fantasy')
                    .complete(),
                x=> x.instantiate('eventstoreplugin').asFunc().withParameters(options.eventstore || {})
                    .instantiate('eventrepository').asFunc().withParameters(options.children || {})
                    .instantiate('appdomain').asFunc().withParameters(options.children || {})
                    .instantiate('eventhandlerbase').asFunc().withParameters(options.children || {})
                    .instantiate('eventdispatcher').asFunc().withParameters(options.children || {})
                    .instantiate('readstorerepository').asFunc().withParameters(options.children || {})
                    .instantiate('logger').asFunc().withParameters(options.logger || {})
                    .complete()
        );
    } catch (ex) {
        console.log(ex);
        console.log(ex.stack);
    }
    return result;
};
