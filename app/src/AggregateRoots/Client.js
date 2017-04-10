/**
 * Created by rharik on 7/13/15.
 */
"use strict";

module.exports = function(AggregateRootBase, invariant, uuid) {
  return class Client extends AggregateRootBase {
    constructor() {
      super();
      this._isArchived;
      this.sessions;
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
        "purchaseSessions": function(cmd) {
          // add sessions to collection
          cmd.eventName = 'sessionsPurchased';
          this.raiseEvent(cmd);
        },
        "refundSessions": function(cmd) {
          // remove sessions from collection
          cmd.eventName = 'sessionsRefunded';
          this.raiseEvent(cmd);
        },
        "cancelSessionPurchaseDueToError": function(cmd) {
          // remove sessions from collection
          cmd.eventName = 'sessionPurchaseCanceledDueToError';
          this.raiseEvent(cmd);
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
          this._isArchived = false;
        }.bind(this),
        'sessionsRefunded': function (event) {
          this._isArchived = false;
        }.bind(this),
        'sessionPurchaseCanceledDueToError': function (event) {
          this._isArchived = false;
        }.bind(this)
      }
    }

    expectNotArchived() {
      invariant(!this._isArchived, 'Client already archived');
    }

    expectArchived() {
      invariant(this._isArchived, 'Client is not archived archived');
    }
  }
};
