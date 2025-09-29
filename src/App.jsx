import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const lis = Array.from({ length: 900 }, (_, i) => i);

  const chosenBars = [
    105, 106, 134, 135, 136, 137, 164, 165, 166, 167, 195, 196,
    225, 226, 255, 256, 285, 286, 315, 316, 345, 346, 375, 376,
    405, 406, 223, 224, 252, 282, 312, 342, 372, 254, 284, 314,
    344, 374, 227, 257, 287, 317, 347, 377, 228, 259, 289, 319,
    349, 379, 253, 258, 402, 409, 404, 407, 434, 464, 494, 524,
    554, 584, 437, 467, 497, 527, 557, 587, 583, 588
  ];

  const mainGreenBars = [
    195, 196, 224, 225, 226, 227, 254, 255, 256, 257,
    285, 315, 286, 495, 496, 316, 345, 346, 375, 376,
    405, 406, 435, 436, 465, 466
  ];

  const animation1 = [
    314, 317, 343, 372, 371, 370, 348, 379, 409, 439, 469,
    524, 553, 582, 611, 641, 671, 526, 556, 586, 617, 648,
    679, 701, 700, 708, 369
  ];

  const animation2 = [
    314, 317, 343, 373, 403, 432, 461, 348, 378, 408, 438,
    468, 498, 524, 554, 584, 614, 644, 674, 704, 703,
    526, 556, 586, 616, 646, 676, 706, 705
  ];

  // ✅ States
  const [sceneIndex, setSceneIndex] = useState(1);
  const [trueRed, setTrueRed] = useState(true);
  const [trueGreen, setTrueGreen] = useState(false);
  const [blinkOn, setBlinkOn] = useState(false);

  // Red/Green toggle
  useEffect(() => {
    const interval = setInterval(() => {
      setTrueRed(prev => !prev);
      setTrueGreen(prev => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Scene toggle (green animation)
  useEffect(() => {
    const interval = setInterval(() => {
      setSceneIndex(prev => (prev === 1 ? 2 : 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const chosenGreenBars =
    sceneIndex === 1
      ? mainGreenBars.concat(animation1)
      : mainGreenBars.concat(animation2);

  // ✅ Blinking cycle (red)
  useEffect(() => {
    function startBlinkCycle() {
      const onTimeout = setTimeout(() => {
        setBlinkOn(true);
      }, 7000);

      const offTimeout = setTimeout(() => {
        setBlinkOn(false);
      }, 9999);

      return () => {
        clearTimeout(onTimeout);
        clearTimeout(offTimeout);
      };
    }

    // run immediately
    let cleanup = startBlinkCycle();

    // repeat every 10s
    const interval = setInterval(() => {
      cleanup = startBlinkCycle();
    }, 10000);

    return () => {
      clearInterval(interval);
      cleanup?.();
    };
  }, []);

  const adjustedChosenBars = chosenBars.map(bar => bar + 90);

  return (
    <div className="app">
      <div className="container">
        <ul className="traffic-red">
          {lis.map((_, index) => {
            let className = "normal-bar";
            if (!trueRed) className = "not-active";
            else if (adjustedChosenBars.includes(index + 1)) className = "chosen-bar";

            return (
              <li
                style={{ animationName: blinkOn ? "blinkRed" : "" }}
                key={index}
                className={className}
              />
            );
          })}
        </ul>

        <ul className="traffic-green">
          {lis.map((_, index) => {
            let className = "normal-green-bar";
            if (!trueGreen) className = "not-active";
            else if (chosenGreenBars.includes(index + 1)) className = "chosen-green-bar";

            return <li key={index} className={className} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
