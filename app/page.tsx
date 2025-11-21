import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="text-center animate-fade-in-up">
          <div className="inline-block mb-6">
            <div className="text-6xl mb-4 animate-bounce-slow">💰</div>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-6 animate-gradient">
            PersonalFin
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
            Your Money, Your Rules 🚀
          </p>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Track income, expenses, investments & more. All in one beautiful place.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/login"
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <span className="flex items-center gap-2">
                Login
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
            <Link
              href="/register"
              className="group px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:bg-purple-50"
            >
              <span className="flex items-center gap-2">
                Get Started
                <span className="group-hover:translate-x-1 transition-transform">✨</span>
              </span>
            </Link>
          </div>
        </div>
        
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-100">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📊</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Track Everything</h3>
            <p className="text-gray-600 leading-relaxed">Monitor income, expenses, liabilities, subscriptions, and investments with ease</p>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-pink-100">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎯</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Stay Organized</h3>
            <p className="text-gray-600 leading-relaxed">Keep all your financial data secure and organized in one beautiful dashboard</p>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💡</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Smart Insights</h3>
            <p className="text-gray-600 leading-relaxed">Get instant insights into your financial health and make better decisions</p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg">
            <p className="text-gray-600">
              Join thousands managing their finances smarter 🌟
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
