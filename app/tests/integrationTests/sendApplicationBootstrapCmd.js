/**
 * Created by parallels on 7/24/15.
 */
/**
 * Created by rharik on 6/10/15.
 */

require('must');
var config = require('config');
var extend = require('extend');
var fs = require('fs');
describe('appendToStreamPromiseTester', function() {
    var mut;
    //var eventdata;
    //var uuid;
    var eventstore;
    var handlers;
    var options = {
        dagon:{
            logger: {
                moduleName: 'Workflows'
                }
        }
    };
    var container;
    //var setData;
    //var readstorerepository;


    before( function () {
        extend(options, config.get('configs') || {});
        container = require('../../registry')(options);
        console.log('mutxxxxxxxxxxxxxxxxxxxxxxxx');
        //var eventmodels = container.getInstanceOf('eventmodels');
        //eventdata = eventmodels.eventData;
        //uuid = container.getInstanceOf('uuid');
        //readstorerepository = container.getInstanceOf('readstorerepository');
        console.log('mutxxxxxxxxxxxxxxxxxxxxxxxx');
        console.log(container);
        console.log('mutxxxxxxxxxxxxxxxxxxxxxxxx');
        eventstore = container.getInstanceOf('eventstore');
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
    });

    beforeEach(function () {
    });

    context('append to stream', ()=> {
        it('should resolve with success', ()=> {
            //var script = fs.readFileSync('tests/integrationTests/sql_scripts/buildSchema.sql').toString();
            //await readstorerepository.query(script);
            eventstore.gesClientHelpers.setStreamMetadata('$all', setData, function (error, data) {
            //
            //    if (!error) {
            //        var appendData = {expectedVersion: -2};
            //        appendData.events = [eventdata('bootstrapApplication',
            //            {data: 'bootstrap please'},
            //            {
            //                commandTypeName: 'bootstrapApplication',
            //                streamType: 'command'
            //            })];
            //        await eventstore.appendToStreamPromise('bootstrapApplication', appendData);
            //    }
            });
            //await setTimeout(async function () {

                //var result = await mut.startDispatching(handlers);

            //}, 1000);
            //result.Status.must.equal('Success');
        })
    });
});

