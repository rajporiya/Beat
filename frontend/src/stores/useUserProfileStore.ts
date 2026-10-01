import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface Profile {
  _id: string;
  fullName: string;
  imageUrl: string;
  email: string;
  clerkId: string;
  role: string;
  createdAt: string;
}

interface UserProfileStore {
  profile: Profile | null;
  isProfileLoading: boolean;
  isUpdating: boolean;
  isUploadingAvatar: boolean;
  error: string | null;

  fetchProfile: () => Promise<void>;
  syncProfile: (clerkData: { firstName?: string | null; lastName?: string | null; imageUrl?: string; email?: string | null }) => Promise<boolean>;
  updateProfile: (data: { fullName?: string; email?: string }) => Promise<boolean>;
  uploadAvatar: (file: File) => Promise<boolean>;
}

export const useUserProfileStore = create<UserProfileStore>((set) => ({
  profile: null,
  isProfileLoading: false,
  isUpdating: false,
  isUploadingAvatar: false,
  error: null,

  fetchProfile: async () => {
    set({ isProfileLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/user/me");
      // 204 = backend has no record for this user yet — treat as "not synced"
      set({ profile: res.status === 204 || !res.data ? null : res.data });
    } catch (error: any) {
      if (error.response?.status === 204) {
        set({ profile: null });
      } else {
        set({ error: error.response?.data?.message ?? "Failed to load profile" });
      }
    } finally {
      set({ isProfileLoading: false });
    }
  },

  // One-time sync: push Clerk profile data to the backend so the local
  // record exists (needed for users who signed in with email/password).
  syncProfile: async (clerkData: { firstName?: string | null; lastName?: string | null; imageUrl?: string; email?: string | null }) => {
    try {
      const res = await axiosInstance.post("/user/sync", {
        firstName: clerkData.firstName ?? "",
        lastName: clerkData.lastName ?? "",
        imageUrl: clerkData.imageUrl,
        email: clerkData.email ?? undefined,
      });
      set({ profile: res.data, error: null });
      return true;
    } catch {
      return false;
    }
  },

  updateProfile: async (data) => {
    set({ isUpdating: true, error: null });
    try {
      const res = await axiosInstance.patch("/user/me", data);
      set({ profile: res.data });
      return true;
    } catch (error: any) {
      set({ error: error.response?.data?.message ?? "Failed to update profile" });
      return false;
    } finally {
      set({ isUpdating: false });
    }
  },

  uploadAvatar: async (file: File) => {
    set({ isUploadingAvatar: true, error: null });
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await axiosInstance.post("/user/avatar", formData);
      set({ profile: res.data });
      return true;
    } catch (error: any) {
      set({ error: error.response?.data?.message ?? "Failed to upload avatar" });
      return false;
    } finally {
      set({ isUploadingAvatar: false });
    }
  },
}));
