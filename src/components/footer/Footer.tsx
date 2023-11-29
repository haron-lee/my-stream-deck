import { ChangeEvent } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

type FooterProps = {
  $opacityCtrl: number;
  changeOpacity: (num: number) => void;
};

export default function Footer({ $opacityCtrl, changeOpacity }: FooterProps) {
  const controlOpacity = (e: ChangeEvent<HTMLInputElement>) => {
    // NOTE valueAsNumber는 input의 value값을 number 타입으로 변경해준 것
    const value = e.target.valueAsNumber;
    changeOpacity(value);
  };

  return (
    <SFooter>
      <InputRange
        type='range'
        id='opacity-range'
        min='0.2'
        max='1'
        step={0.1}
        value={$opacityCtrl}
        onChange={controlOpacity}
        $opacityZero={$opacityCtrl === 30}
      />
    </SFooter>
  );
}

const SFooter = tw.footer`
  absolute
  bottom-0
  left-0
  right-0
  px-2
  py-2
  bg-slate-200
  dark:bg-dark-bg
  box-border
  flex
  justify-end
`;

const InputRange = styled.input<{ $opacityZero?: boolean }>`
  appearance: none;
  -webkit-appearance: none;
  border-radius: 20px;

  &::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    height: 10px;
    width: 10px;
    margin-top: -2.5px;
    cursor: pointer;
    border-radius: 50%;
    background: ${(props) =>
      props.$opacityZero
        ? tw`bg-blue-200 dark:bg-[#d9d9d9]`
        : tw`bg-white dark:bg-[#e5e7eb]`};
  }

  &::-webkit-slider-runnable-track {
    height: 5px;
    background: ${(props) =>
      props.$opacityZero
        ? tw`bg-blue-200 dark:bg-[#d9d9d9]`
        : tw`bg-white dark:bg-[#e5e7eb]`};
    border-radius: 10px;
  }
`;
