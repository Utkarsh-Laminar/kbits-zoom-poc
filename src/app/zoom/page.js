'use client'
import { fetchMeetingData } from '@/lib/fetchMeetingData';
import { userConfig } from '@/lib/userConfig';
import { generateSignature } from '@/lib/zoom';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Meeting = () => {
const {meetingNumber,userName,userEmail,passWord} = userConfig;
const [token,setToken] = useState(null);
const[sdkKey,setSdkKey] = useState(null);

  useEffect(()=>{
    const init = async() =>{
      const {ZoomMtg} = await import('@zoom/meetingsdk')
      const {sdkKey,token} = await fetchMeetingData();
        // console.log(`USEFFECT Token: ${token}`);
      //   console.log(`USEEFFECT SdkKey: ${sdkKey}`);
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
    ZoomMtg.i18n.load('en-US')
    ZoomMtg.init({
      leaveUrl: `${window.location.href}`,
       patchJsMedia: true,
      success: (success) => {
        console.log("Zoom Meeting SDK initialized successfully:", success);
        console.log("Joining meeting...");
        console.log(`KEY : ${process.env.ZOOM_API_SECRET}`);
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
    <Head>
  <link type="text/css" rel="stylesheet" href="https://source.zoom.us/3.1.6/css/bootstrap.css" />
  <link type="text/css" rel="stylesheet" href="https://source.zoom.us/3.1.6/css/react-select.css" />
    </Head>
        <h1>Zoom Meeting SDK Sample React</h1>
        <button
        className='mt-[20px] bg-[#2D8CFF] text-white py-[10px] px-[40px] rounded-lg cursor-pointer out'
        onClick={()=>startMeeting()}>Join Meeting</button>
      </main>
  </div>)
}

export default Meeting;