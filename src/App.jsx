import { useState, useCallback,useEffect,useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPasseord] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*[]{}?><";
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPasseord(pass);
  }, [length, numberAllowed, charAllowed, setPasseord]);

  const passwordcopy = useRef(null); 

  useEffect(() => {
    passwordGenerator();
  },[length, numberAllowed, charAllowed, passwordGenerator]);  

  return (
    <>
      <div className="min-w-md max-w-lg shadow-md rounded-lg px-4 py-4 mx-10 my-10 bg-gray-400">
        <h1 className="text-2xl font-bold text-center">
          Random Password Generator
        </h1>
        <div className="flex flex-row justify-between items-center">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full p-2 my-2 bg-gray-200 rounded-lg"
            placeholder="Your Password will appear here"
          />
          <button
            className="min-w-fit p-2 my-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            onClick={() => {navigator.clipboard.writeText(password)
            passwordcopy.current.style.display = "block";
            }}
          >
            Copy
          </button>
        </div>
        <div className="flex flex-row justify-between items-center">
          <label htmlFor="length">Length</label>
          <input
            type="range"
            id="length"
            min="1"
            max="30"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full p-2 my-2 bg-gray-200 rounded-lg text-red-500"
          />
          <span>{length}</span>
          <label htmlFor="numberAllowed">Include Numbers</label>
          <input
            type="checkbox"
            id="numberAllowed"
            checked={numberAllowed}
            onChange={(e) => setNumberAllowed(e.target.checked)}
            className="w-full p-2 my-2 bg-green-200 rounded-lg"
          />
          <label htmlFor="charAllowed">Include Special Characters</label>
          <input
            type="checkbox"
            id="charAllowed"
            checked={charAllowed}
            onChange={(e) => setCharAllowed(e.target.checked)}
            className="w-full p-2 my-2 bg-green-200 rounded-lg"
          />
        </div>

        <button
          className="w-full p-2 my-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
          onClick={passwordGenerator}
        >
          Generate Password
        </button>
      </div>
    </>
  );
}

export default App;
