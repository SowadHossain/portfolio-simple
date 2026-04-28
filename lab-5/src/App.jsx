import { useState } from "react"
import Navbar from "./components/Navbar"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import { navLinks } from "./data/portfolioData"

function App() {
  const [isDark, setIsDark] = useState(false)

  return (
    <MainLayout isDark={isDark}>
      <Navbar
        links={navLinks}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />
      <Home />
    </MainLayout>
  )
}

export default App
