import Header from './components/Header'
import Footer from './components/Footer'
import { Categories, Hero, JournalAndTrust, Newsletter, ProductSection } from './components/HomeSections'

export default function App() {
  return <><Header/><main><Hero/><Categories/><ProductSection/><JournalAndTrust/><Newsletter/></main><Footer/></>
}
