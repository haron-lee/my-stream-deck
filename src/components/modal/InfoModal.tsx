import { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import uuid from 'react-uuid';
import CloseIcon from 'assets/icon-add.svg';
import { infoType } from '@/types/info';

interface InfoModalProps {
  isOpen?: boolean | undefined;
  onClose: () => void | undefined;
  saveInfo: (newBtn: infoType) => void;
}

export default function InfoModal({ onClose, saveInfo }: InfoModalProps) {
  const [info, setInfo] = useState({
    id: '',
    url: '',
    img: '',
  });

  const getProgramPath = () => {
    window.ipcRenderer
      .invoke('show-open-dialog')
      .then((result) => setInfo({ ...info, url: result.filePaths[0] }));
  };

  const getUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const generateStreamBtn = () => {
    const newBtnInfo = { ...info, id: uuid() };
    if (saveInfo) {
      saveInfo(newBtnInfo);
    }
    setInfo({ id: '', url: '', img: '' });
  };

  return (
    <InfoModalWrapper>
      <div tw='flex flex-col justify-center gap-1 medium:gap-4  py-2 px-10  bg-white dark:bg-bg'>
        <CloseBtn onClick={onClose} />
        <div tw='flex'>
          <Label htmlFor='input-url'>URL</Label>
          <URLInput
            type='text'
            id='input-url'
            value={info.url}
            name='url'
            onChange={getUrl}
          />
          <button
            onClick={getProgramPath}
            tw='ml-3  px-2 rounded bg-blue-400 text-white text-sm'
          >
            Import
          </button>
        </div>
        <div tw='flex'>
          <Label htmlFor='input-img'>Image</Label>
          <URLInput type='text' id='input-img' name='img' onChange={getUrl} />
        </div>
        {/* <label htmlFor='input-img-file'>
          <input type='file' id='input-img-file' />
        </label> */}
        <SaveBtn
          onClick={generateStreamBtn}
          disabled={!info.url}
          tw='bg-blue-500'
        >
          저장
        </SaveBtn>
      </div>
    </InfoModalWrapper>
  );
}

const InfoModalWrapper = tw.div`
  py-1
  absolute
  left-0
  right-0 
  top-6 
  bottom-0
`;

const Label = tw.label`
  flex
  justify-end
  items-end
  text-neutral-500 
  text-center
  text-sm
  basis-1/5
`;

const URLInput = tw.input`
  p-1
  text-neutral-400
  ml-4
  bg-inherit
  border-b
  border-neutral-300
  xs:w-10
  basis-2/4
`;

const CloseBtn = styled.button`
  ${tw`absolute top-1 xs:right-2 small:right-4 medium:right-4 w-5 h-5`}
  background:  url(${CloseIcon}) no-repeat center/23px;
  transform: rotate(45deg);
`;

const SaveBtn = tw.button`
  w-2/5
  mt-2
  xs:text-sm
  py-1
  rounded
  bg-blue-400
  text-white
  self-center
  disabled:dark:bg-neutral-700
  disabled:dark:text-neutral-500
  disabled:bg-neutral-300
  disabled:text-white
`;
