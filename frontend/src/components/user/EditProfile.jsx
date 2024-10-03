import React, { useContext, useState } from "react";
import EditProfileForm from "../form/EditProfileForm";
import { useMutation } from "@tanstack/react-query";
import UserService from "../../services/user.service";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

export default function EditProfile({ profileData, setProfileData }) {
  const { setAuthData, authData } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const id = authData.id;
  const userUpdateMutation = useMutation({
    mutationFn: UserService.updateUserByUsername,
    onSuccess: (data) => {
      setAuthData(data.update_user);
      setProfileData(data.update_user);
      setIsEditing(false);
      toast.success(data.message);
      navigate(`/${data.update_user.id}`);
    },
    onError: (data) => {
      setError(data.response.data.message || data.response.statusText);
    },
  });

  const onSubmit = async (updatedUserData) => {
    await userUpdateMutation.mutateAsync({ id, updatedUserData });
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  return (
    <div data-testid="edit-profile" className="container ">
      {isEditing ? (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <EditProfileForm
            onSubmit={onSubmit}
            profileData={profileData}
            error={error}
            setError={setError}
          />
        </div>
      ) : (
        <button
          onClick={handleEditButtonClick}
          className=" min-w-[280px] md:min-w-[280px] bg-gray-300 text-gray-700 rounded px-4 py-2 hover:bg-gray-400"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}
