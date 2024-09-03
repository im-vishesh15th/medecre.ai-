import crypto from 'crypto';


const api_key = 'y8K6C_GMAIL_COM_AUT'; // Replace with your API key
const secret_key = 'Ac5o6S9KwEp4j2Z7N'; // Replace with your secret key
const auth_uri = 'https://authservice.priaid.ch/login';

const createHash = (key, data) => {
  return crypto.createHmac('md5', key).update(data).digest('base64');
};

const computedHashString = createHash(secret_key, auth_uri);

const getToken = async () => {
  try {
    const response = await fetch(auth_uri, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${api_key}:${computedHashString}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Token Response:', data);
    return data.Token; // Extract the token from the response
  } catch (error) {
    console.error('Error:', error);
  }
};

getToken().then(token => {
  if (token) {
    // Use the token for subsequent requests
  }
});
