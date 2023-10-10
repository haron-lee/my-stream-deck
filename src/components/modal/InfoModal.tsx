import styled from 'styled-components';
import tw from 'twin.macro';

export default function InfoModal() {
  return (
    <InfoModalWrapper>
      <URLInput htmlFor='input-url'>
        URL
        <input type='url' id='input-url' />
      </URLInput>
      <URLInput htmlFor='input-img'>
        Image
        <input type='url' name='' id='input-img' />
      </URLInput>
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
  bg-bg
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
