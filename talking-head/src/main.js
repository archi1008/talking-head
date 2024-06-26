import React, { useState, useEffect } from 'react';
import { TalkingHead } from './modules/talkinghead.mjs';
import style from './main.module.css';
import { Grid, Stack } from '@mui/material';

// ttsLang: "en-GB",
// ttsVoice: "en-GB-Standard-A",

// ttsLang: "hi-IN",
// ttsVoice: "hi-IN-Wavenet-D",


function TalkingHeadComponent() {
  const url1 = 'https://models.readyplayer.me/65dc239d1699818a1b65b7f2.glb?morphTargets=ARKit,Oculus+Visemes,mouthOpen,mouthSmile,eyesClosed,eyesLookUp,eyesLookDown&textureSizeLimit=1024&textureFormat=png';
  const url2 = 'https://models.readyplayer.me/65e9576003a681e6e0dfca1f.glb?morphTargets=ARKit,Oculus+Visemes,mouthOpen,mouthSmile,eyesClosed,eyesLookUp,eyesLookDown&textureSizeLimit=1024&textureFormat=png';
  const url3 = 'https://models.readyplayer.me/64bfa15f0e72c63d7c3934a6.glb?morphTargets=ARKit,Oculus+Visemes,mouthOpen,mouthSmile,eyesClosed,eyesLookUp,eyesLookDown&textureSizeLimit=1024&textureFormat=png';
  const [head, setHead] = useState(null);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [avatar, setAvatar] = useState(3);
  const [selectedLang, setSelectedLang] = useState('english');
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const nodeAvatar = document.getElementById('avatar');
    const newHead = new TalkingHead(nodeAvatar, {
      ttsEndpoint: "https://eu-texttospeech.googleapis.com/v1beta1/text:synthesize",
      ttsApikey: "AIzaSyD_5uf4K96TK-J3PLy349d1JOFmNicmbvs", // <- Change this
      cameraView: "upper"
    });
    setHead(newHead);
  }, [])

  useEffect(() => {
    console.log("messages", messages);
  }, [messages])

  useEffect(() => {
    async function initializeTalkingHead() {
      if (!head) return;
      try {
        setLoadingAvatar(true); // Set loading indicator to true
        if (avatarFile) {
          const fileURL = URL.createObjectURL(avatarFile);
          const compUrl = `${fileURL}?morphTargets=ARKit,Oculus+Visemes,mouthOpen,mouthSmile,eyesClosed,eyesLookUp,eyesLookDown&textureSizeLimit=1024&textureFormat=png`
          console.log("fileURL", compUrl);
          await head.showAvatar({
            url: fileURL,
            body: 'F',
            avatarMood: 'neutral',
            ttsLang: "hi-IN",
            ttsVoice: "hi-IN-Wavenet-D",
            lipsyncLang: 'en'
          });
        }
        else {
          let myUrl;
          if (avatar === 1) myUrl = url1;
          else if (avatar === 2) myUrl = url2;
          else myUrl = url3;
          await head.showAvatar({
            url: myUrl,
            body: avatar === 2 ? 'M' : 'F',
            avatarMood: 'neutral',
            ttsLang: "hi-IN",
            ttsVoice: "hi-IN-Wavenet-D",
            lipsyncLang: 'en'
          });
        }
        setAvatarLoaded(true); // Set avatar loaded indicator to true
      } catch (error) {
        console.log("error occurred", error);
      } finally {
        setLoadingAvatar(false); // Set loading indicator to false regardless of success or failure
      }
    }
    initializeTalkingHead();
  }, [head, avatarFile, avatar]);

  const handleAvatar1Click = () => {
    console.log("Avatar 1 clicked");
    setAvatar(1);
  };

  const handleAvatar2Click = () => {
    console.log("Avatar 2 clicked");
    setAvatar(2);
  };

  const handleAvatar3Click = () => {
    console.log("Avatar 3 clicked");
    setAvatar(3);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    setAvatarLoaded(false); // Reset avatarLoaded state when a new file is selected
  };

  const speakHandler = async () => {
    if (speaking) {
      return;
    }
    setSpeaking(true);

    setInputText('');
    if (head && avatarLoaded) {
      const newUserMessage = { text: inputText, type: 'user' };
      setMessages(prevMessages => [...prevMessages, newUserMessage]);
      setInputText('');
      let reply;
      let reply1;
      let reply2;
      let apiKeyOpenAI = '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';
      if (selectedLang === 'hindi') {
        try {
          // Call OpenAI API to get a response
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKeyOpenAI}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [{ "role": "system", "content": ` convert this text : ${inputText} into hinglish` }]
            }),
          });

          const data = await response.json();
          console.log("reply1", data.choices[0].message.content);

          reply1 = data.choices[0].message.content;
        } catch (error) {
          console.log("error during reply1");
          console.error(error);
        }
        try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKeyOpenAI}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [{ "role": "system", "content": reply1 }]
            }),
          });

          const data = await response.json();
          console.log("reply2", data.choices[0].message.content);

          reply2 = data.choices[0].message.content;
        } catch (error) {
          console.log("error during reply2");
          console.error(error);
          // Handle error gracefully
        }
        try {
          // Call OpenAI API to get a response
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKeyOpenAI}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [{ "role": "system", "content": ` convert this text : ${reply2} into hindi` }]
            }),
          });

          const data = await response.json();
          console.log("reply3", data.choices[0].message.content);

          reply = data.choices[0].message.content;
          const newBotMessage = { text: reply, type: 'bot' };
          setMessages(prevMessages => [...prevMessages, newBotMessage]);
        } catch (error) {
          console.log("error during reply3");
          console.error(error);
        }
      }
      else {
        try {
          // Call OpenAI API to get a response
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKeyOpenAI}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [{ "role": "system", "content": `${inputText}` }]
            }),
          });

          const data = await response.json();
          console.log("response", data);

          reply = data.choices[0].message.content;
          const newBotMessage = { text: reply, type: 'bot' };
          setMessages(prevMessages => [...prevMessages, newBotMessage]);

        } catch (error) {
          console.error(error);
          // Handle error gracefully
        }
      }

      try {
        console.log("final reply", reply);
        selectedLang === 'hindi' ? head.speakText(reply2) : head.speakText(reply);
        setSpeaking(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Avatar is still loading...");
    }
  };

  return (
    <div className='container-fluid'>
      <Grid container spacing={0} >
        <Grid item xs={3} md={4} lg={4} >
          <div className={style.avatarContainer}>
            <div id="avatar" style={{ height: "350px", width: "500px", right: "12px" }}>
              {loadingAvatar && <div>Loading Avatar...</div>}
            </div>
            <div className={style.avatarButtonContainer}>
              <button className={avatar === 1 ? style.avatarButtonSel : style.avatarButton} onClick={handleAvatar1Click}>Avatar1</button>
              <button className={avatar === 2 ? style.avatarButtonSel : style.avatarButton} onClick={handleAvatar2Click}>Avatar2</button>
              <button className={avatar === 3 ? style.avatarButtonSel : style.avatarButton} onClick={handleAvatar3Click}>Avatar3</button>
            </div>
            <div className={style.avatarButtonContainer}>
              <button className={selectedLang == 'hindi' ? style.avatarButtonSel : style.avatarButton} onClick={() => { setSelectedLang("hindi") }}>Hindi</button>
              <button className={selectedLang == 'english' ? style.avatarButtonSel : style.avatarButton} onClick={() => { setSelectedLang("english") }}>English</button>
            </div>
            <div className={style.inputContainer}>
              <input
                style={{ marginTop: "10px" }}
                type="file"
                accept=".glb"
                onChange={handleFileChange}
              />
            </div>

          </div>

        </Grid>
        <Grid item xs={3} md={8} lg={8}>
          <div className={style.chatBox}>
            <div id="controls" className={style.controls}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${style.chatMessage} ${message.type === 'user' ? style.userMessage : style.botMessage}`}
                >
                  {message.text}
                </div>
              ))}
              <input
                id="text"
                className={style.inputText}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <input
                id="speak"
                className={style.speakButton}
                type="button"
                value="Speak"
                onClick={speakHandler}
                style={{ height: '111%', backgroundColor: '#0d6efd', cursor: speaking ? 'none' : 'pointer', color: 'white', opacity: speaking ? 0.5 : 1 }}
              />
            </div>
          </div>
        </Grid>

      </Grid>
    </div>


  );
}

export default TalkingHeadComponent;
