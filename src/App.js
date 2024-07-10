import React, { useState } from 'react';
import Keyboard from './Keyboard';
import './App.css'; // Import the new CSS file

const App = () => {
  const [input, setInput] = useState('');
  const [isCipher, setIsCipher] = useState(true);
  const [isVigenere, setIsVigenere] = useState(true);

  const cipherSymbols = {
    A: '•', B: '//', C: 'V', D: '⊂', E: '—', F: 'ᒕ', G: '\\\\', H: 'Ո', I: ':', J: '⊓',
    K: '⅂', L: 'Ↄ', M: 'ꇓ', N: '⊥', O: 'L', P: '⨪', Q: '///', R: 'Ω', S: 'ᘰ', T: '⨀',
    U: '⏁', V: '⊘', W: '⊔', X: '⨲', Y: '∴', Z: '＋'
  };

  const handleInput = (char) => {
    setInput(prevInput => prevInput + char);
  };

  const handleBackspace = () => {
    setInput(prevInput => prevInput.slice(0, -1));
  };

  const vigenereEncrypt = (text, key) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let encryptedText = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i].toUpperCase();
      if (alphabet.includes(char)) {
        const charIndex = alphabet.indexOf(char);
        const keyChar = key[keyIndex % key.length].toUpperCase();
        const keyIndexOffset = alphabet.indexOf(keyChar);
        const encryptedChar = alphabet[(charIndex + keyIndexOffset) % 26];
        encryptedText += encryptedChar;
        keyIndex++;
      } else {
        encryptedText += char;
      }
    }

    return encryptedText;
  };

  const vigenereDecrypt = (text, key) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let decryptedText = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i].toUpperCase();
      if (alphabet.includes(char)) {
        const charIndex = alphabet.indexOf(char);
        const keyChar = key[keyIndex % key.length].toUpperCase();
        const keyIndexOffset = alphabet.indexOf(keyChar);
        const decryptedChar = alphabet[(charIndex - keyIndexOffset + 26) % 26];
        decryptedText += decryptedChar;
        keyIndex++;
      } else {
        decryptedText += char;
      }
    }

    return decryptedText;
  };

  const standardToCipher = (text) => {
    return text.split('').map(char => cipherSymbols[char.toUpperCase()] || char).join('');
  };

  const cipherToStandard = (text) => {
    const reversedCipherSymbols = Object.fromEntries(Object.entries(cipherSymbols).map(([k, v]) => [v, k]));
    let result = '';
    for (let i = 0; i < text.length; i++) {
      let found = false;
      for (const [symbol, letter] of Object.entries(reversedCipherSymbols)) {
        if (text.slice(i, i + symbol.length) === symbol) {
          result += letter;
          i += symbol.length - 1;
          found = true;
          break;
        }
      }
      if (!found) result += text[i];
    }
    return result;
  };

  const toggleCipher = () => {
    if (isCipher) {
      setInput(cipherToStandard(input));
    } else {
      setInput(standardToCipher(input));
    }
    setIsCipher(!isCipher);
  };

  const toggleVigenere = () => {
    if (isVigenere) {
      // If currently Vigenere is on, decrypt the text
      setInput(vigenereDecrypt(input, 'LONGLEGS'));
    } else {
      // If currently Vigenere is off, encrypt the text
      setInput(vigenereEncrypt(input, 'LONGLEGS'));
    }
    setIsVigenere(!isVigenere);
  };

  return (
    <div className="app-container">
      <h2>LONGLEGS DECODER</h2>
      <div className="textarea-container">
        <textarea value={input} readOnly />
      </div>
      <div className="buttons-container">
        <button onClick={toggleCipher}>
          Toggle Keyboard Type ({isCipher ? 'Cipher' : 'Regular'})
        </button>
        <button onClick={toggleVigenere}>
          Toggle Text Type ({isVigenere ? 'Standard' : 'Vigenere'})
        </button>
      </div>
      <Keyboard isCipher={isCipher} handleInput={handleInput} handleBackspace={handleBackspace} />
    </div>
  );
};

export default App;
