import { Feed, Home, Search, NotificationsNone } from '@mui/icons-material';
import { 
  Avatar, 
  IconButton, 
  Stack, 
  Autocomplete, 
  TextField, 
  Button,
  InputAdornment,
  useTheme,
  Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { categories } from "../provider/nodeCategories";
import { useState } from 'react';

const Navbar = ({user}:{user:any}) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [searchValue, setSearchValue] = useState<string | null>(null);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleSearch = () => {
      if (searchValue) {
        console.log("Searching for:", searchValue);
        navigate(`/search?q=${searchValue}`)
      }
    };

    return (
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{
          bgcolor: "background.paper",
          boxShadow: isSearchFocused 
            ? `0 4px 20px ${theme.palette.primary.main}20`
            : "0 2px 15px rgba(0,0,0,0.08)",
          height: "75px",
          px: { xs: 2, md: 4 },
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Left Section */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Tooltip title="View Profile">
            <Avatar
              onClick={() => navigate("/profile")}
              sx={{
                width: 45,
                height: 45,
                border: `3px solid ${theme.palette.primary.main}`,
                cursor: "pointer",
                transition: "all 0.3s ease",
                '&:hover': {
                  transform: 'scale(1.08)',
                  borderColor: theme.palette.primary.light,
                  boxShadow: `0 0 15px ${theme.palette.primary.main}40`,
                }
              }}
              alt={user?.name}
              src="/path-to-image.jpg"
            />
          </Tooltip>
        </Stack>

        {/* Center Section - Search */}
        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ 
            maxWidth: '600px',
            width: '100%',
            mx: { xs: 1, md: 4 }
          }}
        >
          <Autocomplete
            value={searchValue}
            onChange={(_, newValue) => setSearchValue(newValue)}
            options={categories}
            getOptionLabel={(option) => option || ""}
            sx={{flex:"1"}}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search categories..."
                variant="outlined"
                size="small"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                sx={{
                  width: '100%',
                  flex:"1",
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '28px',
                    bgcolor: theme.palette.grey[50],
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: theme.palette.grey[100],
                      '& fieldset': {
                        borderColor: theme.palette.primary.main,
                      }
                    },
                    '& fieldset': {
                      borderColor: theme.palette.grey[300],
                      transition: 'border-color 0.3s ease',
                    },
                    '&.Mui-focused': {
                      bgcolor: '#fff',
                      '& fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '2px',
                      },
                      boxShadow: `0 0 15px ${theme.palette.primary.main}20`,
                    }
                  }
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ 
                        color: isSearchFocused ? theme.palette.primary.main : theme.palette.grey[600],
                        transition: 'color 0.3s ease'
                      }}/>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              borderRadius: '25px',
              px: 3,
              textTransform: 'none',
              bgcolor: theme.palette.primary.main,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
                transform: 'translateY(-2px)',
                boxShadow: `0 4px 15px ${theme.palette.primary.main}40`,
              },
              '&:active': {
                transform: 'translateY(0)',
              }
            }}
          >
            Search
          </Button>
        </Stack>

        {/* Right Section */}
        <Stack 
          direction="row" 
          spacing={1}
          alignItems="center"
        >
          <Tooltip title="Home">
            <IconButton 
              onClick={() => navigate("/home")}
              sx={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: theme.palette.grey[100],
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <Home sx={{ 
                color: theme.palette.grey[700],
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: theme.palette.primary.main
                }
              }}/>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Feed">
            <IconButton 
              onClick={() => navigate("/feed")}
              sx={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: theme.palette.grey[100],
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <Feed sx={{ 
                color: theme.palette.grey[700],
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: theme.palette.primary.main
                }
              }}/>
            </IconButton>
          </Tooltip>

          {/* <Tooltip title="Notifications">
            <IconButton 
              sx={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: theme.palette.grey[100],
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsNone sx={{ 
                  color: theme.palette.grey[700],
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: theme.palette.primary.main
                  }
                }}/>
              </Badge>
            </IconButton>
          </Tooltip> */}
        </Stack>
      </Stack>
    );
};

export default Navbar;