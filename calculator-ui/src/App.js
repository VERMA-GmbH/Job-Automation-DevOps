import "./App.css";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import DenseTable from "./DenseTable";

const theme = createTheme();
const API_URL = "/api/repayment/calculator";

function App() {
  const [calculatorState, setCalculatorState] = React.useState({
    errorMsg: undefined,
  });
  const loadRepaymentSchedule = (principle, interest, repayment, tenure) => {
    const request = {
      principle: principle,
      interest: interest,
      repayment: repayment,
      tenureInMonths: tenure,
    };
    console.log(request);
    axios
      .post(API_URL, request)
      .then((res) => {
        if (res.data) {
          setCalculatorState({
            ...calculatorState,
            errorMsg: undefined,
            data: res.data,
          });
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setCalculatorState({
          ...calculatorState,
          errorMsg: err.response.data.message,
        });
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const principle = data.get("principle");
    const interest = data.get("interest");
    const repayment = data.get("repayment");
    const tenure = data.get("tenure");
    let hasErrors = false;
    if (!principle) {
      setCalculatorState({
        ...calculatorState,
        errorMsg: "Principle is required!",
        data: undefined,
      });
      hasErrors = true;
    }
    if (!interest) {
      setCalculatorState({
        ...calculatorState,
        errorMsg: "Interest Rate is required!",
        data: undefined,
      });
      hasErrors = true;
    } else if (Number(interest) > 0 && Number(interest) % 2 !== 0) {
      setCalculatorState({
        ...calculatorState,
        errorMsg: "Interest Rate should be even!",
        data: undefined,
      });
      hasErrors = true;
    }
    if (repayment && tenure) {
      setCalculatorState({
        ...calculatorState,
        errorMsg: "Either Repayment or Tenure is accepted.",
        data: undefined,
      });
      hasErrors = true;
    }

    if (!hasErrors) {
      setCalculatorState({
        ...calculatorState,
        errorMsg: undefined,
      });
      loadRepaymentSchedule(
        parseFloat(principle).toFixed(2),
        parseInt(interest),
        repayment ? parseFloat(repayment).toFixed(2) : 0,
        parseInt(tenure)
      );
    }
  };
  const rx_live = /^((?!0)\d{0,10}|0|\.\d{1,2})($|\.$|\.\d{0,2}$)/;
  const onPrincipleChangeHadler = (event) => {
    const amount = event.target.value;
    if (rx_live.test(amount)) {
      setCalculatorState({ ...calculatorState, principle: amount });
    }
  };

  const onRepaymentChangeHadler = (event) => {
    const amount = event.target.value;
    if (rx_live.test(amount)) {
      setCalculatorState({ ...calculatorState, repayment: amount });
    }
  };
  const onInterestChangeHadler = (event) => {
    const amount = event.target.value;
    if (rx_live.test(amount)) {
      setCalculatorState({ ...calculatorState, interest: amount });
    }
  };
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Calculator
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                required
                margin="normal"
                fullWidth
                name="principle"
                label="Principle"
                id="principle"
                type="number"
                onKeyPress={(event) => {
                  if (
                    event?.key === "-" ||
                    event?.key === "+" ||
                    event?.key === "e"
                  ) {
                    event.preventDefault();
                  }
                }}
                value={calculatorState.principle}
                onChange={(event) => onPrincipleChangeHadler(event)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="interest"
                label="Interest Rate"
                id="interest"
                type="number"
                value={calculatorState.interest}
                onChange={(event) => {
                  onInterestChangeHadler(event);
                }}
                onKeyPress={(event) => {
                  if (
                    event?.key === "-" ||
                    event?.key === "+" ||
                    event?.key === "e"
                  ) {
                    event.preventDefault();
                  }
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="repayment"
                label="Repayment"
                type="number"
                id="repayment"
                onKeyPress={(event) => {
                  if (
                    event?.key === "-" ||
                    event?.key === "+" ||
                    event?.key === "e"
                  ) {
                    event.preventDefault();
                  }
                }}
                value={calculatorState.repayment}
                onChange={(event) => onRepaymentChangeHadler(event)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="tenure"
                label="Tenure in Months"
                id="tenure"
                type="number"
                onKeyPress={(event) => {
                  if (
                    event?.key === "-" ||
                    event?.key === "+" ||
                    event?.key === "." ||
                    event?.key === "e"
                  ) {
                    event.preventDefault();
                  }
                }}
                onChange={(event) => {
                  setCalculatorState({
                    ...calculatorState,
                    tenure: event.target.value,
                  });
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                Calculate
              </Button>{" "}
              <Button
                type="reset"
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                onClick={() => setCalculatorState({})}
              >
                Reset
              </Button>
            </Box>
          </Box>
          {calculatorState.errorMsg && (
            <p style={{ color: "red" }}>{calculatorState.errorMsg}</p>
          )}
        </Container>
        <Container component="main" maxWidth="md">
          {calculatorState.data && <DenseTable data={calculatorState.data} />}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
