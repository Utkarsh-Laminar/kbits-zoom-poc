"use client"

import { fetchMeetingData } from '@/lib/fetchMeetingData';
import { userConfig } from '@/lib/userConfig';
import { useEffect, useState } from 'react';

const Meeting = () => {
const {meetingNumber,userName,userEmail,passWord,leaveUrl} = userConfig;
const [token,setToken] = useState(null);
const[sdkKey,setSdkKey] = useState(null);

  useEffect(()=>{
    const init = async() =>{
      const {ZoomMtg} = await import('@zoom/meetingsdk')
      const {sdkKey,token} = await fetchMeetingData();
        // console.log(`USEFFECT Token: ${token}`);
        // console.log(`USEEFFECT SdkKey: ${sdkKey}`);
       setToken(token);
       setSdkKey(sdkKey);
    }
    init();
  },[])
  
   function startMeeting() {
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
  return (
  <div className="m-auto text-center">
  <main>
        <h1>Zoom Meeting SDK Sample React</h1>
        <button
        className='mt-[20px] bg-[#2D8CFF] text-white py-[10px] px-[40px] rounded-lg cursor-pointer out'
        onClick={()=>startMeeting()}>Join Meeting</button>
      </main>
  </div>)
}

export default Meeting;