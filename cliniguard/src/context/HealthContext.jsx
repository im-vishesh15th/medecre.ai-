import React, { createContext, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

export const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
    const [symptoms, setSymptoms] = useState([]);
    const [predictedDiseases, setPredictedDiseases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [fillform,setfillform]=useState(false);
    const [loginDetails, setLoginDetails] = useState({
        isLogged: false,
        userName: '',
        role:''
    });

    const auth_uri = 'https://authservice.priaid.ch/login';
    const api_key = 'Pa49D_IIITM_AC_IN_AUT'; 
    const secret_key = 'Fq4k5KWo8p9TLz62E';
    const health_base_uri = 'https://healthservice.priaid.ch';

    const generateHMACMD5 = (uri, secret_key) => {
        const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.MD5, secret_key);
        hmac.update(uri);
        return hmac.finalize().toString(CryptoJS.enc.Base64);
    };

    const getAuthorizationToken = async () => {
        try {
            const computedHashString = generateHMACMD5(auth_uri, secret_key);
            const authorizationHeader = `Bearer ${api_key}:${computedHashString}`;

            const response = await fetch(auth_uri, {
                method: 'POST',
                headers: {
                    'Authorization': authorizationHeader
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setToken(data.Token);
        } catch (error) {
            setError('Error fetching token');
            setLoading(false);
        }
    };

    const fetchSymptoms = async () => {
        if (!token) return;
        try {
            const url = `${health_base_uri}/symptoms?token=${token}&format=json&language=en-gb`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setSymptoms(data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching symptoms');
            setLoading(false);
        }
    };

    const fetchDiseasePrediction = async (symptomIds, gender, yearOfBirth) => {
        if (!token) return;

        setPredictedDiseases([]); // Clear previous predictions
        setLoading(true);

        try {
            const url = `${health_base_uri}/diagnosis?symptoms=${JSON.stringify(symptomIds)}&gender=${gender}&year_of_birth=${yearOfBirth}&token=${token}&format=json&language=en-gb`;
            console.log(url);
            
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setPredictedDiseases(data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching disease predictions');
            setLoading(false);
        }
    };

    const register = async (name, email, password,role) => {
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password,role })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log('Registration successful', data);
            alert("Registration successful,go for Login")
        } catch (error) {
            setError('Registration failed');
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            alert("user logged in")
            localStorage.setItem('user',email);
            console.log(data);
            
            setLoginDetails({
                isLogged: true,
                userName: data.user||"unknown",
                role:data.role
            });
            console.log(loginDetails);
            
        } catch (error) {
            setError('Login failed');
        }
    };


    const   fetchuser= async()=>{
        const email = localStorage.getItem('user');
        try {
            const response = await fetch('http://localhost:5000/fetchuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();            
            setLoginDetails({
                isLogged: true,
                userName: data.user||"unknown",
                role:data.role
            });     
            console.log(loginDetails);
                   
            
        } catch (error) {
            setError('Login failed');
        }


    }

    const logout = () => {
        setLoginDetails({
            isLogged: false,
            userName: "",
        });
        localStorage.removeItem('user')

    };

    useEffect(() => {
        getAuthorizationToken();
    }, []);

    useEffect(() => {
        if (token) {
            fetchSymptoms();
        } else {
            setLoading(false);
        }
    }, [token]);

    return (
        <HealthContext.Provider value={{
            symptoms,
            predictedDiseases,
            fetchDiseasePrediction,
            loading,
            error,
            loginDetails,
            register,
            login,
            logout,
            fillform,
            setfillform,
            fetchuser
        }}>
            {children}
        </HealthContext.Provider>
    );
};
