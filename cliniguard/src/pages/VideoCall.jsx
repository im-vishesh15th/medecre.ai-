import React from 'react'
import { useParams } from 'react-router-dom'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import { useNavigate ,useLocation} from 'react-router-dom'


const VideoCall = () => {

    const {roomId}=useParams();
   const navigte=useNavigate();
   const location=useLocation();
   const name=location.state;

    const myMeeting= async(element)=>{
        const appID =1865124969 ;
        const serverSecret = "50866c55f5ae41e86f35284376c7f60e";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,roomId,Date.now().toString(),name);
        const zc=ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                  name: 'Share link',
                  url:
                    window.location
                     
                    
                },
              ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall
            },
             showScreenSharingButton:false,
             layout: "Sidebar" ,
             showPinButton: true,
             turnOnMicrophoneWhenJoining: false,
             turnOnCameraWhenJoining: false,
              
             //functions
             onJoinRoom: () => {console.log("Successfully Joined")}, // This will be triggered when you join the room. 
             onLeaveRoom: () => {console.log("Successfully Left")}, // This will be triggered when you left the room.
             onUserJoin: (users) => {console.log("Somebody Joined ,Current User's List=",users)}, // This will be triggered when in-room participants join the room.
             onUserLeave: (users) => {console.log("Somebody Left ,Current User's List=",users)}, // This will be triggered when in-room participants left the room.
             onReturnToHomeScreenClicked: () => {navigte('/PatientDeshboard')}
             
             //  onUserAvatarSetter?: (user: ZegoUser[]) => void; // Callback for the user avatar can be set.
            //  onLiveStart?: (user: ZegoUser) => void; //  Callback for livestream starts.
            //  onLiveEnd?: (user: ZegoUser) => void; // Callback for livestream ends.
            //  onYouRemovedFromRoom?: () => void; // Callback for you removed from the room.
            //  onInRoomMessageReceived?: (messageInfo: InRoomMessageInfo) => void; // Callback for in-room chat message received.
            //  onInRoomCustomCommandReceived?: (command: ZegoSignalingInRoomCommandMessage[]) => void;
            
        })

    };


  return (
    <div>
      <div style={
        {
          height:'100vh'
        }
      } ref={myMeeting}/>
    </div>
  )
}

export default VideoCall
