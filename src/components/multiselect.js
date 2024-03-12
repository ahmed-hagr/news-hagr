import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({
  data,
  label,
  handleChangeData,
  selectedData,
  chipLabelRenderer = (value) => value, // Default renderer function
}) {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  useEffect(() => {
    if (selectedData) {
      setPersonName(selectedData);
    }
  }, [selectedData]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === "string" ? value.split(",") : value;
    setPersonName(newValue);
    handleChangeData(newValue);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={chipLabelRenderer(value)} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map((obj) => {
            // Assuming obj has a unique identifier for a key. Adjust as necessary.
            const value = obj.domain ? obj.domain : obj;
            return (
              <MenuItem
                key={value} // Use a unique identifier or value as the key
                value={value}
                style={getStyles(value, personName, theme)}
              >
                {value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
