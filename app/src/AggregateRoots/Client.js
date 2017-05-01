/**
 * Created by rharik on 7/13/15.
 */
'use strict';

module.exports = function(AggregateRootBase, ClientInventory, invariant, uuid) {
  return class Client extends AggregateRootBase {
    constructor() {
      super();
      this._isArchived;
      this.type = 'Client';
      this.clientInventory = new ClientInventory();
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
        'purchase': function(cmd) {
          cmd.id = cmd.id || uuid.v4();
          cmd.eventName = 'sessionsPurchased';
          var clientInventoryUpdated = this.clientInventory.calculateInventory(cmd);
          clientInventoryUpdated.clientId = this._id;
          clientInventoryUpdated.eventName = 'clientInventoryUpdated';
          this.raiseEvent(clientInventoryUpdated);
          this.raiseEvent(cmd);
        }
      }
    };

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
        'clientInventoryUpdated': function (event) {
          this.clientInventory.setInventory(event);
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
