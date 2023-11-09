import { useState } from 'react';
import tw from 'twin.macro';
import {
  AiOutlinePushpin,
  AiFillPushpin,
  AiOutlineSetting,
  AiFillSetting,
} from 'react-icons/ai';
import './header.css';

export default function Header() {
  const [pinIconClicked, setPinIconClicked] = useState(false);
  const [settingClicked, setSettingClicked] = useState(false);

  window.ipcRenderer.send('get-window-state');
  window.ipcRenderer.on('window-state', (_, state) => {
    setPinIconClicked(state);
  });

  const changePinIcon = () => {
    if (!pinIconClicked) {
      setPinIconClicked(true);
      window.ipcRenderer.send('onTop');
    } else {
      setPinIconClicked(false);
      window.ipcRenderer.send('noTop');
    }
  };

  // TODO 세팅기능 추가하기
  const changeSettingIcon = () => {
    setSettingClicked(!settingClicked);
  };

  const changeSmallWindowSize = () => {
    window.ipcRenderer.send('resize-small');
  };

  const changeMediumWindowSize = () => {
    window.ipcRenderer.send('resize-medium');
  };

  return (
    <SHeader>
      <div onClick={changePinIcon} tw='cursor-pointer'>
        {pinIconClicked ? (
          <AiFillPushpin color='gray' />
        ) : (
          <AiOutlinePushpin color='gray' />
        )}
      </div>
      {/*TODO buttons: S M L로 구성  */}
      <div tw='text-xs'>
        <SMButton onClick={changeSmallWindowSize}>S</SMButton>
        <SMButton onClick={changeMediumWindowSize}>M</SMButton>
        <SizeButton>L</SizeButton>
      </div>
      <div onClick={changeSettingIcon} tw='cursor-pointer'>
        {/* TODO 컬러값만 바뀌는 걸로 수정 */}
        {settingClicked ? (
          <AiFillSetting color='gray' />
        ) : (
          <AiOutlineSetting color='gray' />
        )}
      </div>
    </SHeader>
  );
}

const SHeader = tw.header`
  px-2
  py-1
  flex
  justify-between
  bg-dark-bg
  shadow-md
  box-border
`;

const SizeButton = tw.button`
  text-neutral-500 
  font-bold 
`;

const SMButton = tw(SizeButton)`
  mr-3
`;
