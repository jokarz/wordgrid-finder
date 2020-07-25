import React from 'react';
import Crossword from './component/WordGrid'
import Footer from './component/Footer';
function App() {
  return (
    <div className="bg-gray-900 h-full flex flex-col root-wrapper">
      <div className="container mx-auto flex-none mb-4">
        <div className="mx-4">
          <h1 className="text-3xl font-bold text-center text-white pt-4">WordSearch Finder</h1>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        <div className="container mx-auto">
          <div className="mx-4">
            <Crossword test={'gg'} />
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
