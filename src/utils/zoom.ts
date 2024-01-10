const axios = require("axios");

const clientId = "2izeoLo6S0Oi0gCpfroVhw";
const accountId = "RBkiXXavTfG0crb-6qVGqw";
const clientSecret = "rIWtM58pLqxSxajIc0TXeZ0kiDmjLPue";
const api_base_url = "https://api.zoom.us/v2/users/me/meetings";
const zoomTokenLink =
  "https://zoom.us/oauth/token?grant_type=account_credentials&account_id=RBkiXXavTfG0crb-6qVGqw";

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
    };

    const meetingResponse = await axios.post(`${api_base_url}`, payload, {
      headers,
    });

    if (meetingResponse.status !== 201) {
      console.log("Unable to generate meeting link");
      return;
    }

    const response_data = meetingResponse.data;

    return response_data.start_url;
  } catch (error: any) {
    console.error(error);
  }
}
