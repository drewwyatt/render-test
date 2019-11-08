import React from 'react'
import { NextPage } from 'next';
import FriendProvider from '../components/FriendProvider';
import Friends from '../components/Friends';
import FriendsFromIds from '../components/FriendsFromIds';

const Home: NextPage = () => (
  <FriendProvider>
    <Friends />
    <FriendsFromIds />
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }
      fieldset {
        display: block;
        float: left;
        width: 45%;
      }
    `}</style>
  </FriendProvider>
);

export default Home
