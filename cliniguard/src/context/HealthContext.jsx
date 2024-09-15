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
    const [PatientInfo, setPatientInfo] = useState({
        name:"",
        age: 35,
        gender: "Male",
        bloodType: "A+",
        lastVisit: "2023-05-15",
        photoUrl: "data:image/png;base64,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",

    })
    const auth_uri = 'https://authservice.priaid.ch/login';
    const api_key = 'r6QSd_IIITM_AC_IN_AUT'; 
    const secret_key = 't8QEb96LcMf43Kdr2';
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
            setPatientInfo({
                name:data.user||"unknown",
                age: 34,
                gender: "Male",
                bloodType: "A+",
                lastVisit: "2023-05-15",
                photoUrl: "data:image/png;base64,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",
        
            })  
            console.log(loginDetails);
            console.log(PatientInfo);
            
                   
            
        } catch (error) {
            setError('Login failed');
        }


    }

    //  const botchat=async(id,message)=>{
    //     try {
    //         const response = await fetch('http://localhost:5000/chat', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ sessonId:id ,message})
    //         });
    //         if (!response.ok) {
    //             throw new Error(`Error: ${response.status} ${response.statusText}`);
    //         }
    //         return await response.json().reply;
            
    //     }catch (error) {
    //         setError('Gemini API failed');
    //     }
    //  }
    const botchat = async (id, message) => {
        try {
          const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId: id, message })  // Corrected sessionId
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
      
          const data = await response.json();
          
          // Check if reply exists in the response
          if (data && data.reply) {
            return data.reply;
          } else {
            throw new Error('No reply from server');
          }
      
        } catch (error) {
          console.error('Gemini API failed:', error);
          return 'Sorry, something went wrong. Please try again later.'; // Return a fallback message
        }
      };
      


      const aiinfo = async ( message) => {
        try {
          const response = await fetch('http://localhost:5000/info', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({  message })  // Corrected sessionId
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
      
          const data = await response.json();
          
          // Check if reply exists in the response
          if (data && data.reply) {
            return data.reply;
          } else {
            throw new Error('No reply from server');
          }
      
        } catch (error) {
          console.error('Gemini API failed:', error);
          return 'Sorry, something went wrong. Please try again later.'; // Return a fallback message
        }
      };
      


    const logout = () => {
        setLoginDetails({
            isLogged: false,
            userName: "",
        });
        localStorage.removeItem('user')
        localStorage.removeItem('fillform')

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
            fetchuser,
            PatientInfo,
            botchat
        }}>
            {children}
        </HealthContext.Provider>
    );
};
