import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword,isSignUp}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField 
            name={name}
            onChange={handleChange}
            variant='outlined'
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password' ? {
                endAdordment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            } : null}
            helperText={
                name === 'email' ? 'Please enter a valid email (e.g., BloggedIt@gmail.com)' :''
                // name === 'password' && !half && !isSignUp ? 'Password will be at least 4 characters' :
                // name === 'password' && !half && isSignUp ? 'Password should be at least 4 characters' : ''
              }
            
        
        />
    </Grid>
  )
}

export default Input
