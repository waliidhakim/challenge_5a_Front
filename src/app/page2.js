
import './globals.css'; 
// import { AppWrapper } from '../../components/contextTest2/context'; 
import Home from '../../components/Home/home';
function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <AppWrapper> */}
          <Home>
              <Component {...pageProps} />
          </Home>
      {/* </AppWrapper> */}
    </>
  );
}

export default MyApp;
