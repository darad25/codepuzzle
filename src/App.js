import { Routes, Route } from 'react-router-dom';

import Directory from './components/directory/directory.component';

const App = () => {
  return (
    <Routes>
      <Route > 
        <Route index element={<Directory />} />
      </Route>
    </Routes> 
  );
}; 

export default App;