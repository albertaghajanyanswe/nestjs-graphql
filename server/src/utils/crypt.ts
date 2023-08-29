import * as bcrypt from "bcrypt";
const saltRounds = 10;

/**
 * Generate a hashed string
 * @param {*} password
 */
const hash = (string: string) => {
  return bcrypt.hash(string, saltRounds).then(function (hash) {
    return hash;
  });
};

/**
 * Compare a plain text password to a hashed password
 * @param {*} string
 * @param {*} hash
 */
const compare = (string: string, hash: string) => {
  return bcrypt.compare(string, hash);
};

export { hash, compare };
