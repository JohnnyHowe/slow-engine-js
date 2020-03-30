import SlowEngine from "../slowEngine/index.js";
import {runRightAnimation, runLeftAnimation} from "./animations/player/run.js";
import {leftIdleAnimation, rightIdleAnimation} from "./animations/player/idle.js";

let Vector = SlowEngine.Geometry.Vector;


class Player extends SlowEngine.GameObjects.GameObject {
    constructor() {
        super();
        this.getComponent("Transform").size = new Vector(12, 22).multiplied(0.15);

        let animator = this.addComponent(SlowEngine.GameObjects.Components.SpriteRenderer);
        animator.addAnimation("rightRun", runRightAnimation);
        animator.addAnimation("leftRun", runLeftAnimation);
        animator.addAnimation("leftIdle", leftIdleAnimation);
        animator.addAnimation("rightIdle", rightIdleAnimation);
        animator.setNextAnimation("rightIdle");
        animator.color = "#999";

        this.addComponent(SlowEngine.GameObjects.Components.RigidBody);
        this.acceleration = 20;
        this.controls = {
            "left":     ["a", new Vector(-1, 0)],
            "right":    ["d", new Vector(1, 0)],
            // "up":       ["w", new Vector(0, 1)],
            // "down":     ["s", new Vector(0, -1)],
        }
    }

    controlAnimation() {
        let rigibBody = this.getComponent("RigidBody");
        let idleThreshold = 2;
        if (Math.abs(rigibBody.velocity.x) > idleThreshold) {
            this.controlRunAnimation();
        } else {
            this.controlIdleAnimation();
        }
    }

    controlIdleAnimation() {
        let rigibBody = this.getComponent("RigidBody");
        let animator = this.getComponent("SpriteRenderer");
        animator.playbackSpeed = 1;
        if (rigibBody.velocity.x > 0) {
            animator.setNextAnimation("rightIdle");
        } else if (rigibBody.velocity.x < 0) {
            animator.setNextAnimation("leftIdle");
        }
    }

    controlRunAnimation() {
        let rigibBody = this.getComponent("RigidBody");
        let animator = this.getComponent("SpriteRenderer");
        animator.finishAnimation = true;
        if (rigibBody.velocity.x > 0) {
            animator.setNextAnimation("rightRun");
            animator.playbackSpeed = Math.abs(rigibBody.velocity.x * 0.15);
        } else if (rigibBody.velocity.x < 0) {
            animator.setNextAnimation("leftRun");
            animator.playbackSpeed = Math.abs(rigibBody.velocity.x * 0.15);
        }
    }

    run() {
        this.movement();
        this.controlAnimation();
        this.runComponents()
    }

    movement() {
        let rigidBody = this.getComponent("RigidBody")
        for (let name in this.controls) {
            let [key, movement] = this.controls[name];
            if (SlowEngine.Keyboard.isPressed(key)) {
                rigidBody.velocity = rigidBody.velocity.plus(movement.multiplied(this.acceleration * SlowEngine.Clock.getDeltaTime()));
            }
        }
    }
}


export {Player}