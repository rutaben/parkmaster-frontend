import React, { useState, useEffect, useCallback } from "react";
import styles from "./FeeSettingForm.module.scss";
import Button from "../../../common/Button/Button";
import Form from "../../../common/Form/Form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { FeeSettingStateType } from "../../../store/feeSetting/reducer";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../store/store";
import {
  fetchFeeSettings,
  updateFeeSetting,
} from "../../../store/feeSetting/actions";
import { VehicleType } from "../../../domain/Vehicle";
import { Weekday } from "../../../domain/Weekday";
import { FeeSetting } from "../../../domain/FeeSetting";
import { Input, useInputValidation } from "../../../hooks/useInputValidation";
import { statusToast } from "../../../utilities/statusToast";
import { transformError } from "../../../utilities/errorTransform";

export type AppDispatch = typeof store.dispatch;

const FeeSettingForm = () => {
  const [vehicleType, setVehicleType] = useState<string>("");
  const [weekday, setWeekday] = useState<string>("");
  const [selectedFeeSetting, setSelectedFeeSetting] =
    useState<FeeSetting | null>(null);
  const [rate, setRate] = useState<string>("");

  const { feeSettings, feeSettingsLoading } = useSelector(
    (state: { feeSetting: FeeSettingStateType }) => state.feeSetting
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFeeSettings());
  }, [dispatch]);

  const initialInputs: Input[] = [
    {
      name: "feeRate",
      label: "Current fee rate",
      type: "text",
      value: rate,
      error: null,
      disabled: true,
    },
    {
      name: "newFeeRate",
      label: "New fee rate",
      type: "text",
      value: "",
      validations: [
        (value) =>
          !isNaN(Number(value)) ? undefined : "Fee rate must be numeric value",
        (value) => (value.length <= 5 ? undefined : "Fee rate is too high"),
      ],
      error: null,
    },
  ];

  const { inputs, handleOnInputChange, resetInputValue } =
    useInputValidation(initialInputs);

  const setFeeSetting = useCallback(() => {
    if (!feeSettings) {
      return;
    }

    const selectedFeeSetting = feeSettings.find(
      (setting) =>
        setting.vehicleType === vehicleType && setting.weekday === weekday
    );

    if (selectedFeeSetting) {
      setRate(selectedFeeSetting.feeRate);
      setSelectedFeeSetting(selectedFeeSetting);
    }
  }, [feeSettings, vehicleType, weekday]);

  const handleVehicleTypeChange = (event: SelectChangeEvent) => {
    setVehicleType(event.target.value);
  };

  const handleWeekdayChange = (event: SelectChangeEvent) => {
    setWeekday(event.target.value);
    setFeeSetting();
  };

  useEffect(() => {
    setFeeSetting();
  }, [setFeeSetting]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFeeSetting || (selectedFeeSetting && !selectedFeeSetting.id)) {
      return;
    }

    const hasErrors = inputs.some((input) => !!input.error);

    if (!hasErrors && inputs[1].value.length > 0) {
      const newFeeRate = {
        id: selectedFeeSetting && selectedFeeSetting.id,
        feeRate: inputs[1].value,
      };

      try {
        await dispatch(updateFeeSetting(newFeeRate));
        statusToast("Fee rate was successfully updated 🚙");
        setRate(newFeeRate.feeRate);
        resetInputValue("newFeeRate");
      } catch (error: any) {
        statusToast(transformError(`${error.toString()} 🚗`));
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className={styles.selectionsContainer}>
        <FormControl>
          <InputLabel id="label-type">Select vehicle type</InputLabel>
          <Select
            id="select-type"
            value={vehicleType}
            onChange={handleVehicleTypeChange}
            label="Select vehicle type"
          >
            <MenuItem value={VehicleType.Motorcycle}>Motorcycle</MenuItem>
            <MenuItem value={VehicleType.Car}>Car</MenuItem>
            <MenuItem value={VehicleType.BusOrTruck}>Bus/Truck</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="label-weekday">Select weekday</InputLabel>
          <Select
            id="select-weekday"
            value={weekday}
            onChange={handleWeekdayChange}
            label="Select weekday"
          >
            <MenuItem value={Weekday.MondayToThursday}>
              Monday-Thursday (8am-5pm)
            </MenuItem>
            <MenuItem value={Weekday.Friday}>Friday (8am-8pm)</MenuItem>
            <MenuItem value={Weekday.Saturday}>Saturday (Whole day)</MenuItem>
            <MenuItem value={Weekday.Sunday}>Sunday (Whole day)</MenuItem>
          </Select>
        </FormControl>

        {inputs.map((input) => (
          <TextField
            name={input.name}
            key={input.name}
            onChange={handleOnInputChange}
            value={input.disabled ? rate : input.value}
            label={input.label}
            error={!!input.error}
            helperText={input.error}
            type={input.type}
            disabled={input?.disabled}
          />
        ))}
      </div>
      <div className={styles.confirmationButtonContainer}>
        <Button
          type="submit"
          isDisabled={!vehicleType || !weekday || feeSettingsLoading}
        >
          Save Fee Rate
        </Button>
      </div>
    </Form>
  );
};

export default FeeSettingForm;
