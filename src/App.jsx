import './App.css'
import Prod from './components/Verified'
import Points from './components/Display'
import Footer from './components/Bottom'
import Header from './components/Top'
import Main from './components/Center'
import Timeline from './components/Outline'
import { useState } from "react";
import AuthForm from "./components/AuthForm";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {!isAuthenticated ? (
        <AuthForm onAuthComplete={() => setIsAuthenticated(true)} />
      ) : (
        <div className="overflow-x-hidden">
          
      <Header />
      <Main />
      <Timeline/>
      <Points/>
      <Prod />
      <Footer/>
        </div>
      )}
    </>
  );
}

export default App
