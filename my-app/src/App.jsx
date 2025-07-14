import { useState } from "react";

const buttons = [
  ["7", "8", "9", "/", "sin"],
  ["4", "5", "6", "*", "cos"],
  ["1", "2", "3", "-", "tan"],
  ["0", ".", "(", ")", "+"],
  ["log", "ln", "sqrt", "^", "C"],
  ["=",],
];

function evaluate(expr) {
  try {
    let replaced = expr
      .replace(/sin\(/g, "Math.sin(")
      .replace(/cos\(/g, "Math.cos(")
      .replace(/tan\(/g, "Math.tan(")
      .replace(/log\(/g, "Math.log10(")
      .replace(/ln\(/g, "Math.log(")
      .replace(/sqrt\(/g, "Math.sqrt(")
      .replace(/(\d+)\^/g, "$1**");
    // eslint-disable-next-line no-eval
    return eval(replaced);
  } catch {
    return "Error";
  }
}

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (val) => {
    if (val === "C") {
      setInput("");
      setResult("");
    } else if (val === "=") {
      const res = evaluate(input);
      setResult(res);
    } else if (["sin", "cos", "tan", "log", "ln", "sqrt"].includes(val)) {
      setInput(input + val + "(");
    } else if (val === "^") {
      setInput(input + "^");
    } else {
      setInput(input + val);
    }
  };

  // Only handle Enter and Backspace for keyboard
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setResult(evaluate(input));
    } else if (e.key === "Backspace") {
      setInput(input.slice(0, -1));
    }
    // Let all other keys be handled by the input itself
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-400 to-pink-300">
      <div className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-2xl rounded-3xl p-8 w-full max-w-xs flex flex-col items-center transition-all duration-300">
        <h2 className="mb-4 text-2xl font-bold text-white drop-shadow-lg tracking-wide">Scientific Calculator</h2>
        <div className="mb-4 w-full">
          <input
            type="text"
            className="w-full text-right text-2xl p-3 border-b border-gray-300 focus:outline-none bg-white/70 rounded-t text-black placeholder-gray-400 shadow-inner"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="0"
            autoFocus
          />
          <div className="text-right text-lg text-indigo-700 min-h-[1.5em] font-semibold mt-1 drop-shadow-sm">{result}</div>
        </div>
        <div className="grid grid-cols-5 gap-2 w-full">
          {buttons.flat().map((btn, i) => (
            <button
              key={i}
              className={`py-2 rounded-lg text-lg font-semibold shadow-md transition-all duration-150 focus:outline-none
                ${btn === "=" ? "col-span-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 active:scale-95" :
                  btn === "C" ? "bg-gradient-to-r from-red-400 to-pink-400 text-white hover:from-red-500 hover:to-pink-500 active:scale-95" :
                  ["+", "-", "*", "/", "^"].includes(btn) ? "bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 active:scale-95" :
                  ["sin", "cos", "tan", "log", "ln", "sqrt"].includes(btn) ? "bg-gradient-to-r from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 active:scale-95" :
                  "bg-white/80 hover:bg-white/90 active:scale-95"
                }
              `}
              onClick={() => handleClick(btn)}
              style={btn === "=" ? { gridColumn: "span 5" } : {}}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

 
