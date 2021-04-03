import React, { Fragment } from "react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import useStyles from "./useStyles";
import { CharactersType } from "../../types";

interface AutoCompleteProps {
  options?: CharactersType[];
  hoverOption: number;
  setCharacter: (character: CharactersType) => void;
}

const AutoComplete = ({
  options,
  hoverOption,
  setCharacter,
}: AutoCompleteProps) => {
  const classes = useStyles();

  const noResultsFound = () => (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar>404</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography component="span" variant="subtitle1" color="textPrimary">
            No character found.
          </Typography>
        }
        secondary={
          <Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              Try something different
            </Typography>
          </Fragment>
        }
      />
    </ListItem>
  );

  return (
    <List className={classes.list}>
      {!options && noResultsFound()}
      {options &&
        options.map((option: any, index) => (
          <Fragment key={option.id}>
            <ListItem
              alignItems="flex-start"
              button
              selected={hoverOption === index}
              onClick={(e) => {
                e.preventDefault();
                setCharacter(options[index]);
              }}
            >
              <ListItemAvatar>
                <Avatar alt={option.name} src={option.image} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="textPrimary"
                  >
                    {option.name}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {option.species}
                    </Typography>
                    {" - " + option.origin.name}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        ))}
    </List>
  );
};

export default AutoComplete;
