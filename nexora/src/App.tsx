import { BrowserRouter } from 'react-router-dom'
import AppProviders from './app/AppProviders'
import SiteLayout from './app/SiteLayout'

export default function App() {
  return <BrowserRouter><AppProviders><SiteLayout /></AppProviders></BrowserRouter>
}
