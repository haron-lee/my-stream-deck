import { useState } from 'react';
import { AiOutlinePushpin, AiFillPushpin, AiOutlineSetting, AiFillSetting } from 'react-icons/ai';
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
    <header className='px-2 py-1 flex justify-between bg-dark-bg shadow-md'>
      <div onClick={changePinIcon} className='cursor-pointer'>
        {pinIconClicked ? <AiFillPushpin color='gray' /> : <AiOutlinePushpin color='gray' />}
      </div>
      {/*TODO buttons: S M L로 구성  */}
      <div className='text-xs'>
        <button className='text-neutral-500 font-bold mr-3'>S</button>
        <button className='text-neutral-500 font-bold mr-3'>M</button>
        <button className='text-neutral-500 font-bold'>L</button>
      </div>
      <div onClick={changeSettingIcon} className='cursor-pointer'>
        {/* TODO 컬러값만 바뀌는 걸로 수정 */}
        {settingClicked ? <AiFillSetting color='gray' /> : <AiOutlineSetting color='gray' />}
      </div>
    </header>
  );
}
