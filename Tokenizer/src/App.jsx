import React, { useState } from "react";


const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "abcdefghijklmnopqrstuvwxyz" +
  "0123456789" +
  " .,!?;:'\"@#$%^&*()-_=+[]{}|<>/~`\\\n\t";

const charToId = {};
const idToChar = {};

chars.split("").forEach((char, index) => {
  charToId[char] = index + 27;
  idToChar[index + 27] = char;
});

function encode(text) {
  return text.split("").map((char) => charToId[char] || 0);
}

function decode(tokens) {
  return tokens.map((token) => idToChar[token] || "?").join("");
}

export default function Tokenizer() {
  const [input, setInput] = useState("");
  const [tokens, setTokens] = useState([]);
  const [decoded, setDecoded] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [decodedFromTokens, setDecodedFromTokens] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    const tok = encode(value);
    setTokens(tok);
    setDecoded(decode(tok));
  };

  const handleTokenInputChange = (e) => {
    setTokenInput(e.target.value);
  };

  const handleDecodeTokens = () => {
    let arr = tokenInput
      .replace(/[, ]+/g, " ")
      .trim()
      .split(" ")
      .map((v) => parseInt(v, 10) || 0);
    setDecodedFromTokens(decode(arr));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Custom Tokenizer</h1>
        
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-semibold" htmlFor="inputText">Input Text</label>
          <input
            id="inputText"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your sentence"
            autoFocus
          />
        </div>

        
        <div className="mb-4">
          <span className="block text-gray-600 mb-1 font-medium">Numeric Tokens:</span>
          <div className="p-3 bg-blue-50 rounded text-blue-800 break-words text-md">
            {tokens.join(", ")}
          </div>
        </div>

        
        <div className="mb-6">
          <span className="block text-gray-600 mb-1 font-medium">
            Decoded Text (from tokens):
          </span>
          <div className="p-3 bg-gray-100 rounded text-gray-700 text-lg font-mono">{decoded}</div>
        </div>

        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Decode Your Own Tokens</h2>
          <div className="flex gap-4">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              value={tokenInput}
              onChange={handleTokenInputChange}
              placeholder="e.g. 8 31 38 38 41 1 49 41"
              aria-label="Paste Token Sequence"
            />
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition duration-150"
              onClick={handleDecodeTokens}
            >
              Decode
            </button>
          </div>
          <div className="mt-4">
            <span className="block text-gray-600 mb-1 font-medium">Result:</span>
            <div className="p-3 bg-green-50 rounded text-green-700 text-lg font-mono">{decodedFromTokens}</div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
