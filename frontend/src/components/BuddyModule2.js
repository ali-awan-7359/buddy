import React, { useState, useRef, useEffect } from "react";

const OptionButton = ({ option, onBack }) => {
  const [transcribedText, setTranscribedText] = useState(""); // Holds the transcribed text
  const [error, setError] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const speechToTextButtonRef = useRef(null);

  useEffect(() => {
    if (option === "Speech to Text" && speechToTextButtonRef.current) {
      setTimeout(() => {
        speechToTextButtonRef.current.click();
      }, 100);
    }
  }, [option]);

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = "en-US";
    recognitionInstance.interimResults = false;
    recognitionInstance.maxAlternatives = 1;
    recognitionInstance.continuous = true; // Ensures it continues listening until manually stopped

    recognitionInstance.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript;
      setTranscribedText((prevText) => prevText + " " + transcript);
      setError("");
    };

    recognitionInstance.onerror = (event) => {
      setError("Error in speech recognition: " + event.error);
    };

    recognitionInstance.onstart = () => {
      setIsRecognizing(true);
    };

    recognitionInstance.onend = () => {
      if (isRecognizing) {
        recognitionInstance.start(); // Keeps restarting until stop button is pressed
      }
    };

    setRecognition(recognitionInstance);
    recognitionInstance.start();
  };

  const handleButtonClick = () => {
    if (recognition) {
      recognition.stop(); // If already running, stop it first before starting again
    }
    startSpeechRecognition();
  };

  const handleStopRecognition = () => {
    if (recognition) {
      recognition.onend = null; // Remove the onend handler to prevent restart
      recognition.stop();
      setIsRecognizing(false);
      setRecognition(null);
    }
  };

  return (
    <div>
      {transcribedText ? (
        <div className="transcribed-text">
          <h4>Transcribed Text:</h4>
          <p>{transcribedText}</p> {/* Display the transcribed text */}
          <button className="stop-button" onClick={handleStopRecognition}>
            Stop Speech Recognition
          </button>
        </div>
      ) : (
        <div>
          <button
            ref={speechToTextButtonRef}
            className="option-button"
            onClick={handleButtonClick}
            disabled={isRecognizing}
          >
            {isRecognizing ? "Listening..." : option}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default OptionButton;
