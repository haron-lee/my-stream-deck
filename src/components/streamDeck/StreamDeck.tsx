import { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { StreamButton } from 'components/streamDeck/StreamBtn';
import StreamBtn from 'components/streamDeck/StreamBtn';
import InfoModal from 'components/modal/InfoModal';

import { infoType } from '@/types/info';
import PlusIcon from 'assets/icon-add.svg';

export default function StreamDeck() {
  const [streamBtns, setStreamBtns] = useState<infoType[]>([]);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const addStreamBtn = () => {
    setShowInfoModal(true);
  };

  const removeStreamBtn = (infoId: string) => {
    setStreamBtns((prevStreamBtns) => {
      const updatedStreamBtns = prevStreamBtns.filter(
        (info) => info.id !== infoId,
      );
      return updatedStreamBtns;
    });
  };

  const removeAllBtns = () => {
    setStreamBtns([]);
  };

  const saveInfo = (newBtnInfo: infoType) => {
    setStreamBtns((prev) => [...prev, newBtnInfo]);
    setShowInfoModal(false);
  };

  return (
    <StreamDeckWrapper>
      {streamBtns &&
        streamBtns.map((streamInfo) => {
          return (
            <StreamBtn
              key={streamInfo.id}
              streamInfo={streamInfo}
              removeStreamBtn={removeStreamBtn}
              removeAllBtns={removeAllBtns}
            />
          );
        })}
      {streamBtns.length < 10 && <AddButton onClick={addStreamBtn} />}
      {showInfoModal && (
        <InfoModal
          isOpen={showInfoModal}
          onClose={() => setShowInfoModal(false)}
          saveInfo={saveInfo}
        />
      )}
    </StreamDeckWrapper>
  );
}

const StreamDeckWrapper = tw.div`
  xs:p-2
  small:p-3.5 
  medium:p-4
  flex 
  gap-4 
  justify-center
  flex-wrap
`;

const AddButton = styled(StreamButton)`
  background: url(${PlusIcon}) no-repeat center/40%;
`;
