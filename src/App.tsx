import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import CharacterServices from "./services/characters";
import { debounce } from "lodash";
import SearchBox from "./components/SearchBox";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import theme from "./theme";
import { CharactersType } from "./components/types";

const App = () => {
  const [query, setQuery] = useState("");
  const [character, setCharacter] = useState<CharactersType>();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [loadCharacters, { loading, data }] = useLazyQuery(
    CharacterServices.GET_ALL_CHARS,
    {
      fetchPolicy: "network-only",
    }
  );

  const getCharacters = () => {
    loadCharacters({
      variables: {
        filter: { name: query },
      },
    });
  };

  const delayedQuery = useCallback(debounce(getCharacters, 1000), [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOnChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    delayedQuery();

    return delayedQuery.cancel;
  }, [query, delayedQuery]);

  return (
    <div>
      {character && (
        <Dialog
          fullScreen={fullScreen}
          open={!!character}
          onClose={() => setCharacter(undefined)}
          aria-labelledby="responsive-dialog-title"
        >
          <Card>
            <CardActionArea>
              <CardMedia
                style={{ height: "250px" }}
                image={character.image}
                title={character.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {character.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Hi, I am {character.name} a {character.species} from{" "}
                  {character.origin.name}, I believe I am currently{" "}
                  {character.status}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Dialog>
      )}
      <SearchBox
        loading={loading}
        query={query}
        onChange={handleOnChange}
        setCharacter={setCharacter}
        options={data && data.characters && data.characters.results}
      />
    </div>
  );
};

export default App;
