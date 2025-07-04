import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container, Typography, TextField, Box, FormControl, Select, InputLabel, MenuItem, Button, CircularProgress} from '@mui/material';
import axios from 'axios';


function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try{
      const response = await axios.post("http://localhost:8080/api/email/generate", {emailContent, tone} );
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));

    }catch(error){
      setError('Failed to generate email reply. Please try again');
      console.error(error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{py:4}}>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h3" component="h1">
          Repliznen
        </Typography>
        <Typography variant="h6" color="text.secondary">
        Craft Replies That Resonates
        </Typography>
      </Box>

      <Box sx={{mx:3}}>
        <TextField 
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Original Email Content"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{mb:2}}/>

          <FormControl fullWidth sx = {{mb:2}}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
            value={tone|| ''}
            label={"Tone <optional"}
            onChange={(e) => setTone(e.target.value)}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Professional">Professional</MenuItem>
              <MenuItem value="Casual">Casual</MenuItem>
              <MenuItem value="Friendly">Friendly</MenuItem>
            </Select>
          </FormControl>
          <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth
          >
            {loading ? <CircularProgress size={24}/> : "Generate reply"}
          </Button>
      </Box>

      {error && (<Typography color='error' sx ={{mb:2}}>{error} </Typography>)}
      
      {generatedReply && (
       <Box sx={{mt:3}}>
        <Typography variant='h6' gutterBottom>Generated Reply:</Typography>
        <TextField 
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          value={generatedReply}
          inputProps={{readOnly: true}}/>

          <Button 
            variant='outlined'
            sx={{mt: 2}}
            onClick={()=> navigator.clipboard.writeText(generatedReply)}>
              copy
          </Button>
       </Box> 
      )}
    </Container>
  )
}

export default App
