import React, { useEffect } from "react";
import { useState } from "react";
import { Avatar, TextField, Grid, Button } from "@mui/material";
import axios from "axios";

const id_user = localStorage.getItem("id_user");

function ProfileForm({ backHandler, fullnameInitial, bioInitial }) {
  const [bio, setBio] = useState(bioInitial);
  const [fullname, setFullname] = useState(fullnameInitial);
  const [selectedImage, setSelectedImage] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const updateUserById = async () => {
    try {
      const formData = new FormData();
      const { lastModified, name, type } = selectedImage;
      const file = new File([selectedImage], name, { lastModified, type });

      formData.append("image", file);
      formData.append("bio", bio);
      formData.append("fullname", fullname);
      const response = await axios.put(
        `http://localhost:8000/api/users/data/${id_user}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      backHandler();
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    const isBioEmpty = bio === "";
    const isFullnameEmpty = fullname === "";
    const isSelectedImageEmpty = selectedImage === null;
    setDisabled(isBioEmpty || isFullnameEmpty || isSelectedImageEmpty);
  }, [bio, fullname, selectedImage]);

  return (
    <Grid container direction="column" spacing={2}>
      {selectedImage && (
        <Grid item xs={12}>
          <Avatar
            src={URL.createObjectURL(selectedImage)}
            alt="Profile Picture"
            sx={{
              width: "100px",
              height: "100px",
              borderRadius: "8px",
              objectFit: "cover",
              marginBottom: "16px",
            }}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <input
          type="file"
          accept="image/*"
          sx={{ marginBottom: "16px" }}
          onChange={handleImageChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          name="fullname"
          label="Fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          sx={{ marginBottom: "16px" }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          name="bio"
          label="User Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          multiline
          rows={4}
          sx={{ marginBottom: "16px" }}
        />
      </Grid>
      <Grid item container alignItems="center">
        <Button
          disabled={disabled}
          sx={{ marginRight: 10 }}
          onClick={updateUserById}
          variant="contained"
          color="primary"
        >
          Save Profile
        </Button>
        <Button variant="outlined" onClick={backHandler}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}

export default ProfileForm;
