import { useState } from 'react';
import tw from 'twin.macro';
import {
  AiOutlinePushpin,
  AiFillPushpin,
  AiOutlineSetting,
  AiFillSetting,
} from 'react-icons/ai';
import { BsCircle, BsCircleFill } from 'react-icons/bs';
import './header.css';

export default function Header() {
  const [pinIconClicked, setPinIconClicked] = useState(false);
  const [settingClicked, setSettingClicked] = useState(false);
  const [btnState, setBtnState] = useState([true, false, false]);

  const changeButtonIcon = (index: number) => {
    const newState = Array(3).fill(false); // 초기에 모든 값을 false로 초기화
    newState[index] = true; // 클릭된 버튼의 인덱스만 true로 설정
    setBtnState(newState);
  };

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

  const changeXSwindowSize = () => {
    window.ipcRenderer.send('resize-xs');
    changeButtonIcon(0);
  };

  const changeSmallWindowSize = () => {
    window.ipcRenderer.send('resize-small');
    changeButtonIcon(1);
  };

  const changeMediumWindowSize = () => {
    window.ipcRenderer.send('resize-medium');
    changeButtonIcon(2);
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
      <div tw='text-xs'>
        <SizeButton onClick={changeXSwindowSize}>
          {btnState[0] ? (
            <BsCircleFill size='9' color='gray' />
          ) : (
            <BsCircle size='9' />
          )}
        </SizeButton>
        <SizeButton onClick={changeSmallWindowSize}>
          {btnState[1] ? (
            <BsCircleFill size='9' color='gray' />
          ) : (
            <BsCircle size='9' />
          )}
        </SizeButton>
        <SizeButton onClick={changeMediumWindowSize}>
          {btnState[2] ? (
            <BsCircleFill size='9' color='gray' />
          ) : (
            <BsCircle size='9' />
          )}
        </SizeButton>
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
  bg-slate-200
  dark:bg-dark-bg
  shadow-md
  box-border
`;

const SizeButton = tw.button`
  text-neutral-500 
  font-bold 
  mr-3
  align-middle
`;
