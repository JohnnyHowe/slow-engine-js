import SlowEngine from "../slowEngine/index.js";
import {runRightAnimation, runLeftAnimation} from "./animations/player/runRight.js";
import { Vector } from "../slowEngine/geometry/index.js";


class Player extends SlowEngine.GameObjects.GameObject {
    constructor() {
        super();
        let animator = this.addComponent(SlowEngine.GameObjects.Components.SpriteRenderer);
        animator.addAnimation("runRight", runRightAnimation);
        animator.addAnimation("runLeft", runLeftAnimation);
        animator.setCurrentAnimation("runLeft");

        this.addComponent(SlowEngine.GameObjects.Components.RigidBody);
        this.acceleration = 10;
        this.controls = {
            "left":     ["a", new Vector(-1, 0)],
            "right":    ["d", new Vector(1, 0)],
            "up":       ["w", new Vector(0, 1)],
            "down":     ["s", new Vector(0, -1)],
        }
    }

    controlAnimation() {
        let rigibBody = this.getComponent("RigidBody");
        let spriteRenderer = this.getComponent("SpriteRenderer");
        spriteRenderer.playbackSpeed = Math.abs(rigibBody.velocity.x * 0.2);
        if (rigibBody.velocity.x < 0) {
            spriteRenderer.setCurrentAnimation("runLeft");
        } else {
            spriteRenderer.setCurrentAnimation("runRight");
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