import React, { useRef, useState, FormEvent, useEffect } from "react";
import styles from "./VehicleUploadForm.module.scss";
import Button from "../../../common/Button/Button";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Form from "../../../common/Form/Form";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../Settings/FeeSettingForm/FeeSettingForm";
import { useDispatch, useSelector } from "react-redux";
import { uploadVehicle, fetchVehicles } from "../../../store/vehicle/actions";
import {
  VehicleStateType,
  resetVehicleUploadStore,
} from "../../../store/vehicle/reducer";
import { routes } from "../../../routing/routes";
import ProgressIndicator from "../../../common/ProgressIndicator/ProgressIndicator";
import { transformError } from "../../../utilities/errorTransform";
import { statusToast } from "../../../utilities/statusToast";

const VehicleUploadForm = () => {
  const navigate = useNavigate();
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { vehicleUploadLoading, vehicleUploadError, uploadedVehicle } =
    useSelector((state: { vehicle: VehicleStateType }) => state.vehicle);

  useEffect(() => {
    if (uploadedVehicle) {
      statusToast("Vehicle was successfully uploaded 🚙");
      dispatch(resetVehicleUploadStore());
      navigate(routes.vehicles.list);
    }
  }, [uploadedVehicle, navigate, dispatch]);

  useEffect(() => {
    if (vehicleUploadError) {
      statusToast(transformError(`${vehicleUploadError.toString()} 🚗`), true);
      setSelectedFile(null);
      dispatch(resetVehicleUploadStore());
    }
  }, [vehicleUploadError, dispatch]);

  const handleVehicleUpload = (file: File) => {
    dispatch(uploadVehicle(file));
    dispatch(fetchVehicles());
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      dispatch(resetVehicleUploadStore());
    }
  };

  const handleUploadClick = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.click();
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (selectedFile) {
      handleVehicleUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className={styles.fileField}>
        <input
          color="primary"
          type="file"
          onChange={handleFileChange}
          ref={uploadInputRef}
          accept=".jpeg,.jpg,.png"
        />
        <div className={styles.labelContainer} onClick={handleUploadClick}>
          <div className={styles.label}>
            <div className={styles.uploadFileIcon}>
              <CloudUploadOutlinedIcon />
            </div>
            <h5>Click to browse</h5>
            <p>Maximum file size is 3MB</p>
            <p>Accepted files: .jpeg,.jpg,.png</p>
          </div>
        </div>
      </div>

      {selectedFile && (
        <div className={styles.selectedFileName}>
          Selected file: {selectedFile.name}
        </div>
      )}
      {vehicleUploadLoading && <ProgressIndicator />}

      <div className={styles.uploadButtonContainer}>
        <Button
          type="submit"
          isDisabled={
            !selectedFile || vehicleUploadLoading || !!vehicleUploadError
          }
        >
          Upload Image
        </Button>
      </div>
    </Form>
  );
};

export default VehicleUploadForm;
