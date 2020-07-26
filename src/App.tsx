import React from 'react';
import WordGrid from './component/WordGrid'
import Footer from './component/Footer';
function App() {
  return (
    <div className="bg-gray-900 h-full flex flex-col root-wrapper">
      <div className="flex-none w-full shadow-lg bg-gray-800">
        <div className="container mx-auto ">
          <div className="mx-4">
            <h1 className="text-3xl font-bold text-center text-white py-2 flex justify-center items-center">
              <div className="flex flex-col mr-2 leading-tight">
                <span className="text-lg">WordGrid</span>
                <span className="text-xs">(or any character)</span>
              </div>
              <span className="text-4xl leading-tight">
                Finder
              </span>
            </h1>
          </div>
        </div>
      </div>
      <div className="flex-grow ">
        <div className="container mx-auto">
          <div className="mx-4">
            <WordGrid/>
          </div>
        </div>
      </div>
      <div className="flex-none">
        <Footer />
      </div>

    </div>
  );
}

export default App;
