import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core";
import theme from "../../../theme";

const useStyles = makeStyles(() =>
  createStyles({
    inline: {
      display: "inline",
      fontWeight: "bold",
    },
    list: {
      maxHeight: "40vh",
      overflow: "auto",
      position: "absolute",
      width: theme.spacing(55.5),
      boxShadow: theme.shadows[3],
      borderRadius: "5px",
    },
  })
);

export default useStyles;
