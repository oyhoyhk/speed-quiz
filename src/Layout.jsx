import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import { Button, Modal, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { problemCountState, timerState } from "./utils/lib/atom";

export default function Layout() {
  const [toggle, setToggle] = useState(false);
  const pathName = useLocation();

  const [timer, setTimer] = useRecoilState(timerState);
  const [problemCount, setProblemCount] = useRecoilState(problemCountState);

  const [value, setValue] = useState({
    timer: timer,
    problemCount: problemCount,
  });

  const onChange = (e) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    if (e.target.name === "timer" && Number(e.target.value) > 300) {
      return;
    }
    if (e.target.name === "problemCount" && Number(e.target.value) > 100) {
      return;
    }
    setValue({
      ...value,
      [e.target.id]: Number(e.target.value),
    });
  };

  const onSave = () => {
    setProblemCount(value.problemCount);
    setTimer(value.timer);
    setToggle(false);
    localStorage.setItem("timer", value.timer);
    localStorage.setItem("problemCount", value.problemCount);
  };

  useEffect(() => {
    const timer = localStorage.getItem("timer");
    const problemCount = localStorage.getItem("problemCount");
    if (timer) {
      setTimer(Number(timer));
      setValue((prev) => ({ ...prev, timer: Number(timer) }));
    }
    if (problemCount) {
      setProblemCount(Number(problemCount));
      setValue((prev) => ({ ...prev, problemCount: Number(problemCount) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {pathName.pathname === "/" && (
        <Button
          variant="contained"
          sx={{
            position: "fixed",
            right: "10%",
            bottom: "10%",
            borderRadius: "50%",
            maxHeight: "40px",
            maxWidth: "40px",
            minHeight: "40px",
            minWidth: "40px",
            padding: "5px",
          }}
          onClick={() => setToggle(() => true)}
        >
          <ModeOutlinedIcon
            sx={{ width: "18px", height: "18px", margin: "10px" }}
          />
        </Button>
      )}
      <Modal
        open={toggle}
        onClose={() => setToggle(() => false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <h3 style={{ width: "100%", marginTop: 0 }}>Settings</h3>
          <InputContainer>
            <label htmlFor="timer">Timer</label>
            <TextField
              id="timer"
              onChange={onChange}
              variant="standard"
              value={value.timer}
              sx={{ width: "35%" }}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="problemCount">
              Problem
              <br /> Count
            </label>
            <TextField
              onChange={onChange}
              id="problemCount"
              variant="standard"
              sx={{ width: "35%" }}
              value={value.problemCount}
            />
          </InputContainer>
          <Button
            variant="contained"
            sx={{ width: "100%", marginTop: "15px" }}
            onClick={onSave}
          >
            Save
          </Button>
        </Container>
      </Modal>
      <Outlet />
    </div>
  );
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 15px;

  & > label {
    width: 30%;
  }

  & input {
    text-align: center;
  }
`;

const Container = styled.div`
  width: 300px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;
