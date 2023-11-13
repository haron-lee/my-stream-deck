import tw from 'twin.macro';

export default function StreamBtn() {
  return (
    <>
      <StreamButton>
        <img src='' alt='' />
      </StreamButton>
    </>
  );
}

export const StreamButton = tw.button`
  small:w-16
  small:h-16 
  medium:w-20
  medium:h-20
  border 
  border-slate-200
  dark:border-neutral-700
  rounded-xl
  shadow-stream-inner 
`;
