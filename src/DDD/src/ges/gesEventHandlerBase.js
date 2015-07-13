/**
 * Created by rharik on 6/18/15.
 */

module.exports = function(NotificationEvent, appendToStreamPromise, expectIdempotence, EventData, logger) {
    return class gesEventHandler {
        constructor() {
            this.responseMessage;
            this.continuationId;
            this.handlesEvents = [];
            this.result;
            this.eventHandlerName;
        }

        handleEvent(gesEvent) {
            logger.debug('checking event for idempotence');
            if (!expectIdempotence(gesEvent)) {
                return;
            }
            logger.trace('event idempotent');

            try {
                logger.info('calling specific event handler for: ' + gesEvent.eventTypeName + ' on ' + this.eventHandlerName);

                this[gesEvent.eventTypeName](gesEvent);
                
                logger.trace('event Handled by: ' + gesEvent.eventTypeName + ' on ' + this.eventHandlerName);

            } catch (exception) {
                logger.error('event: ' + JSON.stringify(gesEvent) + ' threw exception: ' + exception);
                if (this.responseMessage) {
                    this.responseMessage = new NotificationEvent("Failure", exception.message, gesEvent);
                }
            } finally {
                if (this.responseMessage) {
                    logger.trace('beginning to process responseMessage');

                    var responseEvent = new EventData(
                        this.responseMessage.eventTypeName,
                        {"continuationId": this.continuationId,
                        "eventTypeName":"notificationEvent"},
                        this.responseMessage.data);

                    logger.debug('response event created: ' + JSON.stringify(responseEvent));

                    var appendData = {
                        expectedVersion: -2,
                        events: [responseEvent]
                    };

                    logger.debug('event data created: ' + JSON.stringify(appendData));
                    logger.trace('publishing notification');

                    this.result = appendToStreamPromise('notification', appendData);
                }
            }
            // largely for testing purposes, sadly
            return this.result;
        }

        createNotification(gesEvent){
            logger.debug('building response notification');

            this.responseMessage = new NotificationEvent("Success", "Success", gesEvent);
            this.continuationId = gesEvent.metadata.continuationId;

            logger.trace('getting continuation Id: ' + this.continuationId);

        }
    };
};