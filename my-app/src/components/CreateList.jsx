import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import Switch from '@mui/material/Switch';
import TrackSearch from './TrackSearch';
import NavBar from './NavBar';
import { useState } from 'react';

const theme = createTheme();

export default function CreateList() {
  const navigate = useNavigate();
  const [listName, setListName] = useState('')
  const [description, setDescription] = useState('')
  var visibility = "false";
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputData = new FormData(event.currentTarget);
    let formDataObject = Object.fromEntries(inputData.entries())
    formDataObject.visibility = visibility
    formDataObject.list_trackIDS = window.localStorage.getItem("track_IDS")
    formDataObject.email = window.localStorage.getItem("profile")
    let formDataString = JSON.stringify(formDataObject)
    console.log(formDataString);

    //When Success is true, reset localstorage saved fields for input fields
    
  };

  const clearTrackList = () => {
    window.localStorage.setItem("track_IDS", "")
    window.location.reload();
  }

  const saveName = (event) => {
    const value = event.target.value
    setListName(value)
  }

  const saveDescription = (event) => {
    const value = event.target.value
    setDescription(value)
  }

  const saveInput = (event) => {
    window.localStorage.setItem("list_title", listName)
    window.localStorage.setItem("description", description)
  }

  const handleChange = (e) => {
    let isChecked = e.target.checked;
    if(isChecked){
      visibility = "true";
      } else {
        visibility = "false"
      }
  };

  return (
    <div>
    <NavBar />
    <Grid container spacing={0}>
      <Grid item xs>
        <TrackSearch />
      </Grid>
    <Grid item xs >
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PlaylistAddRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create New List
          </Typography>
          <Grid container spacing={6} justifyContent="space-evenly" alignItems="center">
            <Grid item xs={6}>
            <Button onClick={saveInput} variant="contained">Save Input Fields</Button>
            </Grid>
            <Grid item xs={6}>
            <Button onClick={clearTrackList} variant="contained">Clear Tracks</Button>
            </Grid>
          </Grid>
          <Typography component="h1" variant="body1" paddingTop={'20px'}>
            Remember To Hit Save To Prevent Input Refreshing!
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="list_title"
                  required
                  fullWidth
                  id="list_title"
                  label="List Title"
                  autoFocus
                  onInput={saveName}
                  defaultValue={window.localStorage.getItem("list_title")}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  disabled
                  inputMode='none'
                  fullWidth
                  id="list_trackIDS"
                  label="List Track IDs"
                  name="list_trackIDS"
                  defaultValue={window.localStorage.getItem("track_IDS")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  label="Description (optional)"
                  name="description"
                  onInput={saveDescription}
                  defaultValue={window.localStorage.getItem("description")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  disabled
                  inputMode='none'
                  id="email"
                  label="Creator"
                  name="email"
                  defaultValue={window.localStorage.getItem("profile")}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel 
                control={<Checkbox />} 
                label="Public List?" 
                onChange={handleChange}
              />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create New List
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="playlists" variant="body2">
                  Return to Playlists
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </Grid>
    </Grid>
    </div>
  );
}