import { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
const { shell } = require('electron');
interface StreamBtnProps {
  info: { url: string; img: string };
}

export default function StreamBtn({ info }: StreamBtnProps) {
  const [isPath, setIsPath] = useState(false);

  useEffect(() => {
    const validatePath = () => {
      const http = info.url.split(':');
      console.log(http);
      if (http[0] === 'https' || http[0] === 'http') {
        setIsPath(true);
      } else {
        setIsPath(false);
      }
    };

    validatePath();
  }, [info]);

  const goToPath = () => {
    if (!isPath) {
      // window.ipcRenderer.invoke('open-application', info.url);
      window.ipcRenderer.send('open_app', `chmod +x ${info.url}`);
    } else {
      //NOTE - electron프로그램 내부에서 외부사이트 열기
      // window.open(info.url);

      //NOTE - 유저의 기본 브라우저로 외부사이트 열기 (electron 제공)
      shell.openExternal(info.url);
    }
  };

  return (
    <StreamButton onClick={goToPath}>
      <img src={info.img} alt='' />
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
  }
`;
