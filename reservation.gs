// Room Reservation System

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
  let dateString = (start_time.getMonth()+1) + '-' + start_time.getDate() + '-' + (start_time.getYear()-100);
  let calendar = eval(e.values[3].replace(/\s/g, "").toLowerCase()).setTimeZone("Asia/Tokyo");

  // -------------------- check for conflicts--------------------
  if(!calendar.getEvents(start_time, end_time).length) {
    reservation_name = name + " " + room_equipment;
    calendar.createEvent(reservation_name, start_time, end_time, {description: reservation_description});
    sendEmail(email, room_equipment, dateString, status = "Approve");
  }
  else {
    sendEmail(email, room_equipment, dateString, status = "Conflict");
  }
}

function sendEmail(email, room_equipment, dateString, status){
  switch(status){
    case "Approve":
      MailApp.sendEmail({
        to: email,
        subject: "Reservation for " + room_equipment + " on " + dateString + " has been accepted",
        body: "Accepted"
        //htmlBody: generateEmail(reservation)
      })
      break;
    case "Conflict":
      MailApp.sendEmail({
        to: email,
        subject: "Reservation for " + room_equipment + " on " + dateString + " has been declined",
        body: "Declined"
        //htmlBody: generateEmail(reservation)
      })    
      break;
  }
}
