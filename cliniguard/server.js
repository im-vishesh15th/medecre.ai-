// import fetch from 'node-fetch';

// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRhc2M0ODg1QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMTE0NTMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ZlcnNpb24iOiIxMDkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xpbWl0IjoiMTAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwIjoiQmFzaWMiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDI0LTA5LTAyIiwiaXNzIjoiaHR0cHM6Ly9hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNzI1MzA3Nzk3LCJuYmYiOjE3MjUzMDA1OTd9.dvfMp9tJRhZbiKZPxoqxj2DX_WLJPmWaDMIwSrGKrm0'; // Replace with the obtained token
// const health_base_uri = 'https://healthservice.priaid.ch'; 

// const fetchFromHealthService = async (endpoint) => {
//   try {
//     const response = await fetch(`${health_base_uri}${endpoint}`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log('Health Service Response:', data);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// // Example usage
// fetchFromHealthService('/symptoms'); // Replace with the desired endpoint





// Make sure to include these imports:
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from 'readline';

// Initialize the Google Generative AI with the API key
const genAI = new GoogleGenerativeAI("AIzaSyBEIHF9fs3m-WhYiyObtu_kqZpf2QwSK04");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Set up readline for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to call Google Generative AI for generating responses
const generateTreatmentAdvice = async (condition) => {
  try {
    // Generate content based on the user's input condition
    const result = await model.generateContent({ prompt: condition });

    // Return the response text
    return result.response.text();
  } catch (error) {
    console.error("Error fetching treatment advice:", error);
    return "Sorry, I couldn't find any advice at the moment.";
  }
};

// Function to initiate chatbot conversation
const startChatbot = () => {
  rl.question("Hello! Please enter the condition you want health treatment or home remedies for: ", async (userInput) => {
    console.log(`Searching for treatments for: ${userInput}`);

    // Call the Google Generative AI model for treatment/home remedies
    const treatmentResponse = await generateTreatmentAdvice(userInput);

    // Display the treatment response
    console.log("\nTreatment/Home Remedy Information:");
    console.log(treatmentResponse);

    // Ask if the user wants to check another condition
    rl.question("\nDo you want to check another condition? (yes/no) ", (answer) => {
      if (answer.toLowerCase() === 'yes') {
        startChatbot(); // Start the process again for another condition
      } else {
        console.log("Goodbye! Stay healthy.");
        rl.close();
      }
    });
  });
};

// Start the chatbot
startChatbot();
