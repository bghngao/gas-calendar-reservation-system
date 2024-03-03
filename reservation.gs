// Room or Equipment Reservation System

//
const form_link = "google.com";

// list of calendars
const room1          =     CalendarApp.getOwnedCalendarById('fdabf607056f33114afe42e5efc11c4022c9156f21fdac160dfe29fffd6d5cab@group.calendar.google.com');
const room2          =     CalendarApp.getOwnedCalendarById('');
const room3          =     CalendarApp.getOwnedCalendarById('');
//const cleanbench1    =     CalendarApp.getOwnedCalendarById('');
//const cleanbench2    =     CalendarApp.getOwnedCalendarById('');
//const safetycabinet  =     CalendarApp.getOwnedCalendarById('');
//const darkroom  =     CalendarApp.getOwnedCalendarById('');

function onFormSubmit(e) {                                              
  let timestamp = e.values[0];
  let name = e.values[1];
  let email = e.values[2];
  let room_equipment = e.values[3];
  let reservation_description = e.values[4];
  let start_time = new Date(e.values[5]);
  let end_time = new Date(e.values[6]);
  let dateString = start_time.toString().substring(0,15);
  let calendar = eval(e.values[3].replace(/\s/g, "").toLowerCase()).setTimeZone("Asia/Tokyo");

  // -------------------- check for conflicts--------------------
  if(!calendar.getEvents(start_time, end_time).length) {
    reservation_name = name + " - " + reservation_description;
    calendar.createEvent(reservation_name, start_time, end_time, {description: reservation_description});
    sendEmail(email, room_equipment, dateString, status = "Confirmed", start_time, end_time, name, reservation_description, form_link);
  }
  else {
    sendEmail(email, room_equipment, dateString, status = "Declined", start_time, end_time, name, reservation_description, form_link);
  }
}

function sendEmail(email, room_equipment, dateString, status, start_time, end_time, name, reservation_description, form_link){
  switch(status){
    case "Confirmed":
      var email_body = HtmlService.createHtmlOutputFromFile('email_body').getContent();
      email_body = email_body.replace('{STATUS}', status);
      email_body = email_body.replace('{MESSAGE}', "Your reservation for " + room_equipment + " on " + dateString.substring(4) + " from " + start_time.toString().substring(16,21) + " to " + end_time.toString().substring(16,21) + " has been confirmed.");
      email_body = email_body.replace('{NAME}', name);
      email_body = email_body.replace('{ROOM_EQUIPMENT}', room_equipment);
      email_body = email_body.replace('{DESCRIPTION}', reservation_description);
      email_body = email_body.replace('{DATE_START}', start_time.toString().substring(0,21));
      email_body = email_body.replace('{DATE_END}', end_time.toString().substring(0,21));
      email_body = email_body.replace('{FORM_LINK}', form_link);

      MailApp.sendEmail({
        to: email,
        subject: "Reservation for " + room_equipment + " on " + dateString + " has been accepted",
        htmlBody: email_body
      })
      break;
    case "Declined":
      var email_body = HtmlService.createHtmlOutputFromFile('email_body').getContent();
      email_body = email_body.replace('{STATUS}', status);
      email_body = email_body.replace('{MESSAGE}', "Your reservation for " + room_equipment + " on " + dateString + " from " + start_time.toString().substring(16,21) + " to " + end_time.toString().substring(16,21) + " has been declined due to conflict.");
      email_body = email_body.replace('{NAME}', name);
      email_body = email_body.replace('{ROOM_EQUIPMENT}', room_equipment);
      email_body = email_body.replace('{DESCRIPTION}', reservation_description);
      email_body = email_body.replace('{DATE_START}', start_time.toString().substring(0,21));
      email_body = email_body.replace('{DATE_END}', end_time.toString().substring(0,21));
      email_body = email_body.replace('{FORM_LINK}', form_link);

      MailApp.sendEmail({
        to: email,
        subject: "Reservation for " + room_equipment + " on " + dateString + " has been declined",
        htmlBody: email_body
      })    
      break;
  }
}
