module.exports = function(eventRepository,
                          logger,
                          appdomain) {

  return function DayWorkflow(){

    async function rescheduleAppointmentTime(cmd, continuationId) {
      return await updateAppointment(cmd, continuationId);
    }
    async function changeAppointmentType(cmd, continuationId) {
      return await updateAppointment(cmd, continuationId);
    }
    async function changeAppointmentClients(cmd, continuationId) {
      return await updateAppointment(cmd, continuationId);
    }
    async function changeAppointmentTrainer(cmd, continuationId) {
      return await updateAppointment(cmd, continuationId);
    }
    async function updateNotesForAppointment(cmd, continuationId) {
      return await updateAppointment(cmd, continuationId);
    }

    async function scheduleAppointment(cmd, continuationId) {
      let day = await scheduleAppointmentBase(cmd);
      var newAppointmentId = day.getNewAppointmentId(cmd.startTime, cmd.endTime, cmd.trainer);

      logger.info('saving Day');
      logger.trace(day._id);

      await eventRepository.save(day, { continuationId });
      return {appointmentId: newAppointmentId}
    }

    async function rescheduleAppointmentToNewDay(cmd, continuationId) {
      let day = await scheduleAppointmentBase(cmd);
      var oldDay = await eventRepository.getById(appdomain.Day, cmd.originalEntityName);
      
      oldDay.cancelAppointment(cmd);
      var newAppointmentId = day.getNewAppointmentId(cmd.startTime, cmd.endTime, cmd.trainer);
      
      logger.info('saving Day');
      logger.trace(day._id);
      await eventRepository.save(day, { continuationId });

      logger.info('saving OldDay');
      logger.trace(oldDay._id);
      await eventRepository.save(oldDay, { continuationId });
      return {appointmentId: newAppointmentId}
    }

    async function scheduleAppointmentBase(cmd, continuationId) {
      logger.info(`calling ${cmd.commandName} on Day`);
      var day = await eventRepository.getById(appdomain.Day, cmd.entityName);
      if(!day){
        day = new appdomain.Day();
      }
      day.scheduleAppointment(cmd);
      return day;
    }

    async function updateAppointment(cmd, continuationId) {
      logger.info(`calling ${cmd.commandName} on Day`);
      var day = await eventRepository.getById(appdomain.Day, cmd.entityName);
      if(!day){
        day = new appdomain.Day();
      }
      day[cmd.commandName](cmd);

      logger.info('saving Day');
      logger.trace(day._id);

      await eventRepository.save(day, { continuationId });
      return {appointmentId: cmd.appointmentId}
    }

    async function cancelAppointment(cmd, continuationId) {
      logger.info(`calling ${cmd.commandName} on Day`);
      var day = await eventRepository.getById(appdomain.Day, cmd.entityName);
      day.cancelAppointment(cmd);

      logger.info('saving Day');
      logger.trace(day._id);

      await eventRepository.save(day, { continuationId });
      return {appointmentId: cmd.appointmentId}
    }


    return {
      handlerName: 'DayWorkflow',
      scheduleAppointment,
      rescheduleAppointmentTime,
      changeAppointmentType,
      changeAppointmentClients,
      changeAppointmentTrainer,
      rescheduleAppointmentToNewDay,
      cancelAppointment,
      updateNotesForAppointment
    }
  };
};
