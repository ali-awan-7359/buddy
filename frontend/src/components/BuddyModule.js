import React, { useState } from "react";
import OptionButton from "./OptionButton";

const BuddyModule = () => {
  const [options, setOptions] = useState([
    "User Management",
    "HomeSurfer",
    "Feature Extractions and Digital Diagnoses",
    "Cognitive Skills Challenge",
    "Support Service",
    "Personalized Learning Pathways and Progress Tracking",
    "Community Engagement and Peer Support",
    "Buddy",
  ]);
  const [selectedOption, setSelectedOption] = useState(null);

  const buddyOptions = [
    "Enhanced Document Interaction and Text Extraction",
    "Speech to Text",
    "Customized Text-to-Speech Integration",
    "Reading Assistance",
    "Voice Commands",
    "Interactive Document Interaction",
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleBuddyClick = () => {
    setSelectedOption("Buddy");
  };

  return (
    <div className="buddy-module-container">
      <div className="buddy-module-menu">
        <h2>Dyslexia Detectives</h2>
        <ul>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() =>
                option === "Buddy"
                  ? handleBuddyClick()
                  : handleOptionClick(option)
              }
              style={{ cursor: "pointer" }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="buddy-module-options">
        {selectedOption === "Buddy" && (
          <div className="button-container">
            {buddyOptions.map((option, index) => (
              <OptionButton key={index} option={option} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuddyModule;
