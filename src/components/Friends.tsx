import React, { FC } from 'react'
import { isOk } from '../data/result';
import Friend from './Friend';
import { useFriends } from './FriendProvider';

const Friends: FC = () => {
  const [result, toggle] = useFriends();

  return (
    <fieldset>
      <legend>Friends</legend>
      {
        isOk(result)
          ?  <ul>{result.value.map(friend => <Friend key={friend.name} {...friend} toggleFavorite={toggle} />)}</ul>
          : <h1>Loading...</h1>
      }
    </fieldset>
  );
};

export default Friends;
