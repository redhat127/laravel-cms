export type UsersTable = {
  id: string;
  name: string;
  username: string;
  email: string;
  email_verified_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type SharedInertiaCurrentUserProp = {
  current_user: { data: Pick<UsersTable, 'id' | 'name' | 'username' | 'email' | 'email_verified_at' | 'created_at' | 'updated_at'> } | null;
};

export type FlashMessage = {
  flash_message: {
    type: 'error' | 'success';
    text: string;
  };
};
