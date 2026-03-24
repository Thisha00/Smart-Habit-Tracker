import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("habits"));
    if (saved) setHabits(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  
  // Add habit
  const addHabit = () => {
    if (habit.trim() === "") return;

    const newHabit = {
      text: habit,
      completed: false,
      streak: 0,
    };

    setHabits([...habits, newHabit]);
    setHabit("");
  };

  // Toggle habit
  const toggleHabit = (index) => {
    const updated = [...habits];
    updated[index].completed = !updated[index].completed;

    if (updated[index].completed) {
      updated[index].streak += 1;
    }

    setHabits(updated);
  };

  // Delete habit
  const deleteHabit = (index) => {
    const updated = habits.filter((_, i) => i !== index);
    setHabits(updated);
  };

  return (
    <div className="container">
      <h1>🔥 Smart Habit Tracker</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a habit..."
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
        />
        <button onClick={addHabit}>Add</button>
      </div>

      <ul className="habit-list">
        {habits.map((h, index) => (
          <li key={index} className="habit-item">
            <span
              className={h.completed ? "completed" : ""}
              onClick={() => toggleHabit(index)}
            >
              {h.text}
            </span>

            <span className="streak">🔥 {h.streak}</span>

            <button onClick={() => deleteHabit(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;