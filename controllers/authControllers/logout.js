const logout = (_, res, next) => {
  try {
    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    };
    return res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .status(200)
      .json({ message: "user logged out" });
  } catch (error) {
    next(error);
  }
};
export default logout;
