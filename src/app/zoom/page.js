'use client'

import { ZoomMtg } from '@zoom/meetingsdk';

const Meeting = () => {
const meetingNumber =2628145555;
const userName ="Utkarsh";
const email ="utkarsh.gangurde@lamin.ar";
const passWord ="Kbits123"
const leaveUrl=`${window.location.href}`;

  async function startMeeting() {
    ZoomMtg.preLoadWasm()
    ZoomMtg.prepareWebSDK()

    const response = await fetch('/api/zoom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
      })
    });
      const data = await response.json();
     const {token,sdkKey} = data;
     console.log(`Token${token}`);
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
          userEmail: email,
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