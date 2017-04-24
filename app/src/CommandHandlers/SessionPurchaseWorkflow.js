module.exports = function(eventRepository,
                          logger,
                          Client) {

  return function PurchaseWorkflow() {

    async function purchases(cmd, continuationId) {
      logger.info('calling purchases');
      var client = await eventRepository.getById(Client, cmd.clientId);
      client.purchases(cmd);

      logger.info('saving client');
      logger.trace(client);

      await eventRepository.save(client, {continuationId});
      return {clientId: client._id}
    }

    async function refundPurchase(cmd, continuationId) {
      logger.info('calling refundPurchase');
      var client = await eventRepository.getById(Client, cmd.clientId);
      client.refundPurchase(cmd);

      logger.info('saving client');
      logger.trace(client);

      await eventRepository.save(client, {continuationId});
      return {clientId: client._id}
    }

    async function cancelPurchaseDueToError(cmd, continuationId) {
      logger.info('calling cancelPurchaseDueToError');
      var client = await eventRepository.getById(Client, cmd.clientId);
      client.cancelPurchaseDueToError(cmd);

      logger.info('saving client');
      logger.trace(client);

      await eventRepository.save(client, {continuationId});
      return {clientId: client._id}
    }

    return {
      handlerName: 'PurchaseWorkflow',
      purchases,
      refundPurchase,
      cancelPurchaseDueToError
    }
  };
};
