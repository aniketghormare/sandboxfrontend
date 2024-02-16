import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

const Sandbox = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    let token=JSON.parse(localStorage.getItem("token"))
    const runCode = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://odd-red-scarab-yoke.cyclic.app/sandbox/run', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify({ code }),
            });
            if (!response.ok) {
                throw new Error('Failed to run code');
            }

            const result = await response.json(); // Extract the JSON response
            console.log(result)
            // Update the output state with the result
            setOutput(result.output);

        }
        catch (error) {
            console.error('Error running code:', error);
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    const saveSandbox = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://odd-red-scarab-yoke.cyclic.app/sandbox/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify({ code, output, language: 'javascript' }), // Provide a default language
            });

            if (!response.ok) {
                throw new Error('Failed to save sandbox');
            }
            alert('Sandbox saved successfully')
            console.log('Sandbox saved successfully');
            // Optionally, show a success message to the user
        } catch (error) {
            console.error('Error saving sandbox:', error);
            // Handle error
        } finally {
            setLoading(false);
        }
    }

    console.log(output)
    return (
        <div style={{ height: "auto", width: "100vw" }}>
           
            <div style={{ height: "35px" }}>
                <select>
                    <option value="js">JavaScript</option>
                    {/* Add more language options as needed */}
                </select>
            </div>
            <div style={{ height: "90%", width: "100vw", display: "flex" }}>
                <div style={{ height: "90%", width: "70%" }}>
                    <MonacoEditor
                        language="javascript"
                        height="450px"
                        width="950px"
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value)}
                    />
                    <br />
                    <div style={{height:"auto",width:"auto",border:"1px solid white",marginLeft:"850px"}}>
                        <button style={{ padding: "5px", backgroundColor: "teal", color: "white" }} onClick={runCode} disabled={loading}>Run Code</button>
                    </div>

                </div>
                <div>
                    <div>
                        <h2>Output:</h2>
                        {output.split('\n').map((line, index) => (
                            <div  key={index}><span style={{backgroundColor:"yellow"}}>{line}</span></div>
                        ))}
                    </div>
                    <br /><br /><br />
                    <button style={{ padding: "5px", backgroundColor: "teal", color: "white" }} onClick={runCode}  onClick={saveSandbox} disabled={loading}>Save Sandbox</button>
                    {loading && <p>Loading...</p>}
                </div>
            </div>
        </div>
    );
};

export default Sandbox;
