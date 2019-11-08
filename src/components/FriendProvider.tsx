import React, { Dispatch, FC, createContext, useCallback, useContext, useEffect, useMemo, useReducer} from 'react';
import { Action, State, friendsReducer, fetchFriends, setFriends, toggleFavorite, Friend } from '../data/friends';
import { isOk, isPending, ok, pending, Ok } from '../data/result';

const FriendContext = createContext<[State, Dispatch<Action>]>(undefined);

const FriendProvider: FC = ({ children }) => (
  <FriendContext.Provider value={useReducer(friendsReducer, pending)}>
    {children}
  </FriendContext.Provider>
);

const useDispatch = <T, U extends (...args: any) => T>(dispatch: Dispatch<T>, cb: U) => useCallback((...args: U[]) => dispatch(cb(...args)), [cb]) as U;

const debounce = <T extends (...args: any) => any>(func: T, wait: number, immediate: boolean) => {
	let timeout;
	const fn = (...args) => {
		const context = this;
		const later = () => {
			timeout = null;
			if (!immediate) {
        func.apply(context, args)
      };
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
      func.apply(context, args);
    }
  };

  return fn as T;
};

const makeRequst = (setter: typeof setFriends) => {
  fetchFriends().then(setter);
}

const fetchOnce = debounce(makeRequst, 250, true);

export const useFriends = () => {
  const [friends, dispatch] = useContext(FriendContext);
  const _setFriends = useDispatch(dispatch, setFriends);
  const _toggleFavorite = useDispatch(dispatch, toggleFavorite);

  useEffect(() => {
    if (isPending(friends)) {
      fetchOnce(_setFriends);
    }
  }, [])

  return [friends, _toggleFavorite] as const;
}

export const useFriendIds = () => {
  const [friends] = useFriends();
  return useMemo(() => isOk(friends) ? ok(friends.value.map(f => f.id)) : friends, [isOk(friends)]);
}

export const useFriend = (id: string) => {
  const [friends, dispatch] = useContext(FriendContext);
  const toggle = useCallback(() => dispatch(toggleFavorite(id)), [id]);
  const friend = (friends as Ok<Friend[]>).value.find(f => f.id === id);

  return useMemo(() => {
    console.log('ding');
    return [friend, toggle] as const
  }, [friend.favorite]);
}

export default FriendProvider;
