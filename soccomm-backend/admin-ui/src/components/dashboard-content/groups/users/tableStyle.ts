import { makeStyles } from "@material-ui/core/styles";
import { greyForBg } from "../../../../assets/colors";

const useStyles = makeStyles((theme) => ({
  table: {   
    backgroundColor: greyForBg,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "0.625rem 0.625rem",   
  },
  tableHeaderCell: {
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#002884",
  },
}));

export { useStyles };
