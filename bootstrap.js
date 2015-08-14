/**
 * Created by rharik on 6/23/15.
 */
var _container = require('dagon');

module.exports = new _container(x=>
    x.pathToRoot(__dirname)
        .requireDirectoryRecursively('./src')
        .groupAllInDirectory('./src/CommandHandlers', 'commandHandlers')
        .for('logger').instantiate(x=>x.asFunc()).require('src/yowlWrapper')
        .for('core').require("git+https://github.com/reharik/MF_Infrastructure.git")
        .for('domain').require("git+https://github.com/reharik/MF_Domain.git")
        .rename('lodash').withThis('_')
        .rename('bluebird').withThis('Promise')
        .complete());