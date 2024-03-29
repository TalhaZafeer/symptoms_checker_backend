const axios = require("axios");

const clientId = "iWBMatFgRWCMnfw2HjfqXw";
const accountId = "IhxjrHIPS7GV6vX9CFG8bg";
const clientSecret = "WzEWeuXkVVr7aa9aksQJESjo6CFJ2auK";
const api_base_url = "https://api.zoom.us/v2/users/me/meetings";
const zoomTokenLink =
  "https://zoom.us/oauth/token?grant_type=account_credentials&account_id=IhxjrHIPS7GV6vX9CFG8bg";

export async function createMeeting(
  topic: string,
  duration: any,
  start_time: any
) {
  try {
    const authResponse = await axios.post(
      zoomTokenLink,
      {},
      {
        auth: {
          username: clientId,
          password: clientSecret,
        },
      }
    );

    if (authResponse.status !== 200) {
      console.log("Unable to get access token");
      return;
    }

    const access_token = authResponse.data.access_token;

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };

    const payload = {
      topic: topic,
      duration: duration,
      start_time: start_time,
      type: 2,
      settings: {
        join_before_host: true,
      },
    };

    const meetingResponse = await axios.post(`${api_base_url}`, payload, {
      headers,
    });

    if (meetingResponse.status !== 201) {
      console.log("Unable to generate meeting link");
      return;
    }

    const response_data = meetingResponse.data;

    return response_data.join_url;
  } catch (error: any) {
    console.error(error);
  }
}
