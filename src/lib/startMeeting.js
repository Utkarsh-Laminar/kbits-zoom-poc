'use client'
import { userConfig } from '@/lib/userConfig';
import { fetchMeetingData } from './fetchMeetingData';

const {meetingNumber,userName,userEmail,passWord,leaveUrl} = userConfig;

export const startMeeting = async (ZoomMtg) => { 
    const {sdkKey,token} = await fetchMeetingData();
    if (!token || !sdkKey) {
        console.error('Meeting data not available');
        return;
      }
      try {
      ZoomMtg.preLoadWasm()
      ZoomMtg.prepareWebSDK()
      ZoomMtg.init({
        leaveUrl: leaveUrl,
         patchJsMedia: true,
        success: (success) => {
          console.log("Zoom Meeting SDK initialized successfully:", success);
          console.log("Joining meeting...");
          ZoomMtg.join({
            signature: token,
            sdkKey: sdkKey,
            meetingNumber: meetingNumber,
            passWord: passWord,
            userName: userName,
            userEmail: userEmail,
            success: (success) => {
              console.log("Meeting joined successfully:", success);   
            },
            error: (error) => {
              console.log("Error joining meeting:", error);
            }
          })
        },
        error: (error) => {
          console.log("Error initializing Zoom Meeting SDK:", error);
        }
      })
      } catch (error) {
        console.log(`Error: ${error}`);
      }
}