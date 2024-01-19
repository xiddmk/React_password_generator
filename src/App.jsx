import React, { useCallback, useEffect, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let generatedPassword = '';
    let characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) characterSet += '1234567890';
    if (charAllowed) characterSet += '~!@#$%^&*()_+}{><.,[]`';

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * characterSet.length);
      generatedPassword += characterSet.charAt(charIndex);
    }

    setPassword(generatedPassword);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(password);
      alert('Password copied to clipboard!');
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen bg-black">
        <div className="bg-white h-40 w-2/4 p-4">
          <h1 className="font-bold text-2xl">Password Generator</h1>
          <div className="flex items-center gap-4 mt-4">
            <input
              className="w-2/3 border border-black px-2 py-1"
              type="text"
              value={password}
              placeholder="Password"
              readOnly
            />
            <button className="border border-black px-8 py-1" onClick={handleCopyClick}>
              Copy
            </button>
          </div>
          <div className="flex justify-center gap-10 mt-4">
            <div>
              <label className="mr-2">Length: {length}</label>
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value, 10))}
                className="cursor-pointer"
              />
            </div>
            <div>
              <input
                type="checkbox"
                checked={numberAllowed}
                id="numberInput"
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label className="ml-2">Numbers</label>
            </div>
            <div>
              <input
                type="checkbox"
                checked={charAllowed}
                id="charInput"
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label className="ml-2">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
