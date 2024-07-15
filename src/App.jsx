import React from "react";
import Hero from "./components/Hero";
import Generator from "./components/Generator";
import Workout from "./components/Workout";
import { generateWorkout } from "./utils/functions";
import { useState } from "react";


export default function App() {
  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscles] = useState([]);
  const [goals, setGoals] = useState("strength_power");

  const [workout, setWorkout] = useState(null);

  function updateWorkout() {
    if (muscles.length < 1) {
      return;
    }
    let newWorkout = generateWorkout({ poison, muscles,goal: goals });
    console.log(newWorkout);
    setWorkout(newWorkout);
    window.location.href = "#workout"
  }
  return (
    <main className="min-h-screen flex-col bg-gradient-to-r from bg-slate-800 to-slate-950  text-white text-sm sm:text-base">
      {/* text will be small on mobile screens */}
      <Hero />

      <Generator
        poison={poison}
        setPoison={setPoison}
        muscles={muscles}
        setMuscles={setMuscles}
        goals={goals}
        setGoals={setGoals}
        updateWorkout={updateWorkout}
      />
      {workout && <Workout workout={workout} />}
    </main>
  );
}
