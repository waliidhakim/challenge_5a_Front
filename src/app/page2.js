
import './globals.css'; 
import Home from '../../components/Home/home';
function MyApp({ Component, pageProps }) {
  return (
    <>

          <Home>
              <Component {...pageProps} />
          </Home>
    
    </>
  );
}

export default MyApp;
