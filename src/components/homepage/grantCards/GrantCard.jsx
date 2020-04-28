import React from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//contact icons...
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";

import { useStyles } from "./styles.jsx";

export default function GrantCard(props) {
  const grant = props.data;
  // console.log("GrantCard: ", grant);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            G
          </Avatar>
        }
        action={
          <div>
            <CardActions className={classes.actionTop}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
              <IconButton aria-label="direct message">
                <ChatRoundedIcon />
                {/* <EmailRoundedIcon /> */}
                {/* <LocalPostOfficeRoundedIcon /> */}
              </IconButton>
              {/* <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton> */}
            </CardActions>
            <CardActions disableSpacing>
              {/* Quick Access Buttons */}
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
          </div>
        }
        title={
          <CardContent className={classes.header}>
            <CardContent className={classes.content}>
              <Typography variant="body2" color="textSecondary" component="p">
                {grant.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {grant.detailMain}
              </Typography>
            </CardContent>
            <CardContent className={classes.info}>
              <Typography className={classes.boxes}>Timeframe</Typography>
              <Typography className={classes.boxes}>{grant.sector}</Typography>
              <Typography className={classes.boxes}>Roles</Typography>
            </CardContent>
          </CardContent>
        }
        subheader={
          <Typography variant="body2" color="textSecondary" component="p">
            {/* <CardContent className={classes.info}>
          <Typography className={classes.boxes}>Timeframe</Typography>
          <Typography className={classes.boxes}>{grant.sector}</Typography>
          <Typography className={classes.boxes}>Roles</Typography>
        </CardContent> */}
          </Typography>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* <CardMedia
        className={classes.media}
        image={grant.image}
        title={grant.title}
      /> */}
          <Typography paragraph>Grant Details:</Typography>
          {grant.detailContent.map((detail) => {
            return <Typography key={grant.title}>{detail}</Typography>;
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
}
