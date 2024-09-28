import React, { useState } from "react";
import OptionButton from "./components/OptionButton";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileUpload,
  faMicrophone,
  faVolumeUp,
  faMicrophoneAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleBackToOptions = () => {
    setSelectedOption(null);
  };

  return (
    <div className="app">
      {selectedOption ? (
        <OptionButton
          option={selectedOption}
          onBack={handleBackToOptions}
          handleOptionClick={handleOptionClick}
        />
      ) : (
        <div className="buddy-module-menu">
          <h2>Buddy Module</h2>
          <ul>
            <li
              onClick={() =>
                handleOptionClick(
                  "Enhanced Document Interaction and Text Extraction"
                )
              }
            >
              <FontAwesomeIcon icon={faFileUpload} />
              Extract Text from Document
            </li>
            <li onClick={() => handleOptionClick("Speech to Text")}>
              <FontAwesomeIcon icon={faMicrophone} />
              Speech to Text
            </li>
            <li onClick={() => handleOptionClick("Text to Speech")}>
              <FontAwesomeIcon icon={faVolumeUp} />
              Text to Speech
            </li>
            <li onClick={() => handleOptionClick("Voice Commands")}>
              <FontAwesomeIcon icon={faMicrophoneAlt} />
              Voice Commands
            </li>
            <li
              onClick={() =>
                handleOptionClick("Interactive Document Interaction")
              }
            >
              <FontAwesomeIcon icon={faEdit} />
              Interactive Document Interaction
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
