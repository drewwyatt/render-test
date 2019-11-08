import React, { Dispatch, FC, createContext, useCallback, useContext, useEffect, useReducer} from 'react';
import { Action, State, friendsReducer, fetchFriends, setFriends, toggleFavorite } from '../data/friends';
import { isPending, pending } from '../data/result';

const FriendContext = createContext<[State, Dispatch<Action>]>(undefined);

const FriendProvider: FC = ({ children }) => (
  <FriendContext.Provider value={useReducer(friendsReducer, pending)}>
    {children}
  </FriendContext.Provider>
);

const useDispatch = <T, U extends (...args: any) => T>(dispatch: Dispatch<T>, cb: U) => useCallback((...args: U[]) => dispatch(cb(...args)), [cb]) as U;

export const useFriends = () => {
  const [friends, dispatch] = useContext(FriendContext);
  const _setFriends = useDispatch(dispatch, setFriends);
  const _toggleFavorite = useDispatch(dispatch, toggleFavorite);

  useEffect(() => {
    if (isPending(friends)) {
      fetchFriends().then(_setFriends)
    }
  }, [])

  return [friends, _toggleFavorite] as const;
}

export default FriendProvider;
