/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(eventRepository,
                          logger,
                          appdomain) {

    return function ClientWorkflow(){

        async function addClient(cmd, continuationId) {
            logger.info('calling addClient');
            var client = new appdomain.Client();
            client.addClient(cmd);

            logger.info('saving client');
            logger.trace(client);

            await eventRepository.save(client, { continuationId });
            return {clientId: client._id}
        }

        async function updateClientAddress(cmd, continuationId) {
            logger.info('calling updateClientAddress');
            var client = await eventRepository.getById(appdomain.Client, cmd.id);
            client.updateClientAddress(cmd);

            logger.info('saving client');
            logger.trace(client);

            await eventRepository.save(client, { continuationId });
            return {clientId: client._id};
        }

        async function updateClientContact(cmd, continuationId) {
            logger.info('calling updateClientContact');
            var client = await eventRepository.getById(appdomain.Client, cmd.id);
            client.updateClientContact(cmd);

            logger.info('saving client');
            logger.trace(client);

            await eventRepository.save(client, { continuationId });
            return {clientId: client._id};
        }

        async function updateClientInfo(cmd, continuationId) {
            logger.info('calling updateClientInfo');
            var client = await eventRepository.getById(appdomain.Client, cmd.id);
            client.updateClientInfo(cmd);

            logger.info('saving client');
            logger.trace(client);

            await eventRepository.save(client, { continuationId });
            return {clientId: client._id};
        }

        return {
            handlerName: 'ClientWorkflow',
            addClient,
            updateClientInfo,
            updateClientAddress,
            updateClientContact
        }
    };
};
