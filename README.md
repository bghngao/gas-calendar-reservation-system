# Google Apps Script - Google Calendar Reservation System
This project is meant to create a Google Calendar Reservation System for rooms, equipment, etc. using Google Forms and Google Apps Scripts to check availability and reflect the reservation in a shareable calendar.

To duplicate this reservation system, 

1. Create a new Google Form with the following fields

   A. Short Answer - Name 

   B. Short Answer - Email
   (Optional: Response Validation with settings of "Regular Expression", "Matches", "[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+", "Please provide a valid email address")

   C. Multiple Choice - List of Room or Equipment

   D. Short Answer - Description
   Purpose or description of the reservation

   E. Date - Start Time
   Required: Include Time

   F. Date - End Time
   Required: Include Time
   
2. For each Room or Equipment in (C), create a Google Calender.
   I.e. If you have 3 rooms, create 3 calendars.
