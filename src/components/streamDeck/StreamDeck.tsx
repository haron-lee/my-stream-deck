import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import StreamBtn from 'components/streamDeck/StreamBtn';
import { StreamButton } from 'components/streamDeck/StreamBtn';
import InfoModal from 'components/modal/InfoModal';
import PlusIcon from 'assets/icon-add.svg';

type StreamDeckProps = {
  deckState?: number;
};

export default function StreamDeck({ deckState }: StreamDeckProps) {
  const [streamBtns, setStreamBtns] = useState<JSX.Element[]>([]);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const addStreamBtn = () => {
    setShowInfoModal(true);
  };

  const saveInfo = (newBtn: JSX.Element) => {
    setStreamBtns((prev) => [...prev, newBtn]);
    setShowInfoModal(false);
  };

  return (
    <StreamDeckWrapper>
      {streamBtns &&
        streamBtns.map((streamBtn, index) => {
          return <React.Fragment key={index}>{streamBtn}</React.Fragment>;
        })}
      <AddButton onClick={addStreamBtn} />
      {showInfoModal && (
        <InfoModal
          isOpen={showInfoModal} // 삭제 예정
          onClose={() => setShowInfoModal(false)}
          saveInfo={saveInfo}
        />
      )}
    </StreamDeckWrapper>
  );
}

const StreamDeckWrapper = tw.div`
  p-4 
  flex 
  gap-5 
  justify-center
  flex-wrap
`;

const AddButton = styled(StreamButton)`
  background: url(${PlusIcon}) no-repeat center/40%;
`;
