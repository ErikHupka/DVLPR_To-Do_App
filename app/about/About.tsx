import React from 'react';
import Link from 'next/link';

const About: React.FC = () => {

  return (
    <main className="max-w-full min-h-screen bg-neutral">
      <div className="hero min-h-screen bg-neutral">
        <div className="hero-content flex-col lg:flex-row-reverse mt-10">
          <div>
            {/** Just a lot of Text */}
            <h1 className="text-5xl font">Author: Erik Hupka</h1>
            <p className="py-6">First of all, I would like to thank you for using my application. Here on this page, I don't want to talk too much about me, for this purpose you can check my socials listed at the bottom.
            Well... maybe that is because I am really not good at talking about myself...
            <br/>
            Just kidding...I love talking about myself, just wait until you meet me!
            <br/><br/>
            On this page, I would like to talk about all the features and technologies used in this application. So without further ado, let's get down to it:
            </p>
            <br/>
            {/** Described functionality features */}
            <p className="text-2xl">Functionality:</p>
            <ul className="py-2">
              <li className='list-disc py-1 pl-2'><strong>Create a new To-Do List - </strong>(as many as you want)... Well... only 100 because that is limited by free MockAPI</li>
              <li className='list-disc py-1 pl-2'><strong>To Do List contains: </strong>Title + Related To Do Tasks</li>
              <li className='list-disc py-1 pl-2'><strong>Add new Task to a specific List</strong></li>
              <li className='list-disc py-1 pl-2'><strong>Task contains: </strong>Title + Description + Deadline + Status</li>
              <li className='list-disc py-1 pl-2'><strong>Delete a List or a specific Item</strong></li>
              <li className='list-disc py-1 pl-2'><strong>Mark Task as Finished or Active</strong></li>
              <li className='list-disc py-1 pl-2'><strong>Filter Tasks </strong> by their Status (All / Active / Finished)</li>
              <li className='list-disc py-1 pl-2'><strong>Search </strong>for a specific Task by it's name with a Search field</li>
              <li className='list-disc py-1 pl-2'><strong>Data Persistance - </strong>All data you create will persits after you close the application, thanks to the external API connection...This, my dearest reader, was pain, but worth it!</li>
              <li className='list-disc py-1 pl-2'><strong>TEMPLATES! - </strong>Yes, you heard me, we have template, but not one, not two, but so many I was too lazy to count them, so head to Settings, and find your favorite!</li>
            </ul>
            <br/>
            {/** Described Technologies used */}
            <p className="text-2xl">Technologies:</p>
            <ul className="py-2">
              <li className='list-disc py-1 pl-2'><strong>Next.JS - </strong>Whole project is built on Next.JS frammework</li>
              <li className='list-disc py-1 pl-2'><strong>TypeScript - </strong>TypeScript was used to optimize code writing and prevent potential bugs</li>
              <li className='list-disc py-1 pl-2'><strong>React - </strong>Of course complex react components and hooks are used in the application for optimal performance using virtual DOM</li>
              <li className='list-disc py-1 pl-2'><strong>App Router - </strong>Using "App Router" provided by Next.JS is ideal choice for simple and optimal routing</li>
              <li className='list-disc py-1 pl-2'><strong>TailwindCSS + daisyUI - </strong>Using Tailwind with DaisyUI brings simple and elegant solution for beautiful looking application with easy implementation</li>
              <li className='list-disc py-1 pl-2'><strong>React-hook-form - </strong>React library for managing all forms in the application</li>
              <li className='list-disc py-1 pl-2'><strong>ZOD data validation - </strong>Since I handled all inputs at first via React-Hook-Form, but still wanted to demonstrate using ZOD, I have used it in the Feedback Form at least.</li>
              <li className='list-disc py-1 pl-2'><strong>FetchAPI - </strong>Using FetchAPI for connection and synchronization with external api application - mockAPI<br/></li>
              <li className='list py-1 pl-2'>That was just a small part of all features, please feel free to go explore my beautiful application! <br/> (not sure about beatiful but at least functional!)</li>
            </ul>
            {/** Link to the main page - To-Do App */}
            <Link href="/">
              <button type="button" className="btn btn-primary mt-10" title="Go to the main application">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
