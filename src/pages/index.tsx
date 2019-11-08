import React from 'react'
import { NextPage } from 'next';
import { useFriends } from '../data/friends';
import Friend from '../components/Friend';

const Home: NextPage = () => {
  const [friends, toggle] = useFriends();

  return friends ? (
    <div>{friends.map(friend => <Friend key={friend.name} {...friend} toggleFavorite={toggle} />)}</div>
  ) : <h1>Loading...</h1>
};

export default Home
