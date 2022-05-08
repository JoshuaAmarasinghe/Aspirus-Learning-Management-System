import React from 'react'
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { AppBar, IconButton, Toolbar } from '@mui/material';


const Content = ({id,moduleId,title,description}) => {
  return (

    




    <div>



        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    {title}
                </Typography>
                <Button><Link to={"/course/view/" + id} className="Edit"> <i class="bi bi-gear-fill" color="white" fontSize="large"></i> </Link></Button>
                </Toolbar>
            </AppBar>
            </Box>








        <Card>
            <CardContent>
                
                <br></br><br></br><br></br><br></br><br></br>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                
            <Button><Link to={"/content/view/by/" + id} className="Edit"> <i class="bi bi-gear-fill" fontSize="large"></i> </Link></Button>
            
            </CardActions>
        </Card>
    </div>
  )
}

export default Content