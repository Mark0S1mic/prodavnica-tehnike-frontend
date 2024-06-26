import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7073/api/Autentifikacija/login', { username, password });
            const { token, role, korisnickoImeKupca } = response.data; // Dodajte korisnickoImeKupca ako je dostupno u odgovoru
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userRole', role);
            setUser(response.data); // Set user state with response data
            console.log('Korisničko ime kupca:', korisnickoImeKupca); // Dodajte ovaj red za ispis korisničkog imena
            if (role === 'Admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                style={{ width: "185px" }} alt="logo" />
                                            <h4 className="mt-1 mb-5 pb-1">Become a Bit</h4>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <p>Please login to your account</p>
                                            <div className="form-outline mb-4">
                                                <input type="text" id="form2Example11" className="form-control"
                                                    placeholder="Username"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)} />
                                                <label className="form-label" htmlFor="form2Example11">Username</label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="password" id="form2Example22" className="form-control"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)} />
                                                <label className="form-label" htmlFor="form2Example22">Password</label>
                                            </div>
                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Log in</button>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 me-2">Don't have an account?</p>
                                                <button onClick={() => navigate('/register')} type="button" className="btn btn-outline-danger">Create new</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">We are more than just a company</h4>
                                        <p className="small mb-0">Create an account, and begin shopping for all your needs.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
