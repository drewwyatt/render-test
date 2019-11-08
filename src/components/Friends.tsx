import React, { FC } from 'react'
import { isOk } from '../data/result';
import Friend from './Friend';
import { useFriends } from './FriendProvider';

const Friends: FC = () => {
  const [result, toggle] = useFriends();

  return isOk(result) ? (
    <div>{result.value.map(friend => <Friend key={friend.name} {...friend} toggleFavorite={toggle} />)}</div>
  ) : <h1>Loading...</h1>
};

export default Friends;
