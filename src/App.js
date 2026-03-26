import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

function App() {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [date, setDate] = useState(new Date());

  // Load data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("habits"));
    if (saved) setHabits(saved);
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // Add habit
  const addHabit = () => {
    if (habit.trim() === "") return;

    const newHabit = {
      text: habit,
      dates: [], // store completed dates
    };

    setHabits([...habits, newHabit]);
    setHabit("");
  };

  // Mark habit for selected date
  const toggleHabit = (index) => {
    const selectedDate = date.toDateString();
    const updated = [...habits];

    if (updated[index].dates.includes(selectedDate)) {
      updated[index].dates = updated[index].dates.filter(
        (d) => d !== selectedDate
      );
    } else {
      updated[index].dates.push(selectedDate);
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
      <h1>📅 Smart Habit Tracker</h1>

      {/* Calendar */}
      <Calendar onChange={setDate} value={date} />

      <p>Selected Date: {date.toDateString()}</p>

      {/* Input */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter habit..."
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
        />
        <button onClick={addHabit}>Add</button>
      </div>

      {/* Habit List */}
      <ul className="habit-list">
        {habits.map((h, index) => {
          const isDone = h.dates.includes(date.toDateString());

          return (
            <li key={index} className="habit-item">
              <span
                className={isDone ? "completed" : ""}
                onClick={() => toggleHabit(index)}
              >
                {h.text}
              </span>

              <button onClick={() => deleteHabit(index)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;