import React from 'react'
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './cards.css';

const Course = ({id,moduleId,name,description,image}) => {
  return (
    <div class="main">
        <Card>
            <CardMedia
            component="img"
            height="140"
            image={image}
            alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                
            <Button><Link to={"/course/view/" + id} className="Edit"> <i class="bi bi-gear-fill" fontSize="large"></i> </Link></Button>
            <Button size="small"><Link to={"/content/view/" + moduleId} className="Edit"> Learn More </Link></Button>
            </CardActions>
        </Card>
    </div>
  )
}

export default Course