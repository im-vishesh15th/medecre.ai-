import React, { useContext, useEffect, useRef, useState } from "react"
import { HealthContext } from "../context/HealthContext"
import { v4 as uuidv4 } from 'uuid'; // Import the uuid v4 method

export default function Component() {
    const [sessionId,setsessionId]= useState(uuidv4())
    const {botchat}= useContext(HealthContext)
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const messagesEndRef = useRef(null)
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(scrollToBottom, [messages])
  
    const  handleSendMessage = async() => {
       
        
      if (inputMessage.trim()) {
        setMessages([...messages, { text: inputMessage, isUser: true }])
        setInputMessage('')
        const reply=await botchat(sessionId,inputMessage)

        // Simulate bot response
        setTimeout(() => {
          setMessages(prev => [...prev, { text: reply, isUser: false }])
        }, 1000)
      }
    }
  
    const handleRefresh = () => {
      setMessages([])
      setsessionId(uuidv4())
    }
  
    return (
      <div className="fixed bottom-4 right-4 z-50">
        {!isOpen && (
          <button
            className="rounded-full w-16 h-16 bg-black text-primary-foreground hover:bg-primary/90 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => setIsOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </button>
        )}
        {isOpen && (
          <div className="bg-white text-black border rounded-lg shadow-lg w-full sm:w-96 h-[80vh] sm:h-[600px] flex flex-col animate-slideIn">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">CliniBot</h2>
              <button
                className="text-gray-500  hover:text-gray-700 focus:outline-none transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-grow p-4 overflow-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.isUser ? 'text-right' : 'text-left'
                  } animate-messageIn`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-black text-white'
                        : 'bg-gray-300 text-black'
                    } max-w-[80%]`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={handleRefresh}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
        <style jsx>{`
          @keyframes slideIn {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes messageIn {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-slideIn {
            animation: slideIn 0.3s ease-out;
          }
          .animate-messageIn {
            animation: messageIn 0.3s ease-out;
          }
          @media (max-width: 640px) {
            .fixed {
              left: 0;
              right: 0;
              bottom: 0;
              width: 100%;
            }
          }
        `}</style>
      </div>
    )
  }