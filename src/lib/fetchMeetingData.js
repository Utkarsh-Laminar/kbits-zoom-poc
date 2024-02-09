import { userConfig } from "./userConfig";

const {meetingNumber} = userConfig;
export const fetchMeetingData = async() =>{
    const response = await fetch('/api/zoom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingNumber: meetingNumber,
        })
      });
        const data = await response.json();
        const {token,sdkKey} = data;
        return {token,sdkKey};
    }