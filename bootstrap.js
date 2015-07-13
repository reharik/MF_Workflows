/**
 * Created by rharik on 6/23/15.
 */
var _container = require('./src/jsioc/index');
module.exports = new _container(x=>
    x.pathToPackageJson('/package.json')
            .forDependencyParam('DDD').requireThisInternalModule('/src/DDD/index')
            .replace('lodash').withThis('_')
            .replace('bluebird').withThis('Promise')
            .complete());
