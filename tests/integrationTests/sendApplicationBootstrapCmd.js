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
    var handlers;
    var options = {
        //dagon:{
        //    logger: {
        //        moduleName: 'EventHandlerBase'
        //        }
        //}
    };
    var setData;
    extend(options, config.get('configs') || {});

    var container = require('../../registry')(options);
    before(async function(){
        var eventmodels = container.getInstanceOf('eventmodels');
        eventdata = eventmodels.eventData;
        eventstore = container.getInstanceOf('eventstore');
        uuid = container.getInstanceOf('uuid');
        handlers = container.getArrayOfGroup('CommandHandlers');
        var _mut = container.getInstanceOf('eventdispatcher');
        mut = _mut(options.eventdispatcher);

        var auth = {
            username: eventstore.gesClientHelpers.systemUsers.admin
            , password: eventstore.gesClientHelpers.systemUsers.defaultAdminPassword
        };
        setData = {
            expectedMetastreamVersion: -1
            , metadata: eventstore.gesClientHelpers.createStreamMetadata({
                acl: {
                    readRoles: eventstore.gesClientHelpers.systemRoles.all
                }
            })
            , auth: auth
        };
        //await eventstore.gesClientHelpers.getStreamMetadata('$all', {auth:auth}, async function(err,data) {
        //    if (err || !data) {
        //        await ;
        //    }else{
        //        console.log('skipped metadata')
        //    }
        //});

    });

    beforeEach(function(){
    });

    context('append to stream', ()=> {
        it('s   hould resolve with success', async ()=> {
            //await eventstore.gesClientHelpers.setStreamMetadata('$all', setData, function () {
            //    console.log('HHHHEEERRRREEEE')
            //})
            //var appendData = { expectedVersion: -2};
            //appendData.events = [ eventdata( 'bootstrapApplication',
            //    { data:'bootstrap please' },
            //    {
            //        commandTypeName:'bootstrapApplication',
            //        streamType:'command'
            //    })];
            //await eventstore.appendToStreamPromise('bootstrapApplication',appendData);
            //
            var result = await mut.startDispatching(handlers);
            //result.Status.must.equal('Success');
    })
    });
});

