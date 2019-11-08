export type Maybe<T> = T | undefined;

export enum Kind {
  Ok = 'RESULT_TAG_OK',
  TError = 'RESULT_TAG_ERROR',
  Pending = 'PENDING_KIND',
}

export type Ok<T> = {
  type: Kind.Ok;
  value: T;
};

export type TError<T> = {
  type: Kind.TError;
  value: T;
};

export type Pending = {
  type: Kind.Pending;
};

export type Result<T, E> = Ok<T> | TError<E>;
export type PendingResult<T, E> = Pending | Result<T, E>;

/**
 * Constructors
 */
export const ok = <T>(value: T): Ok<T> => ({
  type: Kind.Ok as Kind.Ok,
  value,
});

export const error = <E>(value: E): TError<E> => ({
  type: Kind.TError as Kind.TError,
  value,
});

export const pending = {
  type: Kind.Pending as Kind.Pending,
};

export const isOk = <T, U>(state: Maybe<PendingResult<T, U>>): state is Ok<T> =>
  state && state.type === Kind.Ok;

export const isError = <T, U>(state: PendingResult<T, U>): state is TError<U> =>
  state.type === Kind.TError;

export const isPending = <T, E>(state: PendingResult<T, E>): state is Pending =>
  state === pending;
