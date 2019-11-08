import React, { FC, useCallback } from 'react';
import { Friend } from '../data/friends';

const FriendComponent: FC<Friend & { toggleFavorite(id: string): any; }> = ({ id, name, img: src, favorite, toggleFavorite }) => (
  <fieldset>
    <legend>Friend</legend>
    <img src={src} width={50} height={50} />
    <h2>{name}</h2>
    <button onClick={useCallback(() => toggleFavorite(id), [toggleFavorite, id])}>{favorite ? '👍' : '👎'}</button>
  </fieldset>
)

export default FriendComponent;
