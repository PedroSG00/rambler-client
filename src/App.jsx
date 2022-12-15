import './App.css';
import Navigation from './components/Navigation/Navigation';
import AppRoutes from './routes/AppRoutes';
import UserMessage from './components/UserMessage/UserMessage';
import Footer from './components/Footer/Footer'

function App() {
  return (
    <main className="App">
      <Navigation />
      <AppRoutes />
      <Footer />
      <UserMessage />
    </main>
  );
}

export default App;
