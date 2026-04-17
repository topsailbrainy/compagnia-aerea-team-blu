import Navbar from './components/Navbar'
import Hero from './components/Hero'
import NewsSection from './components/NewsSection'
import QuoteSection from './components/QuoteSection'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <Hero />
        <NewsSection />
        <QuoteSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}

export default App
