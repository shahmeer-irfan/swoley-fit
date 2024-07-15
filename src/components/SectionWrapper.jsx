import React from 'react'


// generator and workout component will have same section wrapper style.
export default function SectionWrapper(props) {   //({children ,header, title}) we can also write this.
     const {children , header, title, id} = props;   //we are destructing children content via props.
  return (
    <section id={id} className="min-h-screen flex flex-col gap-10">
      <div className="bg-slate-950 py-10 flex flex-col gap-2 justify-center items-center p-4">
        <p className="uppercase font-medium">{header}</p>
        <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          {title[0]} <span className="uppercase text-blue-400">{title[1]}</span>{" "}
          {title[2]}
        </h2>
      </div>

      <div className='max-w-[800px] w-full mx-auto flex flex-col gap-10 p-4 '>{children}</div>
    </section>
  );
}
