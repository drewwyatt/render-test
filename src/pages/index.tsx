import React from 'react'
import { NextPage } from 'next';
import FriendProvider from '../components/FriendProvider';
import Friends from '../components/Friends';

const Home: NextPage = () => (
  <FriendProvider>
    <Friends />
  </FriendProvider>
);

export default Home
