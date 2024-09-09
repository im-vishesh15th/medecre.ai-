import * as React from "react"

const PulseIcon = () => (
  <svg className="w-16 h-16 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
  </svg>
)

export default function Login() {
  const [isLogin, setIsLogin] = React.useState(true)
  const [role, setRole] = React.useState("patient")

  const handleSubmit = (event) => {
    event.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted", { isLogin, role })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-teal-500 opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      <div className="max-w-md w-full space-y-8 bg-gray-800 bg-opacity-80 p-10 rounded-2xl shadow-2xl relative z-10 backdrop-filter backdrop-blur-sm">
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-teal-500 bg-opacity-20 rounded-full p-3 animate-pulse">
              <PulseIcon />
            </div>
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-2">
            Clinic Portal
          </h2>
          <p className="text-teal-400 text-lg">Your health, our priority</p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 rounded-full transition-all duration-300 text-lg font-medium ${
              isLogin ? 'bg-teal-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 rounded-full transition-all duration-300 text-lg font-medium ${
              !isLogin ? 'bg-teal-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Register
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="name" className="sr-only">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-400 text-white bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent sm:text-sm"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-400 text-white bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
              </>
            )}
            {isLogin && (
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-400 text-white bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent sm:text-sm"
                  placeholder="Username"
                />
              </div>
            )}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`appearance-none ${isLogin ? 'rounded-b-md' : 'rounded-md'} relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-400 text-white bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent sm:text-sm`}
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <label htmlFor="role" className="sr-only">
                Select Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent sm:text-sm rounded-md"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-teal-500 group-hover:text-teal-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              {isLogin ? "Sign in" : "Register"}
            </button>
          </div>
        </form>

        {isLogin && (
          <div className="text-center mt-4">
            <a href="#" className="font-medium text-teal-400 hover:text-teal-300 transition-colors duration-300">
              Forgot your password?
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
