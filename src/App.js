import React, { useState } from "react";
import "./styles.css";
import { FaCopy } from "react-icons/fa";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(10);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("Poor");

  const generatePassword = () => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_-+=<>?";

    let allChars = lowercaseChars;
    if (includeUppercase) allChars += uppercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    let generatedPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }

    setPassword(generatedPassword);
    calculatePasswordStrength(generatedPassword);
  };

  const calculatePasswordStrength = (password) => {
    let strengthColor = "";
    let strengthText = "";

    if (password.length >= 6 && password.length <= 10) {
      strengthColor = "red";
      strengthText = "Okay";
    } else if (password.length > 10 && password.length <= 15) {
      strengthColor = "yellow";
      strengthText = "Normal";
    } else if (password.length > 15 && password.length <= 20) {
      strengthColor = "green";
      strengthText = "Strong";
    } else if (password.length > 20 && password.length <= 25) {
      strengthColor = "darkgreen";
      strengthText = "Super Strong";
    }

    setPasswordStrengthColor(strengthColor);
    setPasswordStrengthText(strengthText);
  };

  const [passwordStrengthColor, setPasswordStrengthColor] = useState("");
  const [passwordStrengthText, setPasswordStrengthText] = useState("");

  const copyToClipboard = () => {
    const textField = document.createElement("textarea");
    textField.innerText = password;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const getPasswordStrengthColor = () => {
    if (passwordLength >= 6 && passwordLength <= 10) {
      return "red";
    } else if (passwordLength > 10 && passwordLength <= 15) {
      return "yellow";
    } else if (passwordLength > 15 && passwordLength <= 20) {
      return "green";
    } else if (passwordLength > 20 && passwordLength <= 25) {
      return "darkgreen";
    } else {
      return "black";
    }
  };

  return (
    <div className="App">
      <div className="card">
        <div className="password-display">
          <p className="generated-password">{password}</p>
          <button className="copy-icon" onClick={copyToClipboard}>
            <FaCopy />
          </button>
        </div>
        <div className="password-options">
          <label>
            Password Length: <span className="num">{passwordLength}</span>
          </label>
          <input
            type="range"
            min="6"
            max="25"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />

          <div className="checkboxes">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
              />
              <span className="checkmark"></span>
              Include Uppercase Letters
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
              />
              <span className="checkmark"></span>
              Include Lowercase Letters
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
              />
              <span className="checkmark"></span>
              Include Numbers
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
              />
              <span className="checkmark"></span>
              Include Symbols
            </label>
          </div>
        </div>

        <p>
          Password Strength:{" "}
          <span style={{ color: passwordStrengthColor }}>
            {passwordStrengthText}
          </span>
        </p>

        <button className="generate-button" onClick={generatePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
