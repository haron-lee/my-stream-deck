import { useState } from 'react';
import tw from 'twin.macro';
import InfoModal from '../modal/InfoModal';

export default function StreamBtn() {
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  return (
    <>
      <StreamButton onClick={openModal}>
        <img src='' alt='' />
      </StreamButton>
      {modal && <InfoModal />}
    </>
  );
}

const StreamButton = tw.button`
  w-16
  h-16 
  border 
  border-neutral-700
  rounded-xl
  shadow-stream-inner 
`;
