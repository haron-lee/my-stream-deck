import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

type LayoutProps = {
  children: React.ReactNode;
  $opacityCtrl: number;
};

export default function Layout({ children, $opacityCtrl }: LayoutProps) {
  return <SLayout $opacityCtrl={$opacityCtrl}>{children}</SLayout>;
}

const SLayout = styled.div<LayoutProps>`
  ${tw`bg-slate-50 dark:bg-bg h-screen`}
  opacity: ${(p) => p.$opacityCtrl};
`;
