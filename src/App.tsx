import React from 'react';
import WordGrid from './component/WordGrid'
import Footer from './component/Footer';
import Header from './component/Header';
function App() {
  return (
    <div className="bg-dark-800 h-full flex flex-col root-wrapper">
      <div className="flex-none">
        <Header />
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
