import Layout from '@/styles/Layout';
import Header from 'components/header/header';
import StreamDeck from 'components/body/StreamDeck';
import Footer from 'components/footer/Footer';

function App() {
  return (
    <Layout>
      <Header />
      <StreamDeck />
      <Footer />
    </Layout>
  );
}

export default App;
