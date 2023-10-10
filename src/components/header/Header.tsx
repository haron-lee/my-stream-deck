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
  const changePinIcon = () => {
    setPinIconClicked(!pinIconClicked);
  };
  const changeSettingIcon = () => {
    setSettingClicked(!settingClicked);
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
        <SMButton>S</SMButton>
        <SMButton>M</SMButton>
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
