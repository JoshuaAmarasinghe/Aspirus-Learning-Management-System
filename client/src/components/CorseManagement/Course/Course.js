import React from 'react'
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const Course = ({id,moduleId,name,description,image}) => {
  return (
    <div>
        <Card sx={{ maxWidth: 345,margin: 'auto',mt:2,padding:2,boxShadow: "10px 10px 20px #ccc" , hover:{boxShadow: "20px 20px 40px #ccc"}}}>
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