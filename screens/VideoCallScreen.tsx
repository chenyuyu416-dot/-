
import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Video, VideoOff, ScreenShare, PhoneOff } from '../components/Icons';

interface VideoCallScreenProps {
  onEndCall: () => void;
}

const VideoCallScreen: React.FC<VideoCallScreenProps> = ({ onEndCall }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  useEffect(() => {
    let stream: MediaStream;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
        // Handle error: show a message to the user
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleMic = () => {
    if (videoRef.current && videoRef.current.srcObject instanceof MediaStream) {
        const stream = videoRef.current.srcObject;
        stream.getAudioTracks().forEach(track => track.enabled = !isMicOn);
        setIsMicOn(!isMicOn);
    }
  };

  const toggleCamera = () => {
    if (videoRef.current && videoRef.current.srcObject instanceof MediaStream) {
        const stream = videoRef.current.srcObject;
        stream.getVideoTracks().forEach(track => track.enabled = !isCameraOn);
        setIsCameraOn(!isCameraOn);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 text-white flex flex-col items-center justify-between">
      <div className="absolute inset-0">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" muted></video>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      
      <header className="relative z-10 w-full p-4 text-center">
        <h2 className="text-xl font-bold">线上自习室</h2>
        <p className="text-sm opacity-80">专注模式已开启</p>
      </header>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
         {!isCameraOn && (
            <div className="p-4 bg-black/50 rounded-lg">
                <p>摄像头已关闭</p>
            </div>
         )}
      </div>

      <footer className="relative z-10 w-full p-4 pb-8">
        <div className="flex justify-center items-center space-x-4">
          <button onClick={toggleMic} className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </button>
          <button onClick={toggleCamera} className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            {isCameraOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </button>
          <button className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            <ScreenShare className="w-6 h-6" />
          </button>
          <button onClick={onEndCall} className="p-4 bg-red-500 rounded-full">
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default VideoCallScreen;
