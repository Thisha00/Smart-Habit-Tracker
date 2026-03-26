import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habitInput, setHabitInput] = useState("");
  const [data, setData] = useState({});

  const dateKey = selectedDate.toDateString();

  // Load data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("habitData"));
    if (saved) setData(saved);
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem("habitData", JSON.stringify(data));
  }, [data]);

  // Add habit to selected day
  const addHabit = () => {
    if (habitInput.trim() === "") return;

    const updated = { ...data };
    if (!updated[dateKey]) updated[dateKey] = [];

    updated[dateKey].push(habitInput);
    setData(updated);
    setHabitInput("");
  };

  // Delete habit
  const deleteHabit = (index) => {
    const updated = { ...data };
    updated[dateKey].splice(index, 1);
    setData(updated);
  };

  const todayHabits = data[dateKey] || [];

  // Highlight dates with habits
const tileClassName = ({ date, view }) => {
  if (view === "month") {
    const key = date.toDateString();
    if (data[key] && data[key].length > 0) {
      return "highlight";
    }
  }
};

  return (
    <div className="container">
      <h1>📅 Daily Habit Calendar</h1>

      {/* Calendar */}
      <Calendar onChange={setSelectedDate} value={selectedDate} tileClassName={tileClassName}/>

      <h2>{dateKey}</h2>

      {/* Input */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Add habit for this day..."
          value={habitInput}
          onChange={(e) => setHabitInput(e.target.value)}
        />
        <button onClick={addHabit}>Add</button>
      </div>

      {/* Habit list for selected day */}
      <ul className="habit-list">
        {todayHabits.map((h, index) => (
          <li key={index} className="habit-item">
            {h}
            <button onClick={() => deleteHabit(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;