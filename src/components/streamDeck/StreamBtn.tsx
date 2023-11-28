import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
const { shell } = require('electron');

import DefaultImg from 'assets/default.jpeg';

interface StreamBtnProps {
  streamInfo: { id?: string; url: string; img: string };
  removeStreamBtn: (infoId: string) => void;
  removeAllBtns: () => void;
}

export default function StreamBtn({
  streamInfo,
  removeStreamBtn,
  removeAllBtns,
}: StreamBtnProps) {
  const [isPath, setIsPath] = useState(false);
  const [buttonId, setButtonId] = useState('');

  const showContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    window.ipcRenderer.send('show-context-menu');
    const targetElement = e.target as HTMLElement;
    const idValue = targetElement.id;
    setButtonId(idValue);
  };

  //NOTE - context menu('delete-this-button')
  useEffect(() => {
    const deleteButton = () => {
      // TODO: 여기에서 버튼 삭제 로직을 수행
      removeStreamBtn(buttonId);
    };

    window.ipcRenderer.on('delete-this-button', deleteButton);
    window.ipcRenderer.on('delete-all-buttons', removeAllBtns);

    // 컴포넌트 언마운트 시에 이벤트 리스너 해제
    return () => {
      window.ipcRenderer.removeListener('delete-this-button', deleteButton);
      window.ipcRenderer.removeListener('delete-all-buttons', removeAllBtns);
    };
  }, [buttonId]);

  useEffect(() => {
    const validatePath = () => {
      const http = streamInfo.url.split(':');
      if (http[0] === 'https' || http[0] === 'http') {
        setIsPath(true);
      } else {
        setIsPath(false);
      }
    };

    validatePath();
  }, [streamInfo]);

  const goToPath = () => {
    if (!isPath) {
      //NOTE - 응용프로그램 열기 (electron 제공)
      if (streamInfo.url) {
        shell.openPath(streamInfo.url);
      } else {
        alert('경로에 문제가 있습니다. 삭제 후 다시 시도해주세요');
      }
    } else {
      //NOTE - electron프로그램 내부에서 외부사이트 열기
      // window.open(streamInfo.url);

      //NOTE - 유저의 기본 브라우저로 외부사이트 열기 (electron 제공)
      shell.openExternal(streamInfo.url);
    }
  };

  return (
    <StreamButton onClick={goToPath} onContextMenu={showContextMenu}>
      <img
        src={streamInfo.img || DefaultImg}
        alt='버튼 이미지'
        id={streamInfo.id}
      />
    </StreamButton>
  );
}

export const StreamButton = styled.button`
  ${tw`
    small:w-16
    small:h-16 
    medium:w-20
    medium:h-20
    border 
    border-slate-200
    dark:border-neutral-700
    rounded-xl
    shadow-stream-inner 
    overflow-hidden
`}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
`;
