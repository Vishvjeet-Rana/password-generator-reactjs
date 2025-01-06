import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
// import "./TextAnimation.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charsAllowed, setCharsAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordReference = useRef();

  const passowordGenerator = useCallback(() => {
    let pass = [];
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let chars = "~!@#$%^&*()-+";
    let numbers = "0123456789";

    if (charsAllowed) {
      pass.push(chars.charAt(Math.floor(Math.random() * chars.length + 1)));
      string += chars;
    }
    if (numberAllowed) {
      pass.push(numbers.charAt(Math.floor(Math.random() * numbers.length + 1)));
      string += numbers;
    }

    while (pass.length < length) {
      let charIndex = Math.floor(Math.random() * string.length + 1);
      pass.push(string.charAt(charIndex));
    }

    // shuffle the "pass" array for more secure password
    for (let i = pass.length; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [pass[i], pass[j]] = [pass[j], pass[i]]; // swapping actually
    }

    setPassword(pass.join(""));
  }, [length, numberAllowed, charsAllowed, setPassword]);

  const copyPasswordInClipBoard = useCallback(() => {
    // when copy then input shows selection effect
    passwordReference.current?.select();

    // for selecting a specific range
    // passwordReference.current?.setSelectionRange(0, 3);

    // for copying onto the clipboard
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passowordGenerator();
  }, [length, numberAllowed, charsAllowed, passowordGenerator]);

  return (
    <>
      <div className="top-0 right-0 bottom-0 left-0 w-full max-w-md mx-auto absolute my-10 font-mono">
        <h1 className="font-semibold text-4xl mb-4 text-center font-mono text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-black bg-[length:400%_100%] animate-gradient-shine">
          Password Generator
        </h1>
        {/* main content container > */}
        <div className="flex justify-center shadow-md rounded-xl overflow-hidden mb-4 shadow-white bg-gray-700 flex-wrap py-4 px-1">
          <div className="flex w-full">
            {/* input where you will get the password */}
            <input
              // type="text"
              placeholder="passoword"
              value={password}
              ref={passwordReference}
              readOnly
              className="outline-none w-[80%] mr-2 py-1 px-3 h-14 rounded-xl"
            />

            {/* button for copying the password */}
            <button
              className="outline-none shrink-0 rounded-xl  text-white bg-blue-600 hover:bg-blue-900 hover:font-extrabold cursor-pointer focus:outline-none transform transition-transform duration-200 hover:scale-110"
              onClick={copyPasswordInClipBoard}
            >
              Copy
            </button>
          </div>

          <div className="flex flex-col justify-center items-center  mt-5 px-4 py-4 text-lg">
            {/* input for setting range of passoword length */}
            <div className="my-2 mx-3 flex justify-center items-center">
              <input
                type="range"
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                min={8}
                max={50}
                id="lengthRange"
                className="mt-5"
              />
              <label htmlFor="lengthRange" onChange={length} className="mt-5">
                &nbsp; Length : {length}
              </label>
            </div>

            <div className="my-2 mx-3 flex justify-center items-center">
              {/* input for allowing NUMBERS in password */}
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
                id="numberInput"
                className="mt-5 ml-5 h-5 w-5 bg-black outline-none"
              />
              <label htmlFor="numberInput" className="mt-5">
                &nbsp;: Numbers
              </label>
            </div>

            <div className="my-2 mx-3 flex justify-center items-center">
              {/* input for allowing CHARACTERS in passoword */}
              <input
                type="checkbox"
                defaultChecked={charsAllowed}
                onChange={() => {
                  setCharsAllowed((prev) => !prev);
                }}
                id="charInput"
                className="mt-5 ml-5 h-5 w-5 bg-black outline-none"
              />
              <label htmlFor="charInput" className="mt-5">
                &nbsp;: Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
