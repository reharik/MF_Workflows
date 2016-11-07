/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(eventHandler,
                          eventRepository,
                          logger,
                          appdomain, bcryptjs) {

    var createPassword = function (_password) {
        try {
            var salt = bcryptjs.genSaltSync(10);
            var hash = bcryptjs.hashSync(_password, salt);
            return hash;
        }
        catch (err) {
            throw err;
        }
    };

    return class TrainerWorkflow extends eventHandler {
        constructor() {
            super();
            this.handlesEvents = ['loginTrainer','hireTrainer'];
            this.handlerName   = 'TrainerWorkflow';
        }

        *loginTrainer(cmd) {
            console.log(cmd);
            var trainer = yield eventRepository.getById(appdomain.Trainer, cmd.Id);
            trainer.loginTrainer(cmd);
            return yield eventRepository.save(trainer, { continuationId: cmd.continuationId });
        }

        *hireTrainer(cmd) {
            logger.info('calling hiretrainer');
            var trainer = new appdomain.Trainer();
            cmd.credentials.password = createPassword(cmd.credentials.password);
            trainer.hireTrainer(cmd);
            logger.info('saving trainer');
            logger.trace(trainer);
            return yield eventRepository.save(trainer);
        }
    };
};
