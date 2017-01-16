module.exports = function(eventRepository,
                          logger,
                          appdomain) {

  return function DayWorkflow(){

    async function scheduleAppointment(cmd, continuationId) {
      logger.info('calling scheduleAppointment on Day');
      var day = await eventRepository.getById(appdomain.Day, cmd.id);
        if(!day){
          day = new appdomain.Day();
        }
      day.scheduleAppointment(cmd);

      var newAppointmentId = day.getNewAppointmentId(cmd.startTime, cmd.endTime, cmd.trainer);

      logger.info('saving Day');
      logger.trace(day);

      await eventRepository.save(day, { continuationId });
      return {appointmentId: newAppointmentId}
    }

    return {
      handlerName: 'AppointmentWorkflow',
      scheduleAppointment
    }
  };
};
