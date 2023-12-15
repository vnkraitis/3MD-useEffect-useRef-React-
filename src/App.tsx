import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import TextInput from "./components/textInput/TextInput";

const App = () => {
  const firstInputRef = useRef<HTMLInputElement>(null); // This ref is for the first input field
  const secondInputRef = useRef(null); //Ref for the second input field
  const [inputValue, setInputValue] = useState(""); // State hook for storing and setting the value currently entered in the input field.
  const [Word, setArray] = useState<string[]>([]); // State hook for storing and updating the array of words that have been submitted.
  const [ButtonDisabled, setButtonDisabled] = useState(true); // State hook for determining if the button should be disabled or not, initially set to true (disabled).
  const [count, setCount] = useState(0); // to crete first butto witch count
  const [color, setColor] = useState("green"); // Default color
  const [squares, setSquares] = useState([]);
  const [count2, setCount2] = useState(0);
  const [newInputValue, setNewInputValue] = useState("");
  const [count3, setCount3] = useState(100); // State for count2 initialized to 100
  const [fontSize3, setFontSize3] = useState(16); // State for font size initialized to 16
  const [uniqueInputValue, setUniqueInputValue] = useState("");
  const squareRef = useRef(null);
  const [clonedSquares, setClonedSquares] = useState([{}]); // Starts with one square
  const [isSquareInCorner, setIsSquareInCorner] = useState(false);

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Function to handle button click
  const Firstbutton = () => {
    if (inputValue.trim()) {
      setArray([inputValue]); // Set the new word directly, replacing the existing one
      setInputValue(""); // Clear the input field after setting the word
      secondInputRef.current?.focus(); // Refocus on the second input field
    }
  };

  useEffect(() => {
    // Auto-focus the first input field when the component mounts
    firstInputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Set a timeout to enable the button after 5 seconds
    const timer = setTimeout(() => {
      setButtonDisabled(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const buttonCount = () => {
    setCount(count + 1);
  };

  const addSquare = () => {
    setSquares([...squares, color]);
  };

  // useEffect for the first render
  useEffect(() => {
    console.log("FIRST RENDER");
  }, []);

  // useEffect that logs on every render
  useEffect(() => {
    console.log("RENDER");
  });

  // useEffect that tracks changes to count2
  useEffect(() => {
    console.log("CHANGING COUNT", count2);
  }, [count2]);

  // Function to increment count2 and update the console log
  const incrementCount2 = () => {
    setCount2((prevCount2) => prevCount2 + 1);
  };

  // Function to handle new input changes
  const handleNewInputChange = (event) => {
    setNewInputValue(event.target.value);
    console.log("Input change");
  };

  // Function to increment count2 and increase font size
  const incrementCount3 = () => {
    setCount3((prevCount) => prevCount + 1);
    setFontSize3((prevFontSize) => prevFontSize + 1);
  };

  // Use useEffect to update the document title with the new input value
  useEffect(() => {
    document.title = newInputValue;
  }, [newInputValue]);

  // Function to handle changes to the unique input field
  const handleUniqueInputChange = (event) => {
    setUniqueInputValue(event.target.value);
  };

  // Use a separate useEffect to update the document title with the unique input value
  useEffect(() => {
    document.title = uniqueInputValue;
  }, [uniqueInputValue]);

  const changeSquareColor = () => {
    if (squareRef.current) {
      squareRef.current.style.backgroundColor = "gold";
    }
  };

  const cloneSquare = () => {
    setClonedSquares((prevSquares) => [...prevSquares, {}]); // Clones a new square
  };

  const sendSquareToCorner = () => {
    setIsSquareInCorner(true);
  };

  return (
    <div className="main-container">
      <div>
        <TextInput ref={firstInputRef} />
      </div>
      <div>
        <TextInput
          ref={secondInputRef}
          value={inputValue}
          onChange={handleInputChange}
        />
        <p>{Word}</p>
        <button onClick={Firstbutton}>Click me</button>
      </div>
      <div>
        <button disabled={ButtonDisabled}>5 sec </button>
      </div>
      <div>
        <button onClick={buttonCount} style={{ backgroundColor: "green" }}>
          Count: {count}
        </button>

        <div className="square">{count * 2}</div>
      </div>
      <button onClick={addSquare}>+</button>
      <select onChange={(e) => setColor(e.target.value)} value={color}>
        <option value="green">Green</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </select>
      <div className="squares-container">
        {squares.map((squareColor, index) => (
          <div key={index} className={`square ${squareColor}`}></div>
        ))}
      </div>
      <div>
        <button onClick={incrementCount2}>+</button>
        <p>Count: {count2}</p>
      </div>
      <div>
        <input
          type="text"
          name="uniqueName"
          value={newInputValue}
          onChange={handleNewInputChange}
          placeholder="Jānis Dusmīgs"
        />
        <p>{newInputValue}</p>
      </div>
      <div>
        <button onClick={incrementCount3}>+</button>
        <p style={{ fontSize: `${fontSize3}px` }}>Count: {count3}</p>
      </div>

      <div>
        <input
          type="text"
          value={uniqueInputValue}
          onChange={handleUniqueInputChange}
          placeholder="Jānis Dusmīgs"
        />
        <p>{uniqueInputValue}</p>
      </div>
      <div>
        <div ref={squareRef} className="square2"></div>

        <button onClick={changeSquareColor}>Change Color</button>
      </div>

      <div>
        <div className="original-square"></div>
        <button onClick={cloneSquare}>Clone Square</button>
        <div className="squares-container">
          {clonedSquares.map((_, index) => (
            <div key={index} className="cloned-square"></div> // Render each cloned square
          ))}
        </div>
      </div>
      <div className={isSquareInCorner ? "square3 corner" : "square3"}>
        {isSquareInCorner && "esmu stūrī"}
      </div>
      <button onClick={sendSquareToCorner}>Send div to corner</button>
    </div>
  );
};

export default App;
