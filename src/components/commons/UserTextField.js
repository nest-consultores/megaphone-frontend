import { Grid, TextField } from "@mui/material"

const UserTextField = ({ name, disabled, label, type = "text", onChange, required, value, SelectProps, children, helperText }) => {
  console.log(type)
  return (
    <Grid item xs={12} md={6} mt={2} px={1} >
      <TextField
        fullWidth
        label={label}
        name={name}
        onChange={onChange}
        required={required}
        value={value}
        type={type}
        SelectProps={SelectProps}
        helperText={helperText}
        disabled={disabled}
      >
        {children}
      </TextField>
    </Grid>
  )
}

export default UserTextField