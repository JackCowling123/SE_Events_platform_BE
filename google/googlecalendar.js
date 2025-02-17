
const generateGoogleCalendarLink = (event) => { // summoned by event being passed in as variable

    const baseCalendarUrl = "https://calendar.google.com/calendar/render";


    const formatDateForGoogleCalendar = (time) => { // Function to format dates into Google's required format: YYYYMMDDTHHmmSSZ

        const dateObject = new Date(time);  // Create a new JavaScript Date object from the given time


        const isoDateString = dateObject.toISOString(); // Converts date to ISO string so it can be accurately interpreted across different timezones


        const formattedDate = isoDateString.replace(/-|:|\.\d+/g, ""); // Regex to remove the following: dashes (-), colons (:), and milliseconds (.000)

        return formattedDate; // Return the properly formatted date
    };

    // Format the event start and end times
    const formattedStartTime = formatDateForGoogleCalendar(event.startTime); // summons the formatted time above, stored as variable for start time
    const formattedEndTime = formatDateForGoogleCalendar(event.endTime);// summons the formatted time above, stored as variable for end time

    // Info used for Google Calendar
    const googleCalendarParams = new URLSearchParams({
        action: "TEMPLATE", // Specifies this as an event template
        text: event.title, // Sets the event title
        details: event.description, // Sets the event description
        location: event.location, // Sets the event location
        dates: `${formattedStartTime}/${formattedEndTime}` // Adds start and end time in the required format
    });


    return `${baseCalendarUrl}?${googleCalendarParams.toString()}`; // Append created parameters to the baseUrl for use

};

// Export the function for use in other files
module.exports = { generateGoogleCalendarLink };
