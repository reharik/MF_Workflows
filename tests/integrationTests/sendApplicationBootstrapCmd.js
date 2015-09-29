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
        console.log(options.postgres.connectionString + options.postgres.database);

        var eventmodels = container.getInstanceOf('eventmodels');
        eventdata = eventmodels.eventData;
        eventstore = container.getInstanceOf('eventstore');
        uuid = container.getInstanceOf('uuid');
        handlers = container.getArrayOfGroup('CommandHandlers');
        mut = container.getInstanceOf('eventdispatcher');

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
        //        console.log('createing metadata')
        //        await eventstore.gesClientHelpers.setStreamMetadata('$all', setData, function () {
        //            console.log('HHHHEEERRRREEEE')
        //        })
        //    } else {
        //        console.log('skipped metadata')
        //    }
        //});

    });

    beforeEach(function(){
    });

    context('append to stream', ()=> {
        it('should resolve with success', async ()=> {

            await eventstore.gesClientHelpers.setStreamMetadata('$all', setData, async function (error,data) {
                console.log("error");
                console.log(error);
                console.log("data");
                console.log(data);
                if(!error){
                    var appendData = { expectedVersion: -2};
                    appendData.events = [ eventdata( 'bootstrapApplication',
                        { data:'bootstrap please' },
                        {
                            commandTypeName:'bootstrapApplication',
                            streamType:'command'
                        })];
                    await eventstore.appendToStreamPromise('bootstrapApplication',appendData);
                }
                console.log('HHHHEEERRRREEEE')
            });
            await setTimeout(async function(){

                var result = await mut.startDispatching(handlers);

            },3000)
            //result.Status.must.equal('Success');
    })
    });
});

