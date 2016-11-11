/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(eventRepository,
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

    return function TrainerWorkflow(){

        async function loginTrainer(cmd, continuationId ) {
            var trainer = await eventRepository.getById(appdomain.Trainer, cmd.Id);
            trainer.loginTrainer(cmd);
            return await eventRepository.save(trainer, { continuationId });
        }

        async function hireTrainer(cmd, continuationId) {
            logger.info('calling hiretrainer');
            var trainer = new appdomain.Trainer();
            var cmdClone = Object.assign({},cmd)
            cmdClone.credentials.password = createPassword(cmd.credentials.password);
            trainer.hireTrainer(cmdClone);

            logger.info('saving trainer');
            logger.trace(trainer);

            await eventRepository.save(trainer, { continuationId });
            return {trainerId: trainer._id}
        }

        return {
            handlerName: 'TrainerWorkflow',
            loginTrainer,
            hireTrainer
        }
    };
};
