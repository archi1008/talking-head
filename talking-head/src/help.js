import React, { useState, useEffect } from 'react';
import { TalkingHead } from './modules/talkinghead.mjs';

function TalkingHeadComponent() {
  const [head, setHead] = useState(null);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    async function initializeTalkingHead() {
      const nodeAvatar = document.getElementById('avatar');
      const newHead = new TalkingHead(nodeAvatar, {
        ttsEndpoint: "https://eu-texttospeech.googleapis.com/v1beta1/text:synthesize",
        ttsApikey: "AIzaSyD_5uf4K96TK-J3PLy349d1JOFmNicmbvs", // <- Change this
        cameraView: "upper"
      });
      setHead(newHead);

      // Load and show the avatar
      try {
        if (avatarFile) {
          const fileURL = URL.createObjectURL(avatarFile);
          console.log("fileURL",fileURL)
          await newHead.showAvatar({
            url: fileURL,
            body: 'F',
            avatarMood: 'neutral',
            ttsLang: "en-GB",
            ttsVoice: "en-GB-Standard-A",
            lipsyncLang: 'en'
          });
        } else {
          await newHead.showAvatar({
            url: 'https://models.readyplayer.me/65dc239d1699818a1b65b7f2.glb?morphTargets=ARKit,Oculus+Visemes,mouthOpen,mouthSmile,eyesClosed,eyesLookUp,eyesLookDown&textureSizeLimit=1024&textureFormat=png',
            body: 'F',
            avatarMood: 'neutral',
            ttsLang: "en-GB",
            ttsVoice: "en-GB-Standard-A",
            lipsyncLang: 'en'
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    initializeTalkingHead();
  }, [avatarFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
  };

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
        if (head) {
          head.speakText(reply);
        }
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div>
      <div id="avatar" style={{ height: "500px", width: "500px", right: "12px" }}></div>
      <div id="controls">
        {messages.map((message, index) => (
          <div key={index} style={{ position: "absolute", left: "90%", background: "white", color: "black", marginTop: "100px", padding: '8px', textAlign: message.type === 'user' ? 'right' : 'left' }}>
            {message.text}
          </div>
        ))}
        <input
        style={{marginTop:"200px"}}
          type="file"
          accept=".glb"
          onChange={handleFileChange}
        />
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
