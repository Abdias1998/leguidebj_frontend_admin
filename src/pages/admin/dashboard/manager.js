import React from 'react'
import PropTypes from 'prop-types'
import { useAuthContext } from 'src/contexts/auth-context';
import { Box, Button, CssBaseline, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { requete } from 'src/env/requete';

export const Manager = (props) => {
  
  const authContext = useAuthContext();
  const user = authContext.user;
  const  {active} = props
  const currencies = [
    {
      value: "manager_guide",
      label: "Manager Guide",
    },
    {
      value: "manager_utilisateur",
      label: "Manager Utilisateur",
    },
    {
      value: "manager_reservation",
      label: "Manager Reservation",
    },
    {
      value: "manager_messagerie",
      label: "Manageur Messagerie",
    },
    {
      value: "manageur_contrat",
      label: "Manageur Contrat",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
  

      const data = new FormData(event.currentTarget);
      axios
        .post(`${requete.admin}/register_admin_role/${user._id}`, {
        
          email: data.get("email"),
          tel: data.get("tel"),
          password: data.get("password"),
          role: data.get("role"),
       
        })
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    
  };

  return (
 <>
{
  user.isAdminPrincipal &&  <>

    <CssBaseline />
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
    
          {/* <LockOutlinedIcon /> */}
     
        <Typography component="h1" variant="h6" textTransform="uppercase">
         {" Inscription d'admin"}
        </Typography>
        <Box
          component="form"
          autoComplete=""
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
     
        
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
        
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="tel"
            label="Numéro de téléphone"
            name="tel"
            autoComplete="tel"
            inputProps={{ maxLength: 8 }}
            autoFocus
            helperText="Mettez un numéro de téléphone sans l'indicative du pays: Ex:50000000"
           
          />
          <TextField
            fullWidth
            margin="normal"
            required
            id="role"
            select
            label="Rôle"
            defaultValue=""
            name="role"
          
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
     
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            // type="password"
            id="password"
            autoComplete="current-password"
      
            type= "password"
           
          />

       
         

          {/* <Box>
            <Box>
              <FormControlLabel label="j'accepte les conditions d'utulisation" control={<Checkbox checked={acceptTermsValue} color="secondary" onChange={(e) => setAacceptTermsValue(e.target.checked)} />} >
              </FormControlLabel>
             
            </Box>
         </Box> */}
      
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: {
                  md: "#FBB437",
                  xs: "#FBB437",
                  "&:hover": {
                    background: "#6D4826",
                  },
                },
              }}
            >
          {"    Je m'inscire"}
            </Button>
       

        </Box>
      </Box>
  
 
 
</>
}
 </>
  )
}

Manager.propTypes = {

}

