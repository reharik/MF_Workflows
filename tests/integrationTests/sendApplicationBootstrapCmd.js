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
    var options = {
        //dagon:{
        //    logger: {
        //        moduleName: 'EventHandlerBase'
        //        }
        //}
    };

    extend(options, config.get('configs') || {});

    var container = require('../../registry')(options);
    before(function(){
        var eventmodels = container.getInstanceOf('eventmodels');
        eventdata = eventmodels.eventData;
        eventstore = container.getInstanceOf('eventstore');
        uuid = container.getInstanceOf('uuid');
        mut = container.getInstanceOf('eventdispatcher');
    console.log('mmmmutttt');
        console.log(mut)
    });

    beforeEach(function(){
    });

    context('append to stream', ()=> {
        it('should resolve with success',  ()=> {

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
            setTimeout(async function(){
                //eventstore.gesClientHelpers.setStreamMetadata('$all', setData, function(){console.log('HHHHEEERRRREEEE')});



            var appendData = { expectedVersion: -2};
            appendData.events = [
                eventdata( 'bootstrapApplication', { data:'bootstrap please' }, {commandTypeName:'bootstrapApplication'})];
            await eventstore.appendToStreamPromise('bootstrapApplication',appendData);
            var result = await mut.startDispatching('commands',appendData);
            result.Status.must.equal('Success');
            }, 2000);
        })
    });
});

