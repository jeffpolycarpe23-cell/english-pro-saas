import React, { useState, useEffect } from 'react';
import './index.css';

const EnglishLearningSaaS = () => {
  const [mode, setMode] = useState('structures');
  const [language, setLanguage] = useState('en');
  const [currentStructureIndex, setCurrentStructureIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // 25 STRUCTURES PRINCIPALES + 8 EXEMPLES CHACUNE
  const structures = [
    {
      title: "I need",
      occasion: "Exprimer un besoin / Expressing a need",
      examples: [
        "I need help",
        "I need rest",
        "I need time",
        "I need money",
        "I need a break",
        "I need more information",
        "I need your advice",
        "I need to go home"
      ]
    },
    {
      title: "Can you",
      occasion: "Demander une faveur / Making a request",
      examples: [
        "Can you help me",
        "Can you explain this",
        "Can you wait here",
        "Can you speak slower",
        "Can you repeat please",
        "Can you call me later",
        "Can you open the door",
        "Can you check this email"
      ]
    },
    {
      title: "I would like",
      occasion: "Exprimer un désir poliment / Polite desire",
      examples: [
        "I would like coffee",
        "I would like to know",
        "I would like your opinion",
        "I would like to book a table",
        "I would like to apply",
        "I would like more time",
        "I would like to suggest",
        "I would like to clarify"
      ]
    },
    {
      title: "What if",
      occasion: "Proposer une hypothèse / Making hypotheses",
      examples: [
        "What if we try again",
        "What if I was wrong",
        "What if you stay",
        "What if it rains",
        "What if we cancel",
        "What if I call you",
        "What if you come with me",
        "What if we wait tomorrow"
      ]
    },
    {
      title: "I think",
      occasion: "Donner une opinion / Sharing opinion",
      examples: [
        "I think it's good",
        "I think we should go",
        "I think you're right",
        "I think it's too late",
        "I think maybe later",
        "I think I understand",
        "I think that's important",
        "I think we agree"
      ]
    },
    {
      title: "Could you",
      occasion: "Demander poliment / Polite request",
      examples: [
        "Could you help me",
        "Could you come here",
        "Could you check this",
        "Could you send it",
        "Could you wait outside",
        "Could you be quiet",
        "Could you forgive me",
        "Could you try again"
      ]
    },
    {
      title: "Have you",
      occasion: "Poser une question / Asking questions",
      examples: [
        "Have you finished",
        "Have you seen this",
        "Have you heard about",
        "Have you ever been",
        "Have you got time",
        "Have you tried this",
        "Have you asked them",
        "Have you made decision"
      ]
    },
    {
      title: "I'm sorry",
      occasion: "S'excuser / Apologizing",
      examples: [
        "I'm sorry I'm late",
        "I'm sorry for that",
        "I'm sorry you feel bad",
        "I'm sorry about yesterday",
        "I'm sorry I forgot",
        "I'm sorry to interrupt",
        "I'm sorry we disagree",
        "I'm sorry for the confusion"
      ]
    },
    {
      title: "Thank you for",
      occasion: "Remercier quelqu'un / Expressing gratitude",
      examples: [
        "Thank you for helping",
        "Thank you for waiting",
        "Thank you for coming",
        "Thank you for everything",
        "Thank you for your time",
        "Thank you for listening",
        "Thank you for the advice",
        "Thank you for your patience"
      ]
    },
    {
      title: "Actually",
      occasion: "Corriger ou préciser / Clarifying",
      examples: [
        "Actually I disagree",
        "Actually that's wrong",
        "Actually I prefer",
        "Actually let me explain",
        "Actually I forgot",
        "Actually I meant",
        "Actually it's better",
        "Actually I changed my mind"
      ]
    },
    {
      title: "I realize",
      occasion: "Admettre une réalité / Acknowledging",
      examples: [
        "I realize now",
        "I realize I was wrong",
        "I realize it's hard",
        "I realize you're right",
        "I realize the problem",
        "I realize I forgot",
        "I realize it matters",
        "I realize it's late"
      ]
    },
    {
      title: "I suggest",
      occasion: "Proposer une idée / Making suggestions",
      examples: [
        "I suggest we meet",
        "I suggest you rest",
        "I suggest trying this",
        "I suggest tomorrow",
        "I suggest everyone agrees",
        "I suggest a change",
        "I suggest we start",
        "I suggest postponing"
      ]
    },
    {
      title: "In my opinion",
      occasion: "Donner mon point de vue / Personal viewpoint",
      examples: [
        "In my opinion it's great",
        "In my opinion you're right",
        "In my opinion we should wait",
        "In my opinion that's wrong",
        "In my opinion it matters",
        "In my opinion we agree",
        "In my opinion it's possible",
        "In my opinion they're wrong"
      ]
    },
    {
      title: "I understand",
      occasion: "Montrer la compréhension / Showing understanding",
      examples: [
        "I understand your point",
        "I understand it's difficult",
        "I understand now",
        "I understand you're busy",
        "I understand completely",
        "I understand the problem",
        "I understand what you mean",
        "I understand your concern"
      ]
    },
    {
      title: "Let me know",
      occasion: "Demander une réponse / Requesting feedback",
      examples: [
        "Let me know your thoughts",
        "Let me know if you agree",
        "Let me know tomorrow",
        "Let me know your decision",
        "Let me know what you think",
        "Let me know if you're coming",
        "Let me know if you need",
        "Let me know how you feel"
      ]
    },
    {
      title: "By the way",
      occasion: "Ajouter une information / Adding information",
      examples: [
        "By the way I forgot",
        "By the way did you know",
        "By the way where is",
        "By the way how are you",
        "By the way I wanted to say",
        "By the way thanks for",
        "By the way I noticed",
        "By the way what about"
      ]
    },
    {
      title: "Would you mind",
      occasion: "Demander poliment / Polite request",
      examples: [
        "Would you mind waiting",
        "Would you mind closing",
        "Would you mind helping",
        "Would you mind speaking",
        "Would you mind stopping",
        "Would you mind explaining",
        "Would you mind checking",
        "Would you mind coming back"
      ]
    },
    {
      title: "I'm afraid",
      occasion: "Exprimer une crainte / Expressing fear",
      examples: [
        "I'm afraid it's not possible",
        "I'm afraid you're wrong",
        "I'm afraid it's too late",
        "I'm afraid I disagree",
        "I'm afraid I can't",
        "I'm afraid they left",
        "I'm afraid it's broken",
        "I'm afraid I'm scared"
      ]
    },
    {
      title: "To be honest",
      occasion: "Dire la vérité franchement / Being honest",
      examples: [
        "To be honest I disagree",
        "To be honest I'm tired",
        "To be honest I don't know",
        "To be honest it's difficult",
        "To be honest I prefer",
        "To be honest I'm confused",
        "To be honest that's wrong",
        "To be honest I'm worried"
      ]
    },
    {
      title: "I promise",
      occasion: "Faire une promesse / Making a promise",
      examples: [
        "I promise I'll help",
        "I promise to come back",
        "I promise I won't forget",
        "I promise it's true",
        "I promise I'll call",
        "I promise to be on time",
        "I promise you everything",
        "I promise I'll try"
      ]
    },
    {
      title: "It seems like",
      occasion: "Donner une impression / Giving impression",
      examples: [
        "It seems like you're sad",
        "It seems like it's broken",
        "It seems like they left",
        "It seems like it's possible",
        "It seems like you agree",
        "It seems like it's important",
        "It seems like you're angry",
        "It seems like everything's fine"
      ]
    },
    {
      title: "As far as",
      occasion: "Donner une limite / Limiting scope",
      examples: [
        "As far as I know",
        "As far as I understand",
        "As far as I can tell",
        "As far as I'm concerned",
        "As far as that goes",
        "As far as I remember",
        "As far as I heard",
        "As far as it matters"
      ]
    },
    {
      title: "One more thing",
      occasion: "Ajouter un dernier point / Adding final point",
      examples: [
        "One more thing please",
        "One more thing before",
        "One more thing I forgot",
        "One more thing important",
        "One more thing maybe",
        "One more thing sorry",
        "One more thing remember",
        "One more thing don't forget"
      ]
    },
    {
      title: "That makes sense",
      occasion: "Montrer la compréhension / Showing agreement",
      examples: [
        "That makes sense now",
        "That makes sense to me",
        "That makes complete sense",
        "That makes no sense",
        "That makes me happy",
        "That makes me sad",
        "That makes me confused",
        "That makes everything clear"
      ]
    },
    {
      title: "Fair enough",
      occasion: "Accepter un argument / Accepting argument",
      examples: [
        "Fair enough I agree",
        "Fair enough let's go",
        "Fair enough that's true",
        "Fair enough I understand",
        "Fair enough I accept",
        "Fair enough you're right",
        "Fair enough it's fine",
        "Fair enough no problem"
      ]
    }
  ];

  // Initialiser la reconnaissance vocale
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = language === 'en' ? 'en-US' : 'fr-FR';
      
      rec.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        handleVoiceInput(transcript);
      };
      
      rec.onerror = (event) => {
        console.error('Erreur reconnaissance vocale:', event.error);
        setIsRecording(false);
      };
      
      rec.onend = () => {
        setIsRecording(false);
      };
      
      setRecognition(rec);
    }
  }, [language]);

  // Émettre du son
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-US' : 'fr-FR';
      utterance.rate = 0.8;
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }
  };

  // Gérer la saisie vocale
  const handleVoiceInput = (transcript) => {
    const currentStructure = structures[currentStructureIndex];
    const userMessage = {
      text: transcript,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulation chatbot avec correction
    setTimeout(() => {
      let botResponse = '';
      let isCorrect = false;

      // Vérifier si la phrase est proche d'un exemple
      const normalizedInput = transcript.toLowerCase().trim();
      const foundExample = currentStructure.examples.find(ex => 
        normalizedInput.includes(ex.toLowerCase()) || 
        ex.toLowerCase().includes(normalizedInput)
      );

      if (foundExample) {
        isCorrect = true;
        botResponse = `Excellent! ✅ That's correct: "${foundExample}"`;
      } else {
        botResponse = `Not quite. You said: "${transcript}". Try: "${currentStructure.examples[0]}"`;
      }

      const botMsg = {
        text: botResponse,
        sender: isCorrect ? 'bot' : 'correction',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      speakText(botResponse);
    }, 800);
  };

  // Envoyer un message texte
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    handleVoiceInput(inputValue);
    setInputValue('');
  };

  // Démarrer l'enregistrement
  const startRecording = () => {
    if (recognition) {
      setIsRecording(true);
      recognition.start();
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognition?.stop();
      setIsRecording(false);
    } else {
      startRecording();
    }
  };

  const currentStructure = structures[currentStructureIndex];

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>🎯 English Pro SaaS</h1>
        <p>Master English Structures & Conversations</p>
      </div>

      {/* Controls */}
      <div className="controls">
        <button 
          className={`switch-btn ${mode === 'structures' ? 'active' : ''}`}
          onClick={() => setMode('structures')}
        >
          📚 Structures
        </button>
        <button 
          className={`switch-btn ${mode === 'chat' ? 'active' : ''}`}
          onClick={() => setMode('chat')}
        >
          💬 Chat
        </button>
        <select 
          className="select-box"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">🔊 English</option>
          <option value="fr">🇫🇷 Français</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {mode === 'structures' ? (
          <>
            {/* Structure Card */}
            <div className="structure-card">
              <div className="structure-title">
                {currentStructure.title}
              </div>
              <div className="structure-occasion">
                {language === 'en' ? '📌 Use for: ' : '📌 Utilisation: '}{currentStructure.occasion}
              </div>
              <div className="examples">
                {currentStructure.examples.map((example, idx) => (
                  <div 
                    key={idx}
                    className="example-item"
                    onClick={() => speakText(example)}
                  >
                    <span className="example-text">{example}</span>
                    <button className="play-btn">🔊</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', gap: '10px', padding: '0 20px 20px' }}>
              <button 
                className="switch-btn"
                onClick={() => setCurrentStructureIndex(Math.max(0, currentStructureIndex - 1))}
                disabled={currentStructureIndex === 0}
                style={{ flex: 1 }}
              >
                ← {language === 'en' ? 'Previous' : 'Précédent'}
              </button>
              <span style={{ 
                padding: '8px 12px', 
                background: '#667eea', 
                color: 'white',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 'bold',
                alignSelf: 'center'
              }}>
                {currentStructureIndex + 1}/25
              </span>
              <button 
                className="switch-btn"
                onClick={() => setCurrentStructureIndex(Math.min(24, currentStructureIndex + 1))}
                disabled={currentStructureIndex === 24}
                style={{ flex: 1 }}
              >
                {language === 'en' ? 'Next' : 'Suivant'} →
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Chat Section */}
            <div className="chat-section">
              <div className="chat-title">
                {language === 'en' ? '💬 Practice Speaking' : '💬 Pratiquer'}
              </div>
              <div className="messages">
                {messages.length === 0 ? (
                  <div className="message bot">
                    {language === 'en' 
                      ? 'Say or type a sentence using the current structure!' 
                      : 'Dites ou tapez une phrase!'}
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.sender}`}>
                      {msg.text}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Input */}
            <div style={{ padding: '0 15px 15px' }}>
              <div className="input-group">
                <textarea 
                  className="text-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={language === 'en' ? 'Type...' : 'Tapez...'}
                  rows="2"
                />
                <button 
                  className="send-btn"
                  onClick={handleSendMessage}
                >
                  ✉️
                </button>
              </div>
              <div style={{ marginTop: '8px' }}>
                <button 
                  className={`mic-btn ${isRecording ? 'recording' : ''}`}
                  onClick={toggleRecording}
                  style={{ width: '100%' }}
                >
                  {isRecording ? '🛑 Recording...' : '🎤 Speak'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EnglishLearningSaaS;
