import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://odd-red-scarab-yoke.cyclic.app/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }
            let res=await response.json()
            localStorage.setItem("token",JSON.stringify(res.token))
           
            alert('Login successful');
            
        }

        
         catch (error) {
            console.error('Login error:', error);
           
        }
    };

    return (
        <div>
            <div style={{ margin: "auto", textAlign: "center" }}>
                <h3>Login</h3>
            </div>

            <div style={{ height: "auto", width: "400px", border: "1px solid black", margin: "auto" }}>
                <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input type="email" id="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
                    <br />
                    <br />
                    <label htmlFor="password">Password</label>
                    <br />
                    <input type="password" id="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
                    <br />
                    <br />
                    <input style={{ padding: "5px", backgroundColor: "teal", color: "white" }} type="submit" value="Login" />
                    <br />
                    <br />
                </form>
            </div>
        </div>
    );
};

export default Login;
