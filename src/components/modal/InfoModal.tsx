import styled from 'styled-components';
import tw from 'twin.macro';
const { ipcRenderer } = window;
import { useState } from 'react';
import StreamBtn from '@/components/streamDeck/StreamBtn';
import { preview } from 'vite';

interface InfoModalProps {
  isOpen?: boolean | undefined;
  onClose?: () => void | undefined;
  saveInfo?: () => void | undefined;
}

export default function InfoModal({ onClose }: InfoModalProps) {
  const getProgramPath = () => {
    ipcRenderer
      .invoke('show-open-dialog')
      .then((result) => console.log(result));
  };

  return (
    <InfoModalWrapper>
      <button type='button' onClick={onClose}>
        닫기
      </button>
      <button onClick={getProgramPath}>프로그램 불러오기</button>
      <URLInput htmlFor='input-url'>
        URL
        <input type='url' id='input-url' />
      </URLInput>
      <URLInput htmlFor='input-img'>
        Image
        <input type='url' id='input-img' />
      </URLInput>
      <label htmlFor='input-img-file'>
        <input type='file' id='input-img-file' />
      </label>
      <button>저장</button>
    </InfoModalWrapper>
  );
}

const InfoModalWrapper = tw.div`
  p-4
  absolute
  left-0
  right-0 
  top-6 
  bottom-0
  bg-white
  dark:bg-bg
`;

const URLInput = styled.label`
  ${tw`
    text-neutral-500 
    text-center
    block
  `}
  input {
    ${tw`
      p-1
      text-neutral-500
      ml-4
      bg-inherit
      border-b
      border-neutral-500
    `};
  }
`;
