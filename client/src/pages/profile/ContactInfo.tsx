import { Box, Link, Stack, Typography } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import CakeIcon from '@mui/icons-material/Cake';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

const ContactInfo = () => {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', p: 3, borderRadius: '8px' }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      CONTACT INFORMATION
    </Typography>
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <PhoneIcon sx={{ color: '#666' }} />
        <Typography>+1 123 456 7890</Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <LocationOnIcon sx={{ color: '#666' }} />
        <Typography>
          525 E 68th Street
          <br />
          New York, NY 10651-78 156-187-60
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <EmailIcon sx={{ color: '#666' }} />
        <Link href="mailto:hello@jeremyrose.com" sx={{ color: '#1976d2' }}>
          hello@jeremyrose.com
        </Link>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <LanguageIcon sx={{ color: '#666' }} />
        <Link href="https://www.jeremyrose.com" sx={{ color: '#1976d2' }}>
          www.jeremyrose.com
        </Link>
      </Stack>
    </Stack>

    <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
      BASIC INFORMATION
    </Typography>
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <CakeIcon sx={{ color: '#666' }} />
        <Typography>June 5, 1992</Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <PersonIcon sx={{ color: '#666' }} />
        <Typography>Male</Typography>
      </Stack>
    </Stack>
  </Box>
  )
}

export default ContactInfo
