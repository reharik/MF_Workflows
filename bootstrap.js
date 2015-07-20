/**
 * Created by rharik on 6/23/15.
 */
var _container = require('DAGon');
module.exports = new _container(x=>
    x.pathToRoot(__dirname)
        .requireDirectoryRecursively('./src')
        .replace('lodash').withThis('_')
        .replace('bluebird').withThis('Promise')
        .complete());