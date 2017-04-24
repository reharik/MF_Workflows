module.exports = function(eventRepository,
                          logger,
                          Client) {

  return function SessionPurchaseWorkflow() {

    async function purchaseSessions(cmd, continuationId) {
      logger.info('calling purchaseSessions');
      var client = await eventRepository.getById(Client, cmd.clientId);
      client.purchaseSessions(cmd);

      logger.info('saving client');
      logger.trace(client);

      await eventRepository.save(client, {continuationId});
      return {clientId: client._id}
    }

    async function refundSessionPurchase(cmd, continuationId) {
      logger.info('calling refundSessionPurchase');
      var client = await eventRepository.getById(Client, cmd.clientId);
      client.refundSessionPurchase(cmd);

      logger.info('saving client');
      logger.trace(client);

      await eventRepository.save(client, {continuationId});
      return {clientId: client._id}
    }

    async function cancelSessionPurchaseDueToError(cmd, continuationId) {
      logger.info('calling cancelSessionPurchaseDueToError');
      var client = await eventRepository.getById(Client, cmd.clientId);
      client.cancelSessionPurchaseDueToError(cmd);

      logger.info('saving client');
      logger.trace(client);

      await eventRepository.save(client, {continuationId});
      return {clientId: client._id}
    }

    return {
      handlerName: 'SessionPurchaseWorkflow',
      purchaseSessions,
      refundSessionPurchase,
      cancelSessionPurchaseDueToError
    }
  };
};
