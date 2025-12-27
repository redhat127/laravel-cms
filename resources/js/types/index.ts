export type UsersTable = {
  id: string;
  name: string;
  username: string;
  email: string;
  username_changed_at: string | null;
  email_verified_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  avatar: string | null;
};

export type SharedInertiaCurrentUserProp = {
  current_user: {
    data: Pick<
      UsersTable,
      'id' | 'name' | 'username' | 'email' | 'username_changed_at' | 'email_verified_at' | 'created_at' | 'updated_at' | 'avatar'
    >;
  } | null;
};

export type FlashMessage = {
  flash_message: {
    type: 'error' | 'success';
    text: string;
  };
};
