import privateRequest from "../config/axios.config";

export const loginAction = async (payload: LoginPayload) =>
  privateRequest.post<{ token: string; message: string }>(
    "/auth/login",
    payload
  );

export const getProfile = async () =>
  privateRequest.get<Profile>("/admin/profile");
