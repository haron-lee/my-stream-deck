import StreamBtn from '@/components/streamDeck/StreamBtn';
import tw from 'twin.macro';

type StreamDeckProps = {
  deckState: number;
};

export default function StreamDeck({ deckState }: StreamDeckProps) {
  const streamBtns = Array.from({ length: deckState }, (_, idx) => (
    <StreamBtn key={idx} />
  ));
  return <StreamDeckWrapper>{streamBtns}</StreamDeckWrapper>;
}

const StreamDeckWrapper = tw.div`
  p-4 
  flex 
  gap-5 
  justify-center
  flex-wrap
`;
