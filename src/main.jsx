import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import Root from './router/index.jsx'
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')).render(
  <Root />
)