import React, {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import {
  CircularProgress,
  Container,
  IconButton,
  TextField,
} from "@material-ui/core";
import AutoComplete from "./AutoComplete";
import ClearIcon from "@material-ui/icons/Clear";
import { CharactersType } from "../types";

interface SearchBoxProps {
  loading: boolean;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  options?: CharactersType[];
  setCharacter: Dispatch<SetStateAction<CharactersType | undefined>>;
  query: string;
}

const SearchBox = ({
  loading,
  onChange,
  options,
  setCharacter,
  query,
}: SearchBoxProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [hoverOption, setHoverOption] = useState<number>(0);

  const selectCharacter = (character: CharactersType) => {
    setIsFocus(false);
    setCharacter(character);
  };

  return (
    <Container maxWidth="xs" fixed disableGutters>
      <TextField
        onFocus={() => setIsFocus(true)}
        onKeyDown={(e) => {
          if (e.code === "Enter" && options) setCharacter(options[hoverOption]);
          if (
            e.code === "ArrowDown" &&
            options &&
            hoverOption < options.length - 1
          )
            setHoverOption(hoverOption + 1);
          if (e.code === "ArrowUp" && options && hoverOption > 0)
            setHoverOption(hoverOption - 1);
        }}
        label="Morty search something"
        margin="normal"
        variant="outlined"
        onChange={onChange}
        fullWidth
        InputProps={{
          endAdornment: (
            <React.Fragment>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {query && isFocus ? (
                <IconButton onClick={() => setIsFocus(false)}>
                  <ClearIcon />
                </IconButton>
              ) : null}
            </React.Fragment>
          ),
        }}
      />
      {isFocus && !loading && (
        <AutoComplete
          options={options}
          hoverOption={hoverOption}
          setCharacter={selectCharacter}
        />
      )}
    </Container>
  );
};

export default SearchBox;
