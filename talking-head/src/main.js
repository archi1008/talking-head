// import React, { useEffect, useRef, useState } from 'react';
// import { TalkingHead } from './modules/talkinghead.mjs';

// const Index = () => {
//   const avatarRef = useRef(null);
//   const textRef = useRef(null);
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState('');
//   const headRef = useRef(null);

//   const handleSendMessage = async () => {
//     // Add user's message to the UI
//     setMessages([...messages, { text: inputText, type: 'user' }]);
//     setInputText('');

//     try {
//       // Call OpenAI API to get a response
//       const apiKey = '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'; // Replace with your OpenAI API key
//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${apiKey}`,
//         },
//         body: JSON.stringify({
//           model: "gpt-3.5-turbo",
//           messages: [{ "role": "system", "content": inputText }]
//         }),
//       });

//       const data = await response.json();
//       console.log("response", data);

//       // Add user's message and bot's response to the UI
//       const reply = data.choices[0].message.content;
//       setMessages([...messages, { text: reply, type: 'bot' }]);

//       // Speak the bot's response using the TalkingHead instance
//       console.log("headRef.current",headRef.current)
//       if (headRef.current) {
//         headRef.current.speakText(reply);
//       }

//     } catch (error) {
//       console.error(error);
//       // Handle error gracefully
//     }
//   };

//   useEffect(() => {
//     const initTalkingHead = async () => {
//       const nodeAvatar = avatarRef.current;
//       const newHead = new TalkingHead(nodeAvatar, {
//         ttsEndpoint: "https://eu-texttospeech.googleapis.com/v1beta1/text:synthesize",
//         ttsApikey: "AIzaSyD_5uf4K96TK-J3PLy349d1JOFmNicmbvs",
//         cameraView: "upper"
//       });

//       headRef.current = newHead; // Set the ref to the newHead

//       try {
//         await newHead.showAvatar({
//           url: 'https://models.readyplayer.me/64bfa15f0e72c63d7c3934a6.glb?morphTargets=ARKit,Oculus+Visemes,mouthOpen,mouthSmile,eyesClosed,eyesLookUp,eyesLookDown&textureSizeLimit=1024&textureFormat=png',
//           body: 'F',
//           avatarMood: 'neutral',
//           ttsLang: "en-GB",
//           ttsVoice: "en-GB-Standard-A",
//           lipsyncLang: 'en'
//         });
//       } catch (error) {
//         console.log("in catch")
//         console.log(error);
//       }

//       const speakHandler = () => {
//         const text = textRef.current.value;
//         if (text) {
//           headRef.current.speakText(text); // Use headRef instead of head
//         }
//       };

//       const nodeSpeak = document.getElementById('speak');
//       nodeSpeak.addEventListener('click', speakHandler);

//       return () => {
//         nodeSpeak.removeEventListener('click', speakHandler);
//       };
//     };

//     initTalkingHead();
//   }, []);

//   return (
//     <div>
//       <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc', marginBottom: '10px' }}>
//         {messages.map((message, index) => (
//           <div key={index} style={{ padding: '8px', textAlign: message.type === 'user' ? 'right' : 'left' }}>
//             {message.text}
//           </div>
//         ))}
//       </div>
//       <div>
//         <input
//           type="text"
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           style={{ width: '80%' }}
//         />
//         <button id="speak" onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Index;


import React, { useState, useEffect } from 'react';
import { TalkingHead } from './modules/talkinghead.mjs';


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
        ttsApikey: "AIzaSyD_5uf4K96TK-J3PLy349d1JOFmNicmbvs", // <- Change this
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
      if (head) {
        head.speakText(reply);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div id="avatar" style={{height:"500px",width:"500px"}}></div>
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
