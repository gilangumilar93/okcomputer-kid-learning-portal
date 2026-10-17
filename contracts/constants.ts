export const Session = {
  cookieName: "session",
  maxAgeMs: 365 * 24 * 60 * 60 * 1000, // 1 year
};

export const Paths = {
  oauthCallback: "/api/oauth/callback",
};

export const ErrorMessages = {
  unauthenticated: "Please log in to continue.",
  insufficientRole: "You do not have permission to perform this action.",
};
