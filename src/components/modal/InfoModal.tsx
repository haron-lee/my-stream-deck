import styled from 'styled-components';
import tw from 'twin.macro';
// import StreamBtn from 'components/streamDeck/StreamBtn';
import CloseIcon from 'assets/icon-add.svg';
import { useState } from 'react';
import StreamBtn from '../streamDeck/StreamBtn';

interface InfoModalProps {
  isOpen?: boolean | undefined;
  onClose?: () => void | undefined;
  saveInfo?: (newBtn: JSX.Element) => void;
}

export default function InfoModal({ onClose, saveInfo }: InfoModalProps) {
  const [info, setInfo] = useState({
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
    const NewBtn: JSX.Element = <StreamBtn info={info} />;
    if (saveInfo) saveInfo(NewBtn);

    setInfo({ url: '', img: '' });
  };

  console.log(info);

  return (
    <InfoModalWrapper>
      <div tw='flex flex-col justify-center gap-4  py-6 px-10  bg-white dark:bg-bg'>
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
            tw='ml-5 px-2 rounded bg-neutral-500 text-white text-sm'
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
        {/* TODO disabled 조건 추가 */}
        <SaveBtn onClick={generateStreamBtn} tw='bg-blue-500'>
          저장
        </SaveBtn>
      </div>
    </InfoModalWrapper>
  );
}

const InfoModalWrapper = tw.div`
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
  basis-1/5
`;

const URLInput = tw.input`
  p-1
  text-neutral-500
  ml-4
  bg-inherit
  border-b
  border-neutral-500
  basis-2/4
`;

const CloseBtn = styled.button`
  ${tw`absolute top-2 right-4 w-5 h-5`}
  background:  url(${CloseIcon}) no-repeat center/23px;
  transform: rotate(45deg);
`;

const SaveBtn = tw.button`
  w-2/5
  mt-2
  py-1
  rounded
  bg-blue-500
  text-white
  self-center
  disabled:dark:bg-neutral-300
  disabled:dark:text-neutral-600
  disabled:bg-neutral-700
  disabled:bg-neutral-300
`;
