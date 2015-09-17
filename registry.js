/**
 * Created by parallels on 9/3/15.
 */
var dagon = require('dagon');

module.exports = function(_options) {
    var options = _options || {};
    var container = dagon(options.dagon);
    return new container(x=> x.pathToRoot(__dirname)
            .requireDirectoryRecursively('./src')
            .groupAllInDirectory('./src/CommandHandlers','CommandHandlers')
            .for('eventstore').instantiate(i=>i.asFunc().withParameters({eventstore:options.eventstore}))
            .for('readstorerepository').instantiate(i=>i.asFunc().withParameters({postgres:options.postgres}))
            .for('eventdispatcher').instantiate(i=>i.asFunc().withParameters({eventdispatcher:options.eventdispatcher}))
            .for('corelogger').renameTo('logger').instantiate(i=>i.asFunc().withParameters(options.logger || {}))
            .for('bluebird').renameTo('Promise')
            .complete());
};
