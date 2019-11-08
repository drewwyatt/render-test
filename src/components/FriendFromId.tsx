import React, { FC } from 'react';
import { useFriend } from './FriendProvider';
import { isOk } from '../data/result';

const FriendFromId: FC<{ id: string }> = ({ id }) => {
  const [{ img, name, favorite }, toggleFavorite] = useFriend(id);
  return (
    <li>
      <img src={img} width={50} height={50} />
      <h2>{name}</h2>
      <button onClick={toggleFavorite}>{favorite ? '👍' : '👎'}</button>
    </li>
  );
}

export default FriendFromId;
