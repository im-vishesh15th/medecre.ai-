import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Clipboard, Users, Brain, HeartPulse, Stethoscope, Calendar, FileText, Image } from "lucide-react"
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

export default function Home() {
  return (
    
   

    
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Navbar/>

      <main>
        <Hero/>
       

        <section className="py-16 bg-gray-800">
          <div className="max-w-screen-xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12 text-teal-400">
              Key Features
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Clock, title: "Efficiency", description: "Automate administrative and clinical processes, reducing staff workload and streamlining operations." },
                { icon: Clipboard, title: "Accuracy", description: "Centralized digital records with real-time data sync ensure consistent, up-to-date patient information." },
                { icon: Users, title: "Accessibility", description: "Patient portal and online appointment booking system enhance accessibility for patients." },
                { icon: Brain, title: "AI Integration", description: "AI-driven predictive analysis, personalized diet recommendations, and a medical chatbot for advanced healthcare solutions." }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 p-6 rounded-lg h-full"
                >
                  <div className="text-teal-400 mb-4">
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-screen-xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12 text-teal-400">
              How It Works
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Calendar, title: "Schedule", description: "Easily manage appointments and patient flow" },
                { icon: Stethoscope, title: "Treat", description: "Access patient records and provide care efficiently" },
                { icon: FileText, title: "Follow-up", description: "Automate follow-ups and maintain patient engagement" }
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="bg-teal-400 text-gray-900 p-4 rounded-full mb-4">
                    <step.icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-teal-400 mb-2">{step.title}</h3>
                  <p className="text-gray-100">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-800">
          <div className="max-w-screen-xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12 text-teal-400">
              What Our Users Say
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Dr. Emily Chen", role: "General Practitioner", content: "CliniGuard has transformed our clinic's efficiency. We've reduced wait times and improved patient satisfaction significantly." },
                { name: "Mark Johnson", role: "Clinic Administrator", content: "The automated billing and scheduling features have saved us countless hours. It's an indispensable tool for modern healthcare management." },
                { name: "Sarah Thompson", role: "Patient", content: "I love being able to book appointments and access my medical records online. It makes managing my health so much easier." }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg">
                  <p className="text-gray-100 mb-4">"{testimonial.content}"</p>
                  <p className="font-semibold text-teal-400">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-1"
              >
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="CliniGuard in action"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
              <div className="flex-1">
                <motion.h2
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-teal-400 mb-4"
                >
                  Ready to Transform Your Clinic?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-gray-400 mb-8"
                >
                  Get in touch with us today to schedule a demo or learn more about how CliniGuard can
                  enhance your clinic’s efficiency and patient care.
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-teal-400 text-gray-900 px-4 py-2 font-bold flex items-center gap-2 rounded hover:bg-teal-300"
                >
                  Contact Us <ArrowRight size={16} />
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    
  )
}
