import React from 'react';
import './Keyboard.css';

const Keyboard = ({ isCipher, handleInput, handleBackspace }) => {
  const qwertyLayout = [
    'QWERTYUIOP',
    'ASDFGHJKL',
    'ZXCVBNM'
  ];

  const cipherSymbols = {
    A: '•', B: '//', C: 'V', D: '⊂', E: '—', F: 'ᒕ', G: '\\\\', H: 'Ո', I: ':', J: '⊓',
    K: '⅂', L: 'Ↄ', M: 'ꇓ', N: '⊥', O: 'L', P: '⨪', Q: '///', R: 'Ω', S: 'ᘰ', T: '⨀',
    U: '⏁', V: '⊘', W: '⊔', X: '⨲', Y: '∴', Z: '＋'
  };

  const handleClick = (char) => {
    if (isCipher) {
      // Find the alphabet character for the clicked cipher symbol
      const alphabetChar = Object.keys(cipherSymbols).find(key => cipherSymbols[key] === char);
      if (alphabetChar) {
        handleInput(alphabetChar);
      }
    } else {
      handleInput(char);
    }
  };

  return (
    <div className="keyboard">
      {qwertyLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.split('').map(char => (
            <button key={char} className="key" onClick={() => handleClick(isCipher ? cipherSymbols[char] : char)}>
              {isCipher ? cipherSymbols[char] : char}
            </button>
          ))}
          {rowIndex === 2 && <button className="key backspace" onClick={handleBackspace}>Back</button>}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
