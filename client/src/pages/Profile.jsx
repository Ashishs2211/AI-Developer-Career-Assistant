import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUser, FaGithub, FaLinkedin, FaTools, FaImage } from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import LoadingCard from "../components/common/LoadingCard";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../services/authService";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

   const [passwordData, setPasswordData] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const [changingPassword, setChangingPassword] =
  useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    githubUsername: "",
    linkedin: "",
    skills: "",
    profileImage: "",
  });

  /* ================= LOAD PROFILE ================= */

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getProfile();

        const user = response.data.user;

        setFormData({
          name: user.name || "",
          email: user.email || "",
          githubUsername: user.githubUsername || "",
          linkedin: user.linkedin || "",
          skills: Array.isArray(user.skills)
            ? user.skills.join(", ")
            : "",
          profileImage: user.profileImage || "",
        });

      } catch (error) {
        console.log(error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  /* ================= INPUT CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


      const handlePasswordChange = (e) => {
      const { name, value } = e.target;

      setPasswordData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  /* ================= UPDATE PROFILE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    try {
      setSaving(true);

      const response = await updateProfile({
        name: formData.name,
        githubUsername: formData.githubUsername,
        linkedin: formData.linkedin,
        skills: formData.skills,
        profileImage: formData.profileImage,
      });

      const updatedUser = response.data.user;

      setFormData({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        githubUsername:
          updatedUser.githubUsername || "",
        linkedin: updatedUser.linkedin || "",
        skills: Array.isArray(updatedUser.skills)
          ? updatedUser.skills.join(", ")
          : "",
        profileImage:
          updatedUser.profileImage || "",
      });

      toast.success(
        "Profile updated successfully!"
      );

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
  e.preventDefault();

  const {
    currentPassword,
    newPassword,
    confirmPassword,
  } = passwordData;

  if (
    !currentPassword ||
    !newPassword ||
    !confirmPassword
  ) {
    toast.error("Please fill all password fields.");
    return;
  }

  if (newPassword.length < 6) {
    toast.error(
      "New password must be at least 6 characters."
    );
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.error(
      "New password and confirm password do not match."
    );
    return;
  }

  try {
    setChangingPassword(true);

    const response = await changePassword(
      passwordData
    );

    toast.success(
      response.data.message ||
        "Password changed successfully!"
    );

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
        "Unable to change password."
    );
  } finally {
    setChangingPassword(false);
  }
};

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingCard text="Loading Profile..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="max-w-4xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 rounded-3xl shadow-2xl p-8 md:p-10 text-white mb-8">

          <h1 className="text-4xl md:text-5xl font-bold">
            👤 My Profile
          </h1>

          <p className="mt-4 text-blue-100 text-lg">
            Manage your personal information and
            developer profile.
          </p>

        </div>

        {/* ================= PROFILE CARD ================= */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 md:p-8">

          {/* Profile Image Preview */}

          <div className="flex flex-col items-center mb-10">

            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-xl">

              {formData.profileImage ? (

                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display =
                      "none";
                  }}
                />

              ) : (

                <FaUser className="text-white text-5xl" />

              )}

            </div>

            <h2 className="text-2xl font-bold mt-4 dark:text-white">
              {formData.name || "Developer"}
            </h2>

            <p className="text-gray-500">
              {formData.email}
            </p>

          </div>

          {/* ================= FORM ================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Name */}

            <div>

              <label className="block font-semibold mb-2 dark:text-white">
                <FaUser className="inline mr-2" />
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Email */}

            <div>

              <label className="block font-semibold mb-2 dark:text-white">
                Email
              </label>

              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full border rounded-xl px-4 py-3 bg-gray-100 text-gray-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-400 cursor-not-allowed"
              />

              <p className="text-xs text-gray-500 mt-2">
                Email cannot be changed from this page.
              </p>

            </div>

            {/* GitHub */}

            <div>

              <label className="block font-semibold mb-2 dark:text-white">
                <FaGithub className="inline mr-2" />
                GitHub Username
              </label>

              <input
                type="text"
                name="githubUsername"
                value={formData.githubUsername}
                onChange={handleChange}
                placeholder="e.g. Ashishs2211"
                className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* LinkedIn */}

            <div>

              <label className="block font-semibold mb-2 dark:text-white">
                <FaLinkedin className="inline mr-2 text-blue-600" />
                LinkedIn Profile
              </label>

              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/your-profile"
                className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Skills */}

            <div>

              <label className="block font-semibold mb-2 dark:text-white">
                <FaTools className="inline mr-2" />
                Skills
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Java, React, Node.js, MongoDB, DSA"
                className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <p className="text-xs text-gray-500 mt-2">
                Separate skills using commas.
              </p>

            </div>

            {/* Profile Image */}

            <div>

              <label className="block font-semibold mb-2 dark:text-white">
                <FaImage className="inline mr-2" />
                Profile Image URL
              </label>

              <input
                type="url"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                placeholder="https://example.com/profile.jpg"
                className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Save Button */}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-[1.01] transition-all text-white font-semibold py-4 rounded-xl shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >

              {saving
                ? "Saving Changes..."
                : "💾 Save Profile"}

            </button>

          </form>

          {/* ================= CHANGE PASSWORD ================= */}

<div className="mt-10 border-t dark:border-slate-700 pt-10">

  <h2 className="text-2xl font-bold dark:text-white mb-2">
    🔐 Change Password
  </h2>

  <p className="text-gray-500 mb-6">
    Update your account password securely.
  </p>

  <form
    onSubmit={handleChangePassword}
    className="space-y-5"
  >

    {/* Current Password */}

    <div>

      <label className="block font-semibold mb-2 dark:text-white">
        Current Password
      </label>

      <input
        type="password"
        name="currentPassword"
        value={passwordData.currentPassword}
        onChange={handlePasswordChange}
        placeholder="Enter current password"
        className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>

    {/* New Password */}

    <div>

      <label className="block font-semibold mb-2 dark:text-white">
        New Password
      </label>

      <input
        type="password"
        name="newPassword"
        value={passwordData.newPassword}
        onChange={handlePasswordChange}
        placeholder="Enter new password"
        className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <p className="text-xs text-gray-500 mt-2">
        Minimum 6 characters.
      </p>

    </div>

    {/* Confirm Password */}

    <div>

      <label className="block font-semibold mb-2 dark:text-white">
        Confirm New Password
      </label>

      <input
        type="password"
        name="confirmPassword"
        value={passwordData.confirmPassword}
        onChange={handlePasswordChange}
        placeholder="Confirm new password"
        className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>

    {/* Change Password Button */}

    <button
      type="submit"
      disabled={changingPassword}
      className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:scale-[1.01] transition-all text-white font-semibold py-4 rounded-xl shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
    >

      {changingPassword
        ? "Changing Password..."
        : "🔐 Change Password"}

    </button>

  </form>

</div>

        </div>

      </div>

    </DashboardLayout>
  );
}