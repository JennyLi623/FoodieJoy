import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import foodpost from "./../static/foodpost.jpeg";
import {Row, Col} from 'react-bootstrap';
import './../css/card.css';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(props);
  var commentArray = null;
  if (props.comments != undefined && props.comments[props.fidx] != undefined) {
    commentArray = props.comments[props.fidx].map((comment, idx) => (
      <Row>
      <Col xs="9">
        <Typography paragraph>
          {comment.comment}
        </Typography>
      </Col>
      <Col xs="3" onClick={() => props.addLikes(comment.id, props.fidx, idx)}>
        <p className="likes">{comment.likes} likes</p>
      </Col>
      </Row>
    ));
  }
  return (
    <Card>
      <CardHeader
        title={props.dish}
        subheader={props.place}
      />
      <img height="194" src={foodpost}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => props.likeDish(props.dishID)}>
        {props.likedDish !==undefined && props.likedDish.includes(props.dishID) &&
          <FavoriteIcon sx={{ color: red[500] }}/>
        }
        {props.likedDish ===undefined || !props.likedDish.includes(props.dishID) &&
          <FavoriteIcon disabled/>
        }
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {commentArray
          }
        </CardContent>
      </Collapse>
    </Card>
  );
}
