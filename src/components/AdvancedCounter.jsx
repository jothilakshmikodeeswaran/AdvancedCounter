import { useState, useEffect } from "react";

function AdvancedCounter() {
    const [count, setCount] = useState(0);
    const [history, setHistory] = useState([0]);
    const [step, setStep] = useState(1);

    useEffect(() => {
        localStorage.setItem("currentCount", count.toString());
    }, [count]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowUp") {
                handleIncrease();
            } else if (e.key === "ArrowDown") {
                handleDecrease();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [count, step, history]);

    const handleIncrease = () => {
        const newCount = count + step;
        setCount(newCount);
        setHistory([...history, newCount]);
    };

    const handleDecrease = () => {
        const newCount = count - step;
        setCount(newCount);
        setHistory([...history, newCount]);
    };

    const handleReset = () => {
        setCount(0);
        setHistory([0]);
    };

    const handleStepChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setStep(isNaN(value) ? 1 : value);
    };

    return (
        <div className="counter-container">
            <h1 className="counter-title">Advanced Counter</h1>
            <h3 className="counter-current"><strong>Current Count:</strong> {count}</h3>

            <div className="counter-buttons">
                <button onClick={handleIncrease}>Increment</button>
                <button onClick={handleDecrease}>Decrement</button>
                <button onClick={handleReset}>Reset</button>
            </div>

            <div className="counter-step">
                <label>
                    Step:
                    <input
                        type="number"
                        value={step}
                        onChange={handleStepChange}
                        className="step-input"
                    />
                </label>
            </div>

            <div className="counter-history">
                <strong>History:</strong>
                {history.map((value, index) => (
                    <p key={index}>{value}</p>
                ))}
            </div>
        </div>
    );
}

export default AdvancedCounter;