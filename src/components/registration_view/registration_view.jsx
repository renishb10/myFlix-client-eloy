import React, {useState} from 'react';

export function RegistrationView (props) {
    
    const [newUsername, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newUsername, password, email, birth);
        props.onRegistrated(newUsername)
    }

    return(
        <form>
            <label>
                Username: 
                <input type = "text" value = {newUsername} onChange = {e => setUsername (e.target.value)} />
            </label>
            <label>
                Password:
                <input type = "password" value = {password} onChange = {e => setPassword (e.target.value)} />
            </label>
            <label>
                email:
                <input type = "text" value = {email} onChange = {e => setEmail (e.target.value)} />
            </label>
            <label>
                Birth Date:
                <input type = "date" value = {birth} onChange = {e => setBirth(e.target.value)} />
            </label>
            <button type = "submit" onClick = {handleSubmit}> Register </button>
        </form>
    );
}