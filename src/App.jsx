import { useCallback } from "react";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charsAllowed, setCharsAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passowordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let chars = "~!@#$%^&*()-+";
    let numbers = "0123456789";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * string.length + 1);

      pass = string.charAt(charIndex);
    }
  }, [length, numberAllowed, charsAllowed, setPassword]);

  return (
    <>
      <div className="top-0 right-0 bottom-0 left-0 w-full max-w-md mx-auto absolute bg-red-300 my-10 font-mono">
        <h1 className="font-semibold text-3xl mb-4 text-center font-mono">
          Password Generator
        </h1>
        {/* main content container > */}
        <div className="flex justify-center shadow-md rounded-xl overflow-hidden mb-4 bg-red-500 flex-wrap py-4 px-1">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="passoword"
              value={password}
              readOnly
              className="outline-none w-[80%] mr-2 py-1 px-3 h-14 rounded-xl"
            />

            {/* button for copying the password */}
            <button className="outline-none shrink-0 rounded-xl font-bold text-white bg-blue-600 cursor-pointer">
              Copy
            </button>
          </div>

          <div className="flex flex-col justify-center items-center bg-orange-400 mt-5 px-4 py-4">
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
                className="mt-5 ml-5 bg-black outline-none"
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
                className="mt-5 ml-5 bg-black outline-none"
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
