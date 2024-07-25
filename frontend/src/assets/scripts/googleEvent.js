const CLIENT_ID = "963717959826-r8pqcokli44anvueklidtkh1gmn0haa0.apps.googleusercontent.com";
const API_KEY = "AIzaSyBDxB2W7JJsrsePEjo9hPnNLFrYh5PCf90";
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar";

let tokenClient;
let gapiInited = false;
let gisInited = false;

function gapiLoaded() {
  gapi.load("client", initializeGapiClient);
}

async function initializeGapiClient() {
  try {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    console.log("GAPI client initialized");
    maybeEnableCreateButton(); // Optionally enable UI elements after initialization
  } catch (error) {
    console.error('Error initializing GAPI client', error);
  }
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
  console.log("Token client initialized");
  maybeEnableCreateButton(); // Optionally enable UI elements after initialization
}

function createGoogleEvent(eventDetails) {
  console.log("Attempting to create Google Event", eventDetails);

  if (!gapiInited || !gisInited) {
    console.error("Google API client or Identity Services not initialized.");
    return;
  }

  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      console.error('Error during token request', resp);
      throw resp;
    }
    await scheduleEvent(eventDetails);
  };

  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    tokenClient.requestAccessToken({ prompt: "" });
  }
}

function scheduleEvent(eventDetails) {
  const event = {
    summary: "Scheduled Meeting",
    location: "Online", // Update with actual location if needed
    description: "A scheduled meeting through the Event Management System.",
    start: {
      dateTime: eventDetails.startTime,
      timeZone: "GMT+3", // Adjust timezone as per your needs
    },
    end: {
      dateTime: eventDetails.endTime,
      timeZone: "GMT+3", // Adjust timezone as per your needs
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  const request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });

  request.execute(function (event) {
    console.info("Event created: " + event.htmlLink);
  });
}

// Optional: Function to enable UI elements after initialization
function maybeEnableCreateButton() {
  // Example: Enable a create button or UI elements after initialization
}
