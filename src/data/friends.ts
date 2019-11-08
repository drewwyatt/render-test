import * as faker from 'faker';
import { Dispatch, useCallback, useEffect, useReducer } from 'react';

type Maybe<T> = T | undefined;

export type Friend = {
  id: string;
  name: string;
  img: string;
  favorite: boolean;
}

const toRandomFriend = (): Friend => ({
  id: faker.random.uuid(),
  name: [faker.name.firstName(), faker.name.lastName()].join(' '),
  img: `https://picsum.photos/id/${faker.random.number(1000)}/100/100`,
  favorite: faker.random.boolean(),
});

export const fetchFriends = (): Promise<Friend[]> => new Promise(res => {
  window.setTimeout(() => res(Array(faker.random.number(50)).fill(null).map(toRandomFriend)), 1000);
});

const setFriends = (friends: Friend[]) => ({ type: 'set_friends', friends } as const);
const toggleFavorite = (friendId: string) => ({ type: 'toggle_favorite', friendId } as const);
type Action = ReturnType<typeof setFriends | typeof toggleFavorite>

const reducer = (state: Maybe<Friend[]>, action: Action) => {
  switch(action.type) {
    case 'set_friends':
      return action.friends;
    case 'toggle_favorite':
      return state!.map(f => f.id === action.friendId ? ({ ...f, favorite: !f.favorite }) : f);
    default:
      return state;
  }
}

const useDispatch = <T, U extends (...args: any) => T>(dispatch: Dispatch<T>, cb: U) => useCallback((...args: U[]) => dispatch(cb(...args)), [cb]) as U;

export const useFriends = () => {
  const [friends, dispatch] = useReducer(reducer, undefined);
  const _setFriends = useDispatch(dispatch, setFriends);
  const _toggleFavorite = useDispatch(dispatch, toggleFavorite);

  useEffect(() => {
    fetchFriends().then(_setFriends)
  }, [])

  return [friends, _toggleFavorite] as const;
}
