/**
 * Created by parallels on 7/24/15.
 */
/**
 * Created by rharik on 6/10/15.
 */

require('must');


describe('appendToStreamPromiseTester', function() {
    var bootstrap;
    var mut;
    var EventData;
    var uuid;
    var gesConnection;
    var gesclient;

    before(function(){
        bootstrap = require('../bootstrap');
        EventData = bootstrap.getInstanceOf('EventData');
        gesConnection = bootstrap.getInstanceOf('gesConnection');
        gesclient = bootstrap.getInstanceOf('gesclient');
        uuid = bootstrap.getInstanceOf('uuid');
        mut = bootstrap.getInstanceOf('appendToStreamPromise');
    });

    beforeEach(function(){
    });

    context('append to stream', ()=> {
        it('should resolve with success', async ()=> {


                var setData = {
                    expectedMetastreamVersion: -1
                    , metadata: gesclient.createStreamMetadata({
                        acl: {
                            readRoles: gesclient.systemRoles.all
                        }
                    })
                    , auth: {
                        username: gesclient.systemUsers.admin
                        , password: gesclient.systemUsers.defaultAdminPassword
                    }
                };

                gesConnection.setStreamMetadata('$all', setData)



            var appendData = { expectedVersion: -2};
            appendData.events = [new EventData( 'bootstrapApplication', { data:'bootstrap please' }, {commandTypeName:'bootstrapApplication'})];
            var result = await mut('commands',appendData);
            result.Status.must.equal('Success');
        })
    });
});

