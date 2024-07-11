import crypto from "crypto";

export const gravatarUrlForEmail = (email) =>
  `https://www.gravatar.com/avatar/${crypto
    .createHash("md5")
    .update(email.trim().toLowerCase())
    .digest("hex")}?d=identicon&r=g`;
