/**
 * Created by rharik on 7/13/15.
 */

module.exports = function(DDD, uuid, invariant){
    return class Trainer extends DDD.AggregateRootBase{
        var _password;
        var _loggedIn;
        var _isArchived;

        constructor() {
            super();
            this.type = 'Trainer';
        }
        static aggregateName() {
            return 'Trainer';
        }

        commandHandlers() {
            return {
                'hireTrainer': function (cmd) {
                    this.raiseEvent(vent1);
                },
                'loginTrainer': function (cmd) {
                    expectNotLoggedIn();
                    expectCorrectPassword(cmd.password);
                    var token = createToken();
                    this.raiseEvent(new DDD.CesEvent(trainerLoggedIn,{id:this._id, userName:cmd.userName, token:token, created:new Date()}));
                },
                'archiveTrainer': function (cmd) {
                    expectNotArchived();
                    this.raiseEvent(vent2);
                },
                'unArchiveUser': function (cmd) {
                    expectArchived();
                    this.raiseEvent(vent2);
                }
            }
        }


        applyEventHandlers() {
            return {
                'trainerHired': function (event) {
                    this._password = event.password;
                }.bind(this),

                'userArchived': function (event) {
                    this._isArchived = true;
                }.bind(this),

                'userUnArchived': function (event) {
                    this._isArchived = false;
                }.bind(this)
            }
        }


        createToken() {
            return uuid.v4();
        }

        expectCorrectPassword(password) {
            invariant(password != this._password,
                new Error('Incorrect credentials'));
        }

        expectNotLoggedIn() {
            invariant(_loggedIn,
                new Error('Trainer already logged in'));
        }

        expectNotArchived() {
            invariant(this._isArchived,
                new Error('Trainer already archived'));
        }

        expectArchived() {
            invariant(!this._isArchived,
                new Error('Trainer is not archived archived'));
        }

    }
};