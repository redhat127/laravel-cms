export type UsersTable = {
  id: string;
  name: string;
  username: string;
  username_changed_at: string | null;
  email: string;
  email_verified_at: string | null;
  email_changed_at: string | null;
  password_changed_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  avatar: string | null;
  deleted_at: string | null;
};

export type SharedInertiaCurrentUserProp = {
  current_user: {
    data: Pick<
      UsersTable,
      | 'id'
      | 'name'
      | 'username'
      | 'username_changed_at'
      | 'email'
      | 'email_verified_at'
      | 'email_changed_at'
      | 'password_changed_at'
      | 'created_at'
      | 'updated_at'
      | 'avatar'
    >;
  } | null;
};

export type FlashMessage = {
  flash_message: {
    type: 'error' | 'success';
    text: string;
  };
};
