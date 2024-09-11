import React, { useState } from "react";

const MicrophoneAccess: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestMicrophoneAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      setAudioStream(stream);
    } catch (err) {
      console.error(err);
      setHasPermission(false);
      setError("Microphone access denied or error occurred");
    }
  };

  return (
    <div>
      {hasPermission === null && (
        <button onClick={requestMicrophoneAccess}>Enable Microphone</button>
      )}
      {hasPermission && audioStream && (
        <p>Microphone is active. You can now process the audio stream.</p>
      )}
      {hasPermission === false && <p>{error}</p>}
    </div>
  );
};

export default MicrophoneAccess;
