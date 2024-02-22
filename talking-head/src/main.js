import React, { useEffect, useRef } from 'react';
import { TalkingHead } from './modules/talkinghead.mjs';

const Index = () => {
  const avatarRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const initTalkingHead = async () => {
      const nodeAvatar = avatarRef.current;
      const head = new TalkingHead(nodeAvatar, {
        ttsEndpoint: "https://eu-texttospeech.googleapis.com/v1beta1/text:synthesize",
        ttsApikey: "AIzaSyD_5uf4K96TK-J3PLy349d1JOFmNicmbvs", 
        cameraView: "upper"
      });

      try {
        await head.showAvatar({
          url: 'https://models.readyplayer.me/64bfa15f0e72c63d7c3934a6.glb?morphTargets=ARKit,Oculus+Visemes,mouthOpen,mouthSmile,eyesClosed,eyesLookUp,eyesLookDown&textureSizeLimit=1024&textureFormat=png',
          body: 'F',
          avatarMood: 'neutral',
          ttsLang: "en-GB",
          ttsVoice: "en-GB-Standard-A",
          lipsyncLang: 'en'
        });
      } catch (error) {
        console.log(error);
      }

      const speakHandler = () => {
        const text = textRef.current.value;
        if (text) {
          head.speakText(text);
        }
      };

      const nodeSpeak = document.getElementById('speak');
      nodeSpeak.addEventListener('click', speakHandler);

      return () => {
        nodeSpeak.removeEventListener('click', speakHandler);
      };
    };

    initTalkingHead();
  }, []);

  return (
    <div>
      <div id="avatar" ref={avatarRef}></div>
      <div id="controls">
        <input id="text" type="text" defaultValue="Hi there. How are you? I'm fine." ref={textRef} />
        <input id="speak" type="button" value="Speak" />
      </div>
    </div>
  );
};

export default Index;
