import { useState } from 'react'
import './App.css'

// Import icons
import { FaUpload, FaCalculator, FaMoneyBillWave, FaShieldAlt, FaRocket, FaHandshake, FaHeadset, FaMoon, FaSun } from 'react-icons/fa'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  })
  
  const [formErrors, setFormErrors] = useState({})
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      })
    }
  }
  
  // Validate form
  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) errors.name = 'Name is required'
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email'
    }
    
    if (!formData.company.trim()) errors.company = 'Company is required'
    if (!formData.licenseType) errors.licenseType = 'Please select a license type'
    if (!formData.message.trim()) errors.message = 'Message is required'
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // In a real app, you would send this data to a server
      alert('Form submitted successfully!')
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        licenseType: '',
        message: ''
      })
    }
  }
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }
  
  // Handle chat message submission
  const handleChatSubmit = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    
    // Add user message
    const newMessages = [...chatMessages, { sender: 'user', text: chatInput }]
    setChatMessages(newMessages)
    setIsLoading(true)
    
    // Simulate AI response
    setTimeout(() => {
      let response = ''
      
      // Simple response logic based on keywords
      const input = chatInput.toLowerCase()
      if (input.includes('sell') || input.includes('license')) {
        response = 'To sell your license, simply upload it through our platform, and we\'ll provide you with a valuation within 24 hours. Once you accept, you\'ll get paid within 3 business days!'
      } else if (input.includes('payment') || input.includes('pay')) {
        response = 'We offer multiple payment methods including direct bank transfer, PayPal, and cryptocurrency. You\'ll typically receive payment within 3 business days after accepting our offer.'
      } else if (input.includes('valuation') || input.includes('worth')) {
        response = 'Our valuation process considers market demand, remaining license duration, and current retail pricing. We typically offer 40-70% of retail value depending on these factors.'
      } else if (input.includes('time') || input.includes('long')) {
        response = 'The entire process usually takes 3-5 business days from license upload to payment receipt. Valuation is provided within 24 hours.'
      } else {
        response = 'Thanks for your message! Feel free to ask about selling licenses, payment methods, valuation process, or timing. How else can I help you today?'
      }
      
      setChatMessages([...newMessages, { sender: 'ai', text: response }])
      setChatInput('')
      setIsLoading(false)
    }, 1000)
  }
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-blue-600 dark:text-blue-400 font-bold text-2xl">SoftSell</div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {/* {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />} */}
            </button>
            
            <a href="#contact" className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              Get Started
            </a>
          </div>
        </div>
      </nav>
      
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Turn Unused Software Licenses Into <span className="text-blue-600 dark:text-blue-400">Instant Cash</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  SoftSell helps businesses recover value from unused or excess software licenses with our simple, secure platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-center transition-colors font-medium">
                    Sell My Licenses
                  </a>
                  <a href="#how-it-works" className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-3 rounded-md text-center transition-colors font-medium">
                    Learn More
                  </a>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl text-blue-600 dark:text-blue-400 mb-4">💻</div>
                    <p className="text-gray-600 dark:text-gray-300">Software License Marketplace</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 bg-gray-50 dark:bg-gray-800 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">How It Works</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our streamlined process makes selling your unused software licenses quick and hassle-free.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUpload className="text-2xl text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">1. Upload License</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Submit your license details through our secure portal. We support all major software vendors.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCalculator className="text-2xl text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">2. Get Valuation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Receive a competitive valuation within 24 hours based on current market rates and license terms.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMoneyBillWave className="text-2xl text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">3. Get Paid</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Accept our offer and receive payment via your preferred method within 3 business days.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SoftSell</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We've helped thousands of businesses recover value from their unused software assets.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <FaShieldAlt className="text-3xl text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure & Compliant</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our platform ensures all transactions are secure and compliant with licensing regulations.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <FaRocket className="text-3xl text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get valuations within 24 hours and payment within 3 business days of acceptance.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <FaHandshake className="text-3xl text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Best Rates</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our extensive buyer network ensures you get the most competitive offers for your licenses.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <FaHeadset className="text-3xl text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our team of licensing experts is available to guide you through every step of the process.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our customers have to say about SoftSell.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Jane Doe</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">CTO, TechCorp Inc.</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "SoftSell helped us recover over $50,000 from unused enterprise licenses after our recent downsizing. The process was incredibly smooth, and the team was professional throughout. Highly recommended!"
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">MS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Mike Smith</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">IT Director, Global Services Ltd.</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "We had a surplus of design software licenses after a project ended. SoftSell provided a fair valuation and handled the transfer process seamlessly. The funds helped us invest in new tools we actually needed."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section id="contact" className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started Today</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Fill out the form below to start the process of selling your unused software licenses.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    placeholder="Your name"
                  />
                  {formErrors.name && <p className="text-red-500 mt-1 text-sm">{formErrors.name}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    placeholder="your.email@company.com"
                  />
                  {formErrors.email && <p className="text-red-500 mt-1 text-sm">{formErrors.email}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="company" className="block mb-2 font-medium">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    placeholder="Your company name"
                  />
                  {formErrors.company && <p className="text-red-500 mt-1 text-sm">{formErrors.company}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="licenseType" className="block mb-2 font-medium">License Type</label>
                  <select
                    id="licenseType"
                    name="licenseType"
                    value={formData.licenseType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                  >
                    <option value="">Select license type</option>
                    <option value="enterprise">Enterprise Software</option>
                    <option value="creative">Creative Suite</option>
                    <option value="productivity">Productivity Tools</option>
                    <option value="security">Security Software</option>
                    <option value="other">Other</option>
                  </select>
                  {formErrors.licenseType && <p className="text-red-500 mt-1 text-sm">{formErrors.licenseType}</p>}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    placeholder="Tell us about the licenses you want to sell"
                  ></textarea>
                  {formErrors.message && <p className="text-red-500 mt-1 text-sm">{formErrors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-colors font-medium"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
        
        {/* Chat Widget */}
        <div className="fixed bottom-6 right-6 z-50">
          {!showChat ? (
            <button
              onClick={() => setShowChat(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors"
              aria-label="Open chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </button>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-80 md:w-96 overflow-hidden">
              <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <h3 className="font-medium">SoftSell Assistant</h3>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label="Close chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="h-80 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-700">
                {chatMessages.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    <p className="mb-2">Welcome to SoftSell Assistant!</p>
                    <p>Ask me anything about selling your software licenses.</p>
                    <div className="mt-4 space-y-2">
                      <button
                        onClick={() => {
                          setChatInput('How do I sell my license?')
                          handleChatSubmit({ preventDefault: () => {} })
                        }}
                        className="bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                      >
                        How do I sell my license?
                      </button>
                      <button
                        onClick={() => {
                          setChatInput('How long does the process take?')
                          handleChatSubmit({ preventDefault: () => {} })
                        }}
                        className="bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors block"
                      >
                        How long does the process take?
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-3/4 p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white'}`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-3/4 p-3 rounded-lg bg-gray-200 dark:bg-gray-600">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-400 animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    disabled={isLoading}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-blue-600 dark:text-blue-400 font-bold text-xl mb-2">SoftSell</div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                © {new Date().getFullYear()} SoftSell. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a>
              <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
