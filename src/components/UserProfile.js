import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ user, setUser }) => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ ...user });

    useEffect(() => {
        if (user) {
            setFormData({ ...user });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');
        axios.put(`http://localhost:7073/api/kupac/${user.id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setUser(response.data);
            setEditMode(false);
        })
        .catch(error => console.error('Error updating user:', error));
    };

    return (
        <div>
            <h2>User Profile</h2>
            {editMode ? (
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            name="korisnickoImeKupca"
                            value={formData.korisnickoImeKupca || ''}
                            onChange={handleInputChange}
                            disabled
                            autoComplete="username"
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="sifraKupca"
                            value={formData.sifraKupca || ''}
                            onChange={handleInputChange}
                            autoComplete="new-password"
                        />
                    </div>
                    <div>
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            name="datumRodjenjaKupca"
                            value={formData.datumRodjenjaKupca || ''}
                            onChange={handleInputChange}
                            autoComplete="bday"
                        />
                    </div>
                    <div>
                        <label>Address</label>
                        <input
                            type="text"
                            name="adresaKupca"
                            value={formData.adresaKupca || ''}
                            onChange={handleInputChange}
                            autoComplete="street-address"
                        />
                    </div>
                    <div>
                        <label>City</label>
                        <input
                            type="text"
                            name="gradKupca"
                            value={formData.gradKupca || ''}
                            onChange={handleInputChange}
                            autoComplete="address-level2"
                        />
                    </div>
                    <div>
                        <label>Contact</label>
                        <input
                            type="email"
                            name="kontaktKupca"
                            value={formData.kontaktKupca || ''}
                            onChange={handleInputChange}
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="brojTelefonaKupca"
                            value={formData.brojTelefonaKupca || ''}
                            onChange={handleInputChange}
                            autoComplete="tel"
                        />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                </form>
            ) : (
                <div>
                    <p>Username: {user.korisnickoImeKupca}</p>
                    <p>Password: ******</p>
                    <p>Date of Birth: {user.datumRodjenjaKupca}</p>
                    <p>Address: {user.adresaKupca}</p>
                    <p>City: {user.gradKupca}</p>
                    <p>Contact: {user.kontaktKupca}</p>
                    <p>Phone Number: {user.brojTelefonaKupca}</p>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;

