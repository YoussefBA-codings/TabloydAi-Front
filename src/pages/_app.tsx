import { Provider } from 'react-redux'

// Store Imports
import store from '@/store'

// CSS Imports
import '@/styles/globals.scss'

// MUI Imports

// Components Imports
import ResponsiveAppBar from '@/components/Navbar.component'



export default function TablAIdApp({Component, pageProps}: any) {
  return <>
    <Provider store={store}>
      <ResponsiveAppBar/>
      <Component {...pageProps} />
    </Provider>
  </>

}