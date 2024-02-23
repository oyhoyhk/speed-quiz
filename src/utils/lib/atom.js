import { atom } from "recoil";

export const timerState = atom({
  key: "timer",
  default: 60,
});

export const problemCountState = atom({
  key: "problemCount",
  default: 10,
});
