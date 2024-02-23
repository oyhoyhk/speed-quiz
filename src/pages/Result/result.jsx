import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Result() {
  const [searchParams] = useSearchParams();
  const navigator = useNavigate();
  useEffect(() => {
    if (searchParams.size !== 2) {
      navigator("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>{searchParams.get("title")}</h1>
      <h1 style={{ marginTop: "10px" }}> {searchParams.get("answer")} 문제</h1>
      <Button
        sx={{ width: "120px", height: "45px" }}
        onClick={() => navigator("/")}
        variant="contained"
      >
        홈으로
      </Button>
      <ConfettiExplosion
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          left: "50%",
          top: "40%",
        }}
      />
    </Container>
  );
}
