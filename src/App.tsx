import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import CharacterServices from "./services/characters";
import { debounce } from "lodash";
import SearchBox from "./components/SearchBox";

const App = () => {
  const [query, setQuery] = useState("");

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
      <SearchBox
        loading={loading}
        onChange={handleOnChange}
        options={data && data.characters && data.characters.results}
      />
    </div>
  );
};

export default App;
