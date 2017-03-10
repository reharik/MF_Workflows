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
                'addClient'   : function(cmd) {
                    cmd.id = cmd.id || uuid.v4();
                    this.raiseEvent({
                        eventName     : 'clientAdded',
                        data          : cmd
                    });
                },
                'updateClientInfo'   : function(cmd) {
                    this.expectNotArchived();
                    this.raiseEvent({
                        eventName     : 'clientInfoUpdated',
                        data          : cmd
                    });
                },
                'updateClientSource'   : function(cmd) {
                    this.expectNotArchived();
                    this.raiseEvent({
                        eventName     : 'clientSourceUpdated',
                        data          : cmd
                    });
                },
                'updateClientContact'   : function(cmd) {
                    this.expectNotArchived();
                    this.raiseEvent({
                        eventName     : 'clientContactUpdated',
                        data          : cmd
                    });
                },
                'updateClientAddress'   : function(cmd) {
                    this.expectNotArchived();
                    this.raiseEvent({
                        eventName     : 'clientAddressUpdated',
                        data          : cmd
                    });
                },
                'archiveClient': function(cmd) {
                    this.expectNotArchived();
                    this.raiseEvent({
                        eventName: 'clientArchived',
                        data     : {
                            id          : this._id,
                            archivedDate: new Date()
                        }
                    });
                },
                'unArchiveClient' : function(cmd) {
                    this.expectArchived();
                    this.raiseEvent({
                        eventName: 'clientUnArchived',
                        data     : {
                            id            : this._id,
                            unArchivedDate: new Date()
                        }
                    });
                }
            }
        }

        applyEventHandlers() {
            return {
                'clientAdded': function(event) {
                    this._id       = event.data.id;
                }.bind(this),

                'clientArchived': function(event) {
                    this._isArchived = true;
                }.bind(this),

                'clientUnArchived': function(event) {
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
