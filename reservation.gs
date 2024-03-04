// Room or Equipment Reservation System

//
const form_link = "https://docs.google.com/forms/d/e/1FAIpQLSe40JLJ8WAJl_5lsfE_GIjsiLwkiafS9l4qlDSC_ItUH0jcdw/viewform";       // link of reservation form

// list of calendars
const room1             =     CalendarApp.getOwnedCalendarById('fdabf607056f33114afe42e5efc11c4022c9156f21fdac160dfe29fffd6d5cab@group.calendar.google.com');
const room2             =     CalendarApp.getOwnedCalendarById('');
const room3             =     CalendarApp.getOwnedCalendarById('');
//const cleanbench1     =     CalendarApp.getOwnedCalendarById('');
//const cleanbench2     =     CalendarApp.getOwnedCalendarById('');
//const safetycabinet   =     CalendarApp.getOwnedCalendarById('');
//const darkroom        =     CalendarApp.getOwnedCalendarById('');

function onFormSubmit(e) {                                              
  let timestamp = e.values[0];                                                                      // timestamp of form entry
  let name = e.values[1];                                                                           // user name from form entry
  let email = e.values[2];                                                                          // user email from form entry
  let room_equipment = e.values[3];                                                                 // which room/equipment that user wants to reserve
  let reservation_description = e.values[4];                                                        // reason for reservation
  let start_time = new Date(e.values[5]);                                                           // create reservation start time ojbect
  let end_time = new Date(e.values[6]);                                                             // create reservation end time object
  let dateString = start_time.toString().substring(0,15);                                           // create reservation date string (e.g. "Mon Jan 01 2024")
  let calendar = eval(e.values[3].replace(/\s/g, "").toLowerCase()).setTimeZone("Asia/Tokyo");      // obtain the calendar of room/equipment by removing whitespace and switching to all lower case (e.g. Room 1 to room1)

  // -------------------- check for conflicts--------------------
  if(!calendar.getEvents(start_time, end_time).length) {                                            // check for calendar event conflicts
    reservation_name = name + " - " + reservation_description;                                      // create reservation description for calendar reservation
    calendar.createEvent(reservation_name, start_time, end_time, {description: reservation_description});     // create calendar event
    sendEmail(email, room_equipment, dateString, status = "Confirmed", start_time, end_time, name, reservation_description, form_link);     //call sendEmail function passing in variables
  }
  else {
    sendEmail(email, room_equipment, dateString, status = "Declined", start_time, end_time, name, reservation_description, form_link);      //call sendEmail function passing in variables
  }
}

function sendEmail(email, room_equipment, dateString, status, start_time, end_time, name, reservation_description, form_link){              // start of sendEmail function
  switch(status){           // check reservation status
    case "Confirmed":       // if reservation is confirmed
      var email_body = HtmlService.createHtmlOutputFromFile('email_body').getContent();       // create email body using html file
      email_body = email_body.replace('{STATUS}', status);                                    // fill in status of reservation
      email_body = email_body.replace('{MESSAGE}', "Your reservation for " + room_equipment + " on " + dateString.substring(4) + " from " + start_time.toString().substring(16,21) + " to " + end_time.toString().substring(16,21) + " has been confirmed.");   // fill in reservation message
      email_body = email_body.replace('{NAME}', name);    // fill in user name
      email_body = email_body.replace('{ROOM_EQUIPMENT}', room_equipment);    // fill in room/equipment to be reserved
      email_body = email_body.replace('{DESCRIPTION}', reservation_description);    // fill in reservation description
      email_body = email_body.replace('{DATE_START}', start_time.toString().substring(0,21));   // fill in reservation start time
      email_body = email_body.replace('{DATE_END}', end_time.toString().substring(0,21));   // fill in reservation end time
      email_body = email_body.replace('{FORM_LINK}', form_link);    // fill in google form sheet for button

      MailApp.sendEmail({   //send email to user
        to: email,
        subject: "Reservation for " + room_equipment + " on " + dateString + " has been accepted",
        htmlBody: email_body
      })
      break;
    case "Declined":    // if reservation is declined
      var email_body = HtmlService.createHtmlOutputFromFile('email_body').getContent();   // create email body using html file
      email_body = email_body.replace('{STATUS}', status);    // fill in status of reservation
      email_body = email_body.replace('{MESSAGE}', "Your reservation for " + room_equipment + " on " + dateString + " from " + start_time.toString().substring(16,21) + " to " + end_time.toString().substring(16,21) + " has been declined due to conflict.");   // fill in reservation message
      email_body = email_body.replace('{NAME}', name);    // fill in user name
      email_body = email_body.replace('{ROOM_EQUIPMENT}', room_equipment);    // fill in room/equipment to be reserved
      email_body = email_body.replace('{DESCRIPTION}', reservation_description);    // fill in reservation description
      email_body = email_body.replace('{DATE_START}', start_time.toString().substring(0,21));   // fill in reservation start time
      email_body = email_body.replace('{DATE_END}', end_time.toString().substring(0,21));   // fill in reservation end time
      email_body = email_body.replace('{FORM_LINK}', form_link);    // fill in google form sheet for butto

      MailApp.sendEmail({   //send email to user
        to: email,
        subject: "Reservation for " + room_equipment + " on " + dateString + " has been declined",
        htmlBody: email_body
      })    
      break;
  }
}
