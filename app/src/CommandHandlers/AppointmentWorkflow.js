module.exports = function(eventRepository,
                          logger,
                          appdomain) {

  return function AppointmentWorkflow(){

    async function scheduleAppointment(cmd, continuationId) {
      logger.info('calling scheduleAppointment');
      var appointment = new appdomain.Appointment();
      appointment.scheduleAppointment(cmd);

      logger.info('saving appointment');
      logger.trace(appointment);

      await eventRepository.save(appointment, { continuationId });
      return {appointmentId: appointment._id}
    }

    return {
      handlerName: 'AppointmentWorkflow',
      scheduleAppointment
    }
  };
};
