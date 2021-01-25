import { createAction, props } from '@ngrx/store';
import { User } from '../../_shared/models/user';

export const authInit = createAction(
  '[Auth] Init',
);

export const setUserData = createAction(
  '[Auth] Set User Data',
  props<{ data: User }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{data: any}>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ data: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const logoutSuccess = createAction(
  '[Auth] Logout Success'
);


