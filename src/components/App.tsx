import { useState } from 'react';
import Layout from '@/styles/Layout';
import Header from 'components/header/Header';
import StreamDeck from '@/components/streamDeck/StreamDeck';
import Footer from 'components/footer/Footer';
import GlobalStyles from '@/styles/GlobalStyles';

function App() {
  const [opacityCtrl, setOpacityCtrl] = useState(0.7);
  const changeOpacity = (num: number) => setOpacityCtrl(num);

  return (
    <>
      <GlobalStyles />
      <Layout $opacityCtrl={opacityCtrl}>
        <Header />
        <StreamDeck />
        <Footer $opacityCtrl={opacityCtrl} changeOpacity={changeOpacity} />
      </Layout>
    </>
  );
}

export default App;
