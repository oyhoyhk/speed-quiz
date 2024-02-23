import { Paper, Stack } from "@mui/material";
import data from "../../db/data.json";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Stack>
      {Object.keys(data).map((item) => (
        <Item data-testid="item" key={item}>
          <Link
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              textAlign: "center",
            }}
            to={`/game/${item}`}
          >
            {item}
          </Link>
        </Item>
      ))}
    </Stack>
  );
}

const Item = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  margin: 15px;
  cursor: pointer;
  overflow: hidden;

  transition: 0.5s;
  &:hover {
    background-color: #f0f0f0;
  }
`;
