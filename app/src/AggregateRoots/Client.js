/**
 * Created by rharik on 7/13/15.
 */
"use strict";

module.exports = function(AggregateRootBase, invariant, uuid) {
  return class Client extends AggregateRootBase {
    constructor() {
      super();
      this._isArchived;
      this.type = 'Client';
    }

    static aggregateName() {
      return 'Client';
    }

    commandHandlers() {
      return {
        'addClient': function (cmd) {
          cmd.id = cmd.id || uuid.v4();
          cmd.eventName = 'clientAdded';
          this.raiseEvent(cmd);

        },
        'updateClientInfo': function (cmd) {
          this.expectNotArchived();
          cmd.eventName = 'clientInfoUpdated';
          this.raiseEvent(cmd);
        },
        'updateClientSource': function (cmd) {
          this.expectNotArchived();
          cmd.eventName = 'clientSourceUpdated';
          this.raiseEvent(cmd);
        },
        'updateClientContact': function (cmd) {
          this.expectNotArchived();
          cmd.eventName = 'clientContactUpdated';
          this.raiseEvent(cmd);
        },
        'updateClientAddress': function (cmd) {
          this.expectNotArchived();
          cmd.eventName = 'clientAddressUpdated';
          this.raiseEvent(cmd);
        },
        'archiveClient': function (cmd) {
          this.expectNotArchived();
          this.raiseEvent({
            eventName: 'clientArchived',
            id: this._id,
            archivedDate: new Date()
          });
        },
        'unArchiveClient': function (cmd) {
          this.expectArchived();
          this.raiseEvent({
            eventName: 'clientUnArchived',
            id: this._id,
            unArchivedDate: new Date()
          });
        },
        'purchaseSessions': function(cmd) {
          const events = this.handleNewSessions(cmd);
          events.forEach(this.raiseEvent);
        }
      }
    }

    applyEventHandlers() {
      return {
        'clientAdded': function (event) {
          this._id = event.id;
        }.bind(this),

        'clientArchived': function (event) {
          this._isArchived = true;
        }.bind(this),

        'clientUnArchived': function (event) {
          this._isArchived = false;
        }.bind(this),

        'sessionsPurchased': function (event) {
          if(!this.inventory){
            this.inventory = new entities.Inventory();
          }
          this.inventory.sessionsPurchased(event);

        }.bind(this)
      }
    }

    expectNotArchived() {
      invariant(!this._isArchived, 'Client already archived');
    }

    expectArchived() {
      invariant(this._isArchived, 'Client is not archived archived');
    }

    handleNewSessions(cmd) {
      return [].concat(
        this.addFullHourSessions(cmd),
        this.addHalfHourSessions(cmd),
        this.addPairsSessions(cmd));
    }

    createNewSessionEvent = (sessionType, purchasePrice, purchaseSessionId) => ({
      eventName: `clientPurchased${sessionType}Session`,
      sessionId: uuid.v4(),
      clientId: this._id,
      purchaseSessionId,
      sessionType,
      purchasePrice
    });

    addFullHourSessions(cmd) {
      const individualHourPrice = cmd.fullHour ? cmd.fullHourTotal / cmd.fullHour : 0;
      const tenPackHourPrice = cmd.fullHourTenPack ? cmd.fullHourTenPackTotal / (cmd.fullHourTenPack * 10) : 0;
      let events = Array(cmd.fullHour).fill(this.createNewSessionEvent('FullHour', individualHourPrice, cmd.id));
      return events.contcat(
        Array(cmd.fullHourTenPack * 10)
          .fill(this.createNewSessionEvent('FullHour', tenPackHourPrice, cmd.id))
      );
    }

    addHalfHourSessions(cmd) {
      const individualHalfHourPrice = cmd.halfHour ? cmd.halfHourTotal / cmd.halfHour : 0;
      const tenPackHalfHourPrice = cmd.halfHourTenPack ? cmd.halfHourTenPackTotal / (cmd.halfHourTenPack * 10) : 0;
      let events = Array(cmd.halfHour).fill(this.createNewSessionEvent('HalfHour', individualHalfHourPrice, cmd.id));
      return events.contcat(
        Array(cmd.halfHourTenPack * 10)
          .fill(this.createNewSessionEvent('HalfHour', tenPackHalfHourPrice, cmd.id))
      );
    }

    addPairSessions(cmd) {
      const individualPairPrice = cmd.pair ? cmd.pairTotal / cmd.pair : 0;
      const tenPackPairPrice = cmd.pairTenPack ? cmd.pairTenPackTotal / (cmd.pairTenPack * 10) : 0;
      let events = Array(cmd.pair).fill(this.createNewSessionEvent('Pair', individualPairPrice, cmd.id));
      return events.contcat(
        Array(cmd.pairTenPack * 10)
          .fill(this.createNewSessionEvent('Pair', tenPackPairPrice, cmd.id))
      );
    }
  }
};
