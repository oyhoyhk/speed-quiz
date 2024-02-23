import { Paper, Stack } from "@mui/material";
import data from "../../db/data.json";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigator = useNavigate();
  return (
    <Stack>
      {Object.keys(data).map((item) => (
        <Item
          data-testid="item"
          key={item}
          sx={{ padding: 0 }}
          onClick={() => navigator("/game/" + item)}
        >
          {item}
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
