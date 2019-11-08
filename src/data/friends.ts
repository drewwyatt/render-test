import * as faker from 'faker';
import { Maybe, PendingResult, pending, ok, isOk } from './result';

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

let TIMER: number;
export const fetchFriends = (): Promise<Friend[]> => new Promise((res, rej) => {
  if (!TIMER) {
    TIMER = window.setTimeout(() => res(Array(faker.random.number(50)).fill(null).map(toRandomFriend)), 1000);
  } else {
    rej(); // already fetching...
  }
});

export const setFriends = (friends: Friend[]) => ({ type: 'set_friends', friends } as const);
export const toggleFavorite = (friendId: string) => ({ type: 'toggle_favorite', friendId } as const);

export const friendsReducer = (state: PendingResult<Friend[], unknown> = pending, action: Action) => {
  switch(action.type) {
    case 'set_friends':
      return ok(action.friends);
    case 'toggle_favorite':
      return isOk(state) ? ok(state.value.map(f => f.id === action.friendId ? ({ ...f, favorite: !f.favorite }) : f)) : state;
    default:
      return state;
  }
}

export type Action = ReturnType<typeof setFriends | typeof toggleFavorite>;
export type State = ReturnType<typeof friendsReducer>;
