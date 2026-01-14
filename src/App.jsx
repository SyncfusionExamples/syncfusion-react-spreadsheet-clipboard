import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClipboardOperations from '../samples/clipboardOperations';
import PreventPaste from '../samples/PreventPaste';
import PasteOnlyValues from '../samples/pasteOnlyValues';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ClipboardOperations/>} />
        <Route path="/prevent-paste" element={< PreventPaste />} />
         <Route path="/paste-only-values" element={< PasteOnlyValues />} />
      </Routes>
    </div>
  );
};

export default App
