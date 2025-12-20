export const getTokenFromCookie = () => {
  if (typeof window === "undefined") return null;

  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1] ?? null
  );
};
