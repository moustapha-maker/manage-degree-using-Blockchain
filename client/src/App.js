import React, { useState, useEffect } from 'react';
import ListStudents from './screens/ListStudents';
import { Routes, Route, Navigate  } from 'react-router-dom';
import AddStudent from './screens/AddStudent';
import AddDegree from './screens/AddDegree';
import ListDegrees from './screens/ListDegrees';
import Imagedetails from './screens/Imagedetails';
import Login from './components/Login/Login';
import useToken from './components/App/useToken';


const App = () => {
  const { token, setToken } = useToken();
 
  if(!token) {
    return (
      <div>
    <Routes>
    <Route path="/" element={<ListStudents />}
     />
     <Route path="/login" element={<Login setToken={setToken} />}
     />
     <Route path="/view-degrees/:id" element={<ListDegrees />} />
        <Route path="/view-degree-image/:imageurl" element={<Imagedetails />} />
     </Routes>
     </div>
    )
  }

  return (

    <div >
      <Routes>
         <Route path="/" element={<ListStudents />}/>
        <Route path="/add-student" element={<AddStudent />} />
        <Route
          path="/add-degree/:id"
          element={!token ? <Navigate to="/login" /> : <AddDegree />  }
        />
        <Route path="/view-degrees/:id" element={<ListDegrees />} />
        <Route path="/view-degree-image/:imageurl" element={<Imagedetails />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </div>
  );
    
};

export default App;
