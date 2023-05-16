import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import DialogTitle from "@mui/material/DialogTitle";
import ImageUploadForm from "./ImageUpload";
import CaptionForm from "./CaptionForm";
import PreviewImage from "./PreviewImage";
import axios from "axios";
const steps = ["Choose photo to upload", "Create caption for photo"];

const id_user = localStorage.getItem("id_user");

export default function PostModal({ openModal, setOpenModal }) {
  const [activeStep, setActiveStep] = useState(0);
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const createPost = async () => {
    try {
      const formData = new FormData();
      const { lastModified, name, type } = selectedImage;
      const file = new File([selectedImage], name, { lastModified, type });

      formData.append("image", file);
      formData.append("caption", caption);
      formData.append("id_user", id_user); //// THIS ID USER STILL HARCODED

      const response = await axios.post(
        "http://localhost:8000/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <Dialog
        fullWidth
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Post a story"}</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              return (
                <Step key={`${label}-${index}`}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === 0 && (
            <ImageUploadForm
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          )}
          {activeStep === 1 && (
            <CaptionForm caption={caption} setCaption={setCaption} />
          )}
          {activeStep === 2 && (
            <PreviewImage caption={caption} selectedImage={selectedImage} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={activeStep === 0 ? handleClose : handleBack}>
            {activeStep === 0 ? "Close" : "Back"}
          </Button>
          <Button
            onClick={activeStep === 2 ? createPost : handleNext}
            autoFocus
          >
            {activeStep === 2 ? "Upload" : "Next"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
