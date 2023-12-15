import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ChatWindow } from './components/Chat/ChatWindow';

console.log(process.env)

function App() {
  return <ChatWindow />;
}

export default App;
