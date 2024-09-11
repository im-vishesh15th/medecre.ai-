// import React, { useState, useEffect } from 'react';
// import CryptoJS from 'crypto-js';

// const SymptomsPage = () => {
//   const [symptoms, setSymptoms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const auth_uri = 'https://authservice.priaid.ch/login';
//   const api_key = 'Pa49D_IIITM_AC_IN_AUT'; 
//   const secret_key = 'Fq4k5KWo8p9TLz62E';
//   const health_base_uri = 'https://healthservice.priaid.ch';

//   // Function to calculate HMACMD5 hash
//   const generateHMACMD5 = (uri, secret_key) => {
//     const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.MD5, secret_key);
//     hmac.update(uri);
//     return hmac.finalize().toString(CryptoJS.enc.Base64);
//   };

//   // Function to get the authorization token
//   const getAuthorizationToken = async () => {
//     try {
//       const computedHashString = generateHMACMD5(auth_uri, secret_key);
//       const authorizationHeader = `Bearer ${api_key}:${computedHashString}`;

//       const response = await fetch(auth_uri, {
//         method: 'POST',
//         headers: {
//           'Authorization': authorizationHeader
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       return data.Token;
//     } catch (error) {
//       setError('Error fetching token');
//       console.error('Error fetching token:', error.message);
//       setLoading(false);
//     }
//   };

//   // Function to fetch symptoms
//   const fetchSymptoms = async (token) => {
//     try {
//       const url = `${health_base_uri}/symptoms?token=${token}&format=json&language=en-gb`;

//       const response = await fetch(url, {
//         method: 'GET',
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       setSymptoms(data); // Store symptoms in state
//       setLoading(false);
//     } catch (error) {
//       setError('Error fetching symptoms');
//       console.error('Error fetching symptoms:', error.message);
//       setLoading(false);
//     }
//   };

//   // Fetch token and symptoms on component mount
//   useEffect(() => {
//     const initialize = async () => {
//       const token = await getAuthorizationToken();
//       if (token) {
//         await fetchSymptoms(token);
//       }
//     };
//     initialize();
//   }, []);

//   return (
//     <div>
//       <h1>Symptoms List</h1>

//       {loading && <p>Loading symptoms...</p>}
//       {error && <p>{error}</p>}
//       {!loading && !error && (
//         <ul>
//           {symptoms.map((symptom) => (
//             <li key={symptom.ID}>{symptom.Name}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SymptomsPage;
import React, { useContext } from 'react';
import { HealthContext } from '../context/HealthContext';

const SymptomsPage = () => {
  const { symptoms, loading, error } = useContext(HealthContext);

  if (loading) return <p>Loading symptoms...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Symptoms List</h1>
      <ul>
        {symptoms.map((symptom) => (
          <li key={symptom.ID}>{symptom.Name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SymptomsPage;
