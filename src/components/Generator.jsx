import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utils/swoldier";
import Button from "./Button";

//1.children content is anything that wraps between component tag
//2. another way of passing props is via attribute.

function Header(props) {
  //this will get rendered as a children in section wrapper
  const { index, title, description } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-center">
        <p className="text-3xl sm:text-4xl md: text:5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
}

export default function Generator({
  muscles,
  setMuscles,
  poison,
  setPoison,
  goals,
  setGoals,
  updateWorkout,
}) {
  const [showModal, setshowModal] = useState(false);

  //let showModal= false : we cant directly change variable in react.
  function toggleModal() {
    setshowModal(!showModal);
  }

  function updateMuscle(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter((val) => val !== muscleGroup));
      return;
    }

    if (muscles.length > 2) {
      return;
    }

    if (poison !== "individual") {
      setMuscles([muscleGroup]);
      setshowModal(false);
      return;
    }

    setMuscles([...muscles, muscleGroup]);
    if (muscles.length === 2) {
      setshowModal(false);
    }
  }

  const header = "generate your workout";
  const title = ["It's", "Huge", "o'lick"];
  return (
    <SectionWrapper id={'generate'} header={header} title={title}>
      <Header //this will be children to section wrapper
        index={"01"} //passing props in header component
        title={"Pick your poison"}
        description={"Select the workout you wish to endure."}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map(
          (
            type,
            index //object.keys(WORKOUT) method returns an arrray of keys(properties)
          ) => {
            return (
              <button
                onClick={() => {
                  setPoison(type);
                  setMuscles([]);
                }}
                className={
                  `bg-slate-950 px-4 border border-blue-400 py-3 rounded-lg  duration-200 hover:border-blue-600 ` +
                  (poison === type ? "border-blue-600" : "border-blue-400")
                }
                key={index}
              >
                <p className="capitalize">{type.replaceAll("_", " ")}</p>
              </button>
            );
          }
        )}
      </div>

      <Header //this will be children to section wrapper
        index={"02"} //passing props in header component
        title={"Lock on targets"}
        description={"Select the muscles judged for annihilation."}
      />
      <div className="bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col">
        <button
          onClick={toggleModal}
          className="relative flex p-3 items-center justify-center"
        >
          <p className="capitalize">
            {muscles.length == 0 ? `Select muscle groups` : muscles.join(" ")}
          </p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
        </button>

        {showModal && (
          <div className="flex flex-col p-3">
            {(poison === "individual"
              ? WORKOUTS[poison]
              : Object.keys(WORKOUTS[poison])
            ).map((muscleGroup, index) => {
              return (
                <button
                  onClick={() => {
                    updateMuscle(muscleGroup);
                  }}
                  key={index}
                  className={
                    `hover:text-blue-400 duration-200 ` +
                    (muscles.includes(muscleGroup)
                      ? "text-blue-400"
                      : "text-white")
                  }
                >
                  <p className="uppercase">{muscleGroup}</p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Header //this will be children to section wrapper
        index={"03"} //passing props in header component
        title={"Become Juggernaut"}
        description={"Select your ultimate objective."}
      />
      <div className="grid grid-col-1 sm:grid-cols-3  gap-4">
        {Object.keys(SCHEMES).map(
          (
            scheme,
            index //object.keys(WORKOUT) method returns an arrray of keys(properties)
          ) => {
            return (
              <button
                onClick={() => setGoals(scheme)}
                className={
                  `bg-slate-950 border px-4 border-blue-400 py-3 rounded-lg  duration-200 hover:border-blue-600 ` +
                  (scheme === goals ? "border-blue-600" : "border-blue-400")
                }
                key={index}
              >
                <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
              </button>
            );
          }
        )}
      </div>
      <Button func = {updateWorkout} text={"Formulate"} ></Button>
    </SectionWrapper>
  );
}

// Object.keys(SCHEMES): This method returns an array of the keys (property names) of the SCHEMES object. For example, if SCHEMES is an object like this:

// const SCHEMES = {
//   strength_power: { /* some properties */ },
//   endurance: { /* some properties */ },
//   flexibility: { /* some properties */ }
// };
// Then Object.keys(SCHEMES) would return ['strength_power', 'endurance', 'flexibility'].

// .map((scheme, index) => { ... }): The map method is called on the array returned by Object.keys(SCHEMES). The map method creates a new array populated with the results of calling a provided function on every element in the calling array.

// scheme: This is the current element being processed in the array. In this case, it would be a string representing one of the keys from SCHEMES (e.g., 'strength_power').
// index: This is the index of the current element being processed in the array.
// Inside the map callback function: The code inside the callback function is executed for each key in the SCHEMES object. In this example, it returns a button element for each scheme.
