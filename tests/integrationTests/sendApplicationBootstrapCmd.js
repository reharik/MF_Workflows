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

    extend(options, config.get('configs') || {});

    var container = require('../../registry')(options);
    before(function(done){
        var eventmodels = container.getInstanceOf('eventmodels');
        eventdata = eventmodels.eventData;
        eventstore = container.getInstanceOf('eventstore');
        uuid = container.getInstanceOf('uuid');
        handlers = container.getArrayOfGroup('CommandHandlers');
        console.log('handlers');
        console.log(handlers);
        console.log(container.whatDoIHave());
        var _mut = container.getInstanceOf('eventdispatcher');
        mut = _mut(options.eventdispatcher);

        var auth = {
            username: eventstore.gesClientHelpers.systemUsers.admin
            , password: eventstore.gesClientHelpers.systemUsers.defaultAdminPassword
        };
        var setData = {
            expectedMetastreamVersion: -1
            , metadata: eventstore.gesClientHelpers.createStreamMetadata({
                acl: {
                    readRoles: eventstore.gesClientHelpers.systemRoles.all
                }
            })
            , auth: auth
        };
        //eventstore.gesClientHelpers.getStreamMetadata('$all', {auth:auth}, function(err,data) {
        //    if (err || !data) {
        //        eventstore.gesClientHelpers.setStreamMetadata('$all', setData, function () {
        //            console.log('HHHHEEERRRREEEE')
        //            done();
        //        });
        //    }else{
        //        done();
        //        console.log('skipped metadata')
        //    }
        //    done();
        //});

    });

    beforeEach(function(){
    });

    context('append to stream', ()=> {
        it('should resolve with success', async ()=> {

            var appendData = { expectedVersion: -2};
            appendData.events = [ eventdata( 'bootstrapApplication', { data:'bootstrap please' }, {commandTypeName:'bootstrapApplication'})];
            await eventstore.appendToStreamPromise('bootstrapApplication',appendData);

            var result = await mut.startDispatching(handlers);
            //result.Status.must.equal('Success');
        })
    });
});

