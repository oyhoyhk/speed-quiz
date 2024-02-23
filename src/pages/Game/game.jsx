/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from "react-router-dom";

import data from "../../db/data.json";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import styled from "@emotion/styled";
import Timer from "./Timer";
import { useRecoilValue } from "recoil";
import { problemCountState, timerState } from "../../utils/lib/atom";

export default function Game() {
  const problemCount = useRecoilValue(problemCountState);
  const timer = useRecoilValue(timerState);
  const pathName = useLocation();
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [move, setMove] = useState(false);
  const wrapperRef = useRef();
  const [answer, setAnswer] = useState(0);
  const [time, setTime] = useState(timer);
  const navigator = useNavigate();

  const [cur, setCur] = useState(0);

  useEffect(() => {
    const target = decodeURI(pathName.pathname.split("/")[2]);
    setTitle(target);
    setList(
      [...data[target].sort(() => Math.random() - 0.5)].slice(0, problemCount)
    );
  }, [problemCount]);

  const clickHandler = (type) => {
    if (move) return;
    if (type === "correct") {
      setAnswer((prev) => prev + 1);
    }
    if (cur + 1 === problemCount) {
      navigator(
        `/result?title=${title}&answer=${answer + (type === "correct" ? 1 : 0)}`
      );
      return;
    }
    wrapperRef.current.style.transition = "0.5s";
    setMove(() => true);
    setTimeout(() => {
      wrapperRef.current.style.transition = "0s";
      setMove(() => false);
      setCur((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    if (time === 0) {
      navigator(`/result?title=${title}&answer=${answer}`);
    }
    const id = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => {
      clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, timer]);

  useEffect(() => {
    if (cur === problemCount) {
      navigator(`/result?title=${title}&answer=${answer}`);
    }
  }, [cur]);

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Title>
        <span>{title}</span>
        <span>
          <span>남은 문제 : {problemCount - cur}</span>
          <span>Count : {answer}</span>
        </span>
      </Title>
      <Timer time={time} />
      <CardContainer>
        <Wrapper ref={wrapperRef} className={move ? "active" : ""}>
          <Card>
            <Inner>{list[cur]}</Inner>
          </Card>
          <Card>
            <Inner>{list[cur + 1]}</Inner>
          </Card>
        </Wrapper>
      </CardContainer>
      <ButtonContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={() => clickHandler("correct")}
        >
          Correct
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => clickHandler("pass")}
        >
          PASS
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const ButtonContainer = styled(Box)`
  width: 400px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > button:first-of-type {
    margin-right: 15px;
  }
  & > button {
    width: 150px;
    height: 45px;
    outline: none;
  }
  & > button:last-of-type {
    background-color: #f23b3b;
  }
`;

const Inner = styled.div`
  width: 80%;
  height: 90%;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  border: 2px solid black;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  word-break: break-all;
  box-sizing: border-box;
  padding: 0 20px;
`;

const Wrapper = styled.div`
  width: 800px;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;

  transition: 0.5s;
  &.active {
    transform: translateX(-50%);
  }
`;

const Card = styled.div`
  margin: 0;
  padding: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.div`
  width: 400px;
  height: 200px;
  overflow: hidden;
`;

const Title = styled.div`
  font-size: 2.5rem;
  display: flex;
  justify-content: space-between;
  width: 330px;
  align-items: center;

  & > span:last-of-type {
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;
