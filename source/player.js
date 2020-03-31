import SlowEngine from "../slowEngine/index.js";
import * as PlayerAnimations from "./animations/player.js";

let Vector = SlowEngine.Geometry.Vector;


class Player extends SlowEngine.GameObjects.GameObject {
    constructor() {
        super();
        this.getComponent("Transform").size = new Vector(12, 21).multiplied(0.15);

        this.player = true;

        let animator = this.addComponent(SlowEngine.GameObjects.Components.SpriteRenderer);
        animator.addAnimation("rightRun", PlayerAnimations.runRight);
        animator.addAnimation("leftRun", PlayerAnimations.runLeft);
        animator.addAnimation("leftIdle", PlayerAnimations.idleLeft);
        animator.addAnimation("rightIdle", PlayerAnimations.idleRight);
        animator.setNextAnimation("rightIdle");
        animator.color = "#999";

        this.addComponent(SlowEngine.GameObjects.Components.BoxCollider);
        this.addComponent(SlowEngine.GameObjects.Components.RigidBody);
        this.acceleration = 20;
        this.controls = {
            "left":     ["a", new Vector(-1, 0)],
            "right":    ["d", new Vector(1, 0)],
            // "up":       ["w", new Vector(0, 1)],
            // "down":     ["s", new Vector(0, -1)],
        }
    }

    /**
     * decrease the velocity by 9.8m/s^2
     */
    applyGravity() {
        this.getComponent("RigidBody").velocity.y -= 9.8 * SlowEngine.Clock.getDeltaTime();
    }

    controlAnimation() {
        let rigidBody = this.getComponent("RigidBody");
        let idleThreshold = 2;
        if (Math.abs(rigidBody.velocity.x) > idleThreshold) {
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
        } else if (animator.getCurrentAnimationName() == "rightRun") {
            animator.setNextAnimation("rightIdle");
        } else if (animator.getCurrentAnimationName() == "leftRun") {
            animator.setNextAnimation("leftIdle");
        }
    }

    controlRunAnimation() {
        let rigibBody = this.getComponent("RigidBody");
        let animator = this.getComponent("SpriteRenderer");
        animator.playbackSpeed = 1 + Math.max(0, Math.abs(rigibBody.velocity.x)) * 0.05;
        if (rigibBody.velocity.x > 0) {
            animator.setNextAnimation("rightRun");
        } else if (rigibBody.velocity.x < 0) {
            animator.setNextAnimation("leftRun");
        }
    }

    run() {
        // this.applyGravity();
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