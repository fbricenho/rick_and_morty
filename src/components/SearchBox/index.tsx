import React, { ChangeEventHandler, useState } from "react";
import { CircularProgress, Container, TextField } from "@material-ui/core";
import AutoComplete from "./AutoComplete";
import { CharactersType } from "../types";

interface SearchBoxProps {
  loading: boolean;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  options?: CharactersType[];
}

const SearchBox = ({ loading, onChange, options }: SearchBoxProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Container maxWidth="xs" fixed disableGutters>
      <TextField
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        label="Search input"
        margin="normal"
        variant="outlined"
        onChange={onChange}
        fullWidth
        InputProps={{
          endAdornment: (
            <React.Fragment>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
            </React.Fragment>
          ),
        }}
      />
      {isFocus && <AutoComplete options={options} />}
    </Container>
  );
};

export default SearchBox;
