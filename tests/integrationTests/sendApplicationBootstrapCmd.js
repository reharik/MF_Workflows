/**
 * Created by parallels on 7/24/15.
 */
/**
 * Created by rharik on 6/10/15.
 */

require('must');
var config = require('config');
var extend = require('extend');

describe('appendToStreamPromiseTester', function() {
    var bootstrap;
    var mut;
    var eventdata;
    var uuid;
    var eventstore;
    var options = {};

    extend(options, config.get('configs') || {});

    var container = require('../../registry')(options);
    before(function(){
        eventdata = container.getInstanceOf('eventdata');
        eventstore = container.getInstanceOf('eventstore');
        uuid = container.getInstanceOf('uuid');
    });

    beforeEach(function(){
    });

    context('append to stream', ()=> {
        it('should resolve with success', async ()=> {

                var setData = {
                    expectedMetastreamVersion: -1
                    , metadata: eventstore.gesClientHelpers.createStreamMetadata({
                        acl: {
                            readRoles: eventstore.gesClientHelpers.systemRoles.all
                        }
                    })
                    , auth: {
                        username: eventstore.gesClientHelpers.systemUsers.admin
                        , password: eventstore.gesClientHelpers.systemUsers.defaultAdminPassword
                    }
                };
            eventstore.gesClientHelpers.setStreamMetadata('$all', setData);



            var appendData = { expectedVersion: -2};
            appendData.events = [new eventdata( 'bootstrapApplication', { data:'bootstrap please' }, {commandTypeName:'bootstrapApplication'})];
            var result = await mut('commands',appendData);
            result.Status.must.equal('Success');
        })
    });
});

