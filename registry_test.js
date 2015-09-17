/**
 * Created by parallels on 9/3/15.
 */
var dagon = require('dagon');

module.exports = function(_options) {
    var options = _options || {};
    var container = dagon(options.dagon);
    return new container(x=>
        x.pathToRoot(__dirname)
            .requireDirectoryRecursively('./src')
            .requireDirectoryRecursively('./tests/unitTests/mocks')
            .for('bluebird').renameTo('Promise')
            .for('corelogger').renameTo('logger').instantiate(i=>i.asFunc().withParameters(options.logger || {}))
            .for('eventmodels').instantiate(i=>i.asFunc())
            .for('eventhandlerbase').instantiate(i=>i.asFunc())
            .for('eventstore').require('./tests/unitTests/mocks/eventStoreMock')
            .complete());
};
