import { compare, hash } from 'bcrypt';

export const encrypt = async (password) => {
  try {
    return await hash(password, 10);
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const checkPassword = async (password, hash) => {
  try {
    return await compare(password, hash);
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const checkUpdate = (data, id) => {
  const { name, lastname, username, email, password } = data;

  if (!name || !lastname || !username || !email || !id) {
    return false;
  }

  if (password && password.length < 6) {
    return false;
  }

  return true;
};
