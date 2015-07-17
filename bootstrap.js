/**
 * Created by rharik on 6/23/15.
 */
var _container = require('./node_modules/dependz/index');
module.exports = new _container(x=>
    x.pathToRoot(__dirname)
        .forDependencyParam('DDD').requireThisInternalModule('/node_modules/DDD/index')
        .replace('lodash').withThis('_')
        .replace('bluebird').withThis('Promise')
        .complete());