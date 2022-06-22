import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styled from '@emotion/styled';
import Link from 'next/link';

const Base = styled.div`
  > div {
    height: 8000px;
  }
`;
const Home: NextPage = () => {
  return (
    <Base>
      <div>홈</div>
    </Base>
  );
};

export default Home;
