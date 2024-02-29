import React, { useState, useEffect } from 'react';
import { TalkingHead } from "talkinghead";

function TalkingHeadComponent() {
  const [head, setHead] = useState(null);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function initializeTalkingHead() {
      // Instantiate the class
      // NOTE: Never put your API key in a client-side code unless you know
      //       that you are the only one to have access to that code!
      const nodeAvatar = document.getElementById('avatar');
      const newHead = new TalkingHead(nodeAvatar, {
        ttsEndpoint: "https://eu-texttospeech.googleapis.com/v1beta1/text:synthesize",
        ttsApikey: "put-your-own-Google-TTS-API-key-here", // <- Change this
        cameraView: "upper"
      });
      setHead(newHead);
      // Load and show the avatar
      try {
        await newHead.showAvatar({
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
    }
    initializeTalkingHead();
  }, []);

  const speakHandler = async () => {
    setMessages([...messages, { text: inputText, type: 'user' }]);
    setInputText('');
    let reply;
    try {
        // Call OpenAI API to get a response
        const apiKey = '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'; // Replace with your OpenAI API key
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "system", "content": inputText }]
          }),
        });
  
        const data = await response.json();
        console.log("response", data);
  
        reply = data.choices[0].message.content;
        setMessages([...messages, { text: reply, type: 'bot' }]);
  
      } catch (error) {
        console.error(error);
        // Handle error gracefully
      }

    try {
      if (text && head) {
        head.speakText(reply);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div id="avatar"></div>
      <div id="controls">
      {messages.map((message, index) => (
          <div key={index} style={{ padding: '8px', textAlign: message.type === 'user' ? 'right' : 'left' }}>
            {message.text}
          </div>
        ))}
        <input 
          id="text" 
          type="text" 
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)} 
        />
        <input 
          id="speak" 
          type="button" 
          value="Speak" 
          onClick={speakHandler} 
        />
      </div>
    </div>
  );
}

export default TalkingHeadComponent;