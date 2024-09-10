/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const createToken = (payload: Record<string, unknown>, secret: Secret, expireTime: string): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

const verifyResetToken = (token: string, secret: Secret): { isExpired: boolean; payload: JwtPayload | null } => {
  try {
    // This will throw an error if the token is expired or invalid
    const tokenPayload = jwt.verify(token, secret) as JwtPayload;
    return { isExpired: false, payload: tokenPayload };
  } catch (error: any) {
    // If the token has expired or is invalid, check if it's specifically an expiration error
    if (error.name === "TokenExpiredError") {
      const decodedToken = jwt.decode(token) as JwtPayload;
      return { isExpired: true, payload: decodedToken };
    }

    // For any other error, return null payload
    return { isExpired: false, payload: null };
  }
};

export const jwtHelpers = {
  createToken,
  verifyToken,
  verifyResetToken,
};
