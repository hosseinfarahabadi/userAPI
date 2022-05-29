import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useUserState } from './UserProvider';

export default function PersonCard({
  personId,
  personImg,
  PersonFirst,
  PersonLast,
  PersonEmail,
}) {
  const { setUsers, users } = useUserState();
  const deletPersonBtn = (personId) => {
    const newUser = [...users];
    const filterUser = newUser.filter((user) => user.id !== personId);
    setUsers(filterUser);
  };
  return (
    <Card sx={{ maxWidth: 350, mb: 2, mt: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={personImg}
        alt={PersonFirst}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {PersonFirst} {PersonLast}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {PersonEmail}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => deletPersonBtn(personId)} size="small">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
