// CSS Import
import './../styles/globals.scss'

// MUI Import

// Components Import
import ResponsiveAppBar from '@/components/Navbar.component'



export default function TablAIdApp({Component, pageProps}: any) {
  return <>
    <ResponsiveAppBar/>
    <Component {...pageProps} />
  </>

}