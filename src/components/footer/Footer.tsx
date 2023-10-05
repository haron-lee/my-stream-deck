import { useState } from 'react';

export default function Footer() {
  const [volume, setVolume] = useState(0);
  return (
    <>
      <input
        type='range'
        min={0}
        max={1}
        color='gray'
        step={0.02}
        value={volume}
        onChange={(event) => {
          setVolume(event.target.valueAsNumber);
        }}
      />
    </>
  );
}
