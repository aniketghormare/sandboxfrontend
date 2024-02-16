import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';

const Home = () => {
  const [sandboxes, setSandboxes] = useState([]);
  let token=JSON.parse(localStorage.getItem("token"))
  useEffect(() => {
    
    const fetchSandboxes = async () => {
      try {
        const response = await fetch('https://odd-red-scarab-yoke.cyclic.app/sandbox/list',{
          method:"GET",
          headers:{
            'Authorization':`Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch sandboxes');
        }
        const data = await response.json();
        setSandboxes(data);
      } catch (error) {
        console.error('Error fetching sandboxes:', error);
       
      }
    };
    fetchSandboxes();
  }, []); 

  return (
    <div>
      <h1>Saved Sandboxes</h1>
      {sandboxes && sandboxes.map((sandbox, index) => (
        <div key={index}>
          <h3>Sandbox {index + 1}</h3>
          <MonacoEditor
            width="100vw"
            height="100px"
            language="javascript"
            theme="vs-dark"
            value={sandbox.code}
            options={{
              readOnly: true,
            }}
          />
          <h3>Output: <span style={{backgroundColor:"yellow"}}>{sandbox.output}</span></h3>
        </div>
      ))}
    </div>
  );
};

export default Home;
