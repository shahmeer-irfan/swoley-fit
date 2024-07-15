import React from 'react'

export default function Button({text, func}) {
    
  return (
    <button onClick={func} className="px-8 py-4 mx-auto rounded-md border-blue-400 border-solid border-[2px] bg-slate-950 blueShadow w-auto duration-200">
      <p>{text}</p>
    </button>
  );
}
