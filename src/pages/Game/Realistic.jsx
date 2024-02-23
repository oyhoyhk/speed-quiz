// Realistic.tsx

import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Icon } from "../../header/Mode";
import ReactCanvasConfetti from "../ReactCanvasConfetti";

export default class Realistic extends Component {
  constructor(props = {}) {
    super(props);
    this.isAnimationEnabled = false;
    this.fire = this.fire.bind(this);
  }

  makeShot(particleRatio, opts) {
    this.animationInstance &&
      this.animationInstance({
        ...opts,
        origin: { y: 0.8 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }

  // 이 부분에서 사용하고 싶은 설정을 하면 된다.
  fire() {
    this.makeShot(0.25, {
      spread: 25,
      startVelocity: 55,
    });
  }

  handlerFire = () => {
    if (!this.isAnimationEnabled) {
      this.isAnimationEnabled = true;
    }
    requestAnimationFrame(this.fire);
    this.fire();
  };

  getInstance = (instance) => {
    this.animationInstance = instance;
  };

  render() {
    return (
      <>
        <Icon mode="fire" onClick={this.handlerFire}>
          <FontAwesomeIcon icon={faFire} />
        </Icon>
        <ReactCanvasConfetti
          refConfetti={this.getInstance}
          className="canvas"
        />
      </>
    );
  }
}
