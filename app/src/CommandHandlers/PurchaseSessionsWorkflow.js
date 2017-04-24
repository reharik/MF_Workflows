module.exports = function(eventRepository,
                          logger,
                          Client,
                          Session) {

  return function PurchasesWorkflow(){

    async function purchases(cmd, continuationId) {
      logger.info('calling purchases');
      var client = await eventRepository.getById(Client, cmd.id);
      client.purchases(cmd);
      const sessions = generateSessions(cmd);

      logger.info('saving client');
      logger.trace(client);

      await eventRepository.save(client, { continuationId });

      logger.info('saving sessions');
      logger.trace(sessions);

      for (let s of sessions) {
        await eventRepository.save(s);
      }

      return {clientId: client._id}
    }

    generateSessions = (cmd) => {
      return [].concat(
        this.addFullHourSessions(cmd),
        this.addHalfHourSessions(cmd),
        this.addPairsSessions(cmd));
    };

    createSessionCmd = (clientId, sessionType) => ({
        sessionType,
        clientId
    });

    createNewSession = (cmd, purchasePrice, purchaseId) => {
      cmd.sessionId = uuid.v4();
      cmd.purchaseId = purchaseId;
      cmd.purchasePrice = purchasePrice;
      let session = new Session();
      session.createSession(cmd);
      return session;
    };

    addFullHourSessions = (cmd) => {
      let sessionCmd = this.createSessionCmd(cmd.clientId, 'FullHour');
      const individualHourPrice = cmd.fullHour ? cmd.fullHourTotal / cmd.fullHour : 0;
      const tenPackHourPrice = cmd.fullHourTenPack ? cmd.fullHourTenPackTotal / (cmd.fullHourTenPack * 10) : 0;
      let sessions = Array(cmd.fullHour).fill(this.createNewSession(sessionCmd, individualHourPrice, cmd.id));
      return sessions.contcat(
        Array(cmd.fullHourTenPack * 10)
          .fill(this.createNewSession(sessionCmd, tenPackHourPrice, cmd.id))
      );
    };

    addHalfHourSessions = (cmd) => {
      let sessionCmd = this.createSessionCmd(cmd.clientId, 'HalfHour');
      const individualHalfHourPrice = cmd.halfHour ? cmd.halfHourTotal / cmd.halfHour : 0;
      const tenPackHalfHourPrice = cmd.halfHourTenPack ? cmd.halfHourTenPackTotal / (cmd.halfHourTenPack * 10) : 0;
      let sessions = Array(cmd.halfHour).fill(this.createNewSession(sessionCmd, individualHalfHourPrice, cmd.id));
      return sessions.contcat(
        Array(cmd.halfHourTenPack * 10)
          .fill(this.createNewSession(sessionCmd, tenPackHalfHourPrice, cmd.id))
      );
    };

    addPairSessions = (cmd) => {
      let sessionCmd = this.createSessionCmd(cmd.clientId, 'Pair');
      const individualPairPrice = cmd.pair ? cmd.pairTotal / cmd.pair : 0;
      const tenPackPairPrice = cmd.pairTenPack ? cmd.pairTenPackTotal / (cmd.pairTenPack * 10) : 0;
      let sessions = Array(cmd.pair).fill(this.createNewSession(sessionCmd, individualPairPrice, cmd.id));
      return sessions.contcat(
        Array(cmd.pairTenPack * 10)
          .fill(this.createNewSession(sessionCmd, tenPackPairPrice, cmd.id))
      );
    };

    return {
      handlerName: 'PurchasesWorkflow',
      purchases
    }
  };
};
