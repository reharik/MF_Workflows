/**
 * Created by parallels on 7/21/15.
 */

var _eventDispatcher = require('eventDispatcher');
var _readStoreRepository = require('readStoreRepository');
var _eventHandlerBase = require('eventHandlerBase');
var _eventRepository = require('eventRepository');
var commandHandlers = require('./CommandHandlers/index');
var _eventStore = require('eventStore');
var yowlWrapper = require('yowlWrapper');
var extend = require('extend');
var config = require('config');

module.exports = function(_options){
    var options = {
        "eventstore": {
            "host": "eventstore",
            "systemUsers": {"admin": "admin"},
            "adminPassword": "changeit"
        },
        "postgres": {
            "connectionString": "postgres://postgres:password@postgres/",
            "postgres": "postgres",
            "database": "MethodFitness"
        },
        logger: {
            moduleName: "WorkFlows"
        }
    };
    extend(options.eventstore, config.get('eventstore') || {});
    extend(options.postgres, config.get('postgres') || {});
    extend(options, _options || {});

    var logger = yowlWrapper(options.logger);
    var eventStore = _eventStore({eventstore:options.eventstore});
    var readStoreRepository = _readStoreRepository({postgres: options.postgres});

    var eventRepository = _eventRepository(eventStore);
    var eventHandlerBase = _eventHandlerBase(eventStore, readStoreRepository);

    var handlers = commandHandlers(eventHandlerBase, eventRepository, readStoreRepository, logger);

    var eventDispatcher = _eventDispatcher(handlers, eventStore, {targetStreamType:'command'});
    eventDispatcher.startDispatching();
};