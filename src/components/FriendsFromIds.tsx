import React, { FC } from 'react';
import { isOk } from '../data/result';
import { useFriendIds } from './FriendProvider';
import FriendFromId from './FriendFromId';

const List: FC<{ ids: string[] }> = ({ ids }) => (
  <ul>{ids.map(id => <FriendFromId key={id} id={id} />)}</ul>
);

const FriendsFromIds: FC = () => {
  const result = useFriendIds();

  return (
    <fieldset>
      <legend>Friends With Ids</legend>
      {isOk(result) ? <List ids={result.value} /> : <h1>Loading...</h1>}
    </fieldset>
  );
}

export default FriendsFromIds;
