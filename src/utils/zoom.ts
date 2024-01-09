const axios = require("axios");

const clientId = "2izeoLo6S0Oi0gCpfroVhw";
const accountId = "RBkiXXavTfG0crb-6qVGqw";
const clientSecret = "rIWtM58pLqxSxajIc0TXeZ0kiDmjLPue";
const auth_token_url = "https://zoom.us/oauth/token";
const api_base_url = "https://api.zoom.us/v2";

export async function createMeeting(
  topic: string,
  duration: any,
  start_time: any
) {
  try {
    const authResponse = await axios.post(
      auth_token_url,
      {
        grant_type: "account_credentials",
        account_id: accountId,
        client_secret: clientSecret,
      },
      {
        auth: {
          username: clientId,
          password: clientSecret,
        },
      }
    );

    console.log(authResponse);

    // if (authResponse.status !== 200) {
    //   console.log("Unable to get access token");
    //   return;
    // }

    // const access_token = authResponse.data.access_token;

    // const headers = {
    //   Authorization: `Bearer ${access_token}`,
    //   "Content-Type": "application/json",
    // };

    // // const startTime = `${start_date}T10:${start_time}`;

    // const payload = {
    //   topic: topic,
    //   duration: duration,
    //   start_time: new Date(),
    //   type: 2,
    // };

    // const meetingResponse = await axios.post(
    //   `${api_base_url}/users/me/meetings`,
    //   payload,
    //   { headers }
    // );

    // if (meetingResponse.status !== 201) {
    //   console.log("Unable to generate meeting link");
    //   return;
    // }

    // const response_data = meetingResponse.data;

    // const content = {
    //   meeting_url: response_data.join_url,
    //   password: response_data.password,
    //   meetingTime: response_data.start_time,
    //   purpose: response_data.topic,
    //   duration: response_data.duration,
    //   message: "Success",
    //   status: 1,
    // };

    // console.log(content);
  } catch (error: any) {
    console.error(error.message);
  }
}
