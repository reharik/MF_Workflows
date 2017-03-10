/**
 * Created by rharik on 7/13/15.
 */
"use strict";

module.exports = function(AggregateRootBase, invariant, uuid) {
    return class Trainer extends AggregateRootBase {
        constructor() {
            super();
            this._password = undefined;
            this._isArchived = false;
            this.type = 'Trainer';
        }

        static aggregateName() {
            return 'Trainer';
        }

        commandHandlers() {
            return {
                'hireTrainer'   : function(cmd) {
                    cmd.id = uuid.v4();
                    this.raiseEvent({
                        eventName     : 'trainerHired',
                        data          : cmd
                    });
                },
                'updateTrainerInfo'   : function(cmd) {
                    this.expectNotArchived();
                    this.raiseEvent({
                        eventName     : 'trainerInfoUpdated',
                        data          : cmd
                    });
                },
                'updateTrainerContact'   : function(cmd) {
                    this.expectNotArchived();
                    this.raiseEvent({
                        eventName     : 'trainerContactUpdated',
                        data          : cmd
                    });
                },
                'updateTrainerAddress'   : function(cmd) {
                    this.expectNotArchived();
                    this.raiseEvent({
                        eventName     : 'trainerAddressUpdated',
                        data          : cmd
                    });
                },
                'updateTrainerPassword'   : function(cmd) {
                    this.expectNotArchived();
                    this.raiseEvent({
                        eventName     : 'trainerPasswordUpdated',
                        data          : cmd
                    });
                },

                // 'loginTrainer'  : function(cmd) {
                //     this.expectNotLoggedIn();
                //     this.expectCorrectPassword(cmd.password);
                //     var token = this.createToken();
                //     this.raiseEvent({
                //         eventName: 'trainerLoggedIn',
                //         data     : {
                //             id      : this._id,
                //             userName: cmd.userName,
                //             token   : token,
                //             created : new Date()
                //         }
                //     });
                // },
                'archiveTrainer': function(cmd) {
                    this.expectNotArchived();
                    this.raiseEvent({
                        eventName: 'trainerArchived',
                        data     : {
                            id          : this._id,
                            archivedDate: new Date()
                        }
                    });
                },
                'unArchiveUser' : function(cmd) {
                    this.expectArchived();
                    this.raiseEvent({
                        eventName: 'trainerUnArchived',
                        data     : {
                            id            : this._id,
                            unArchivedDate: new Date()
                        }
                    });
                },
                'updateTrainersClients' : function(cmd) {
                    this.expectNotArchived();
                    this.raiseEvent({
                        eventName     : 'trainersClientsUpdated',
                        data          : cmd
                    });
                }
            }
        }

        applyEventHandlers() {
            return {
                'trainerHired': function(event) {
                    this._password = event.data.password;
                    this._id       = event.data.id;
                }.bind(this),

                'trainerPasswordUpdated': function(event) {
                    this._password = event.data.password;
                }.bind(this),

                'trainerArchived': function(event) {
                    this._isArchived = true;
                }.bind(this),

                'trainerUnArchived': function(event) {
                    this._isArchived = false;
                }.bind(this)
            }
        }

        createToken() {
            return uuid.v4();
        }

        expectCorrectPassword(password) {
            invariant(password === this._password, 'Incorrect credentials');
        }

        // expectNotLoggedIn() {
        //     invariant(!this._loggedIn, 'Trainer already logged in');
        // }

        expectNotArchived() {
            invariant(!this._isArchived, 'Trainer already archived');
        }

        expectArchived() {
            invariant(this._isArchived, 'Trainer is not archived archived');
        }
    }
};
