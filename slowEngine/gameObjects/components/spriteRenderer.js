import * as Draw from "../../draw/index.js";
// import {Animation} from "../../sprites/index.js";


/**
 * SlowEngine.GameObjects.Components.SpriteRenderer - renderer component for game objects.
 */
class SpriteRenderer {

    // Attributes
    name = "SpriteRenderer";
    parent;     // Parent game object
    color;      // Color of the sprite when rendering a solid block
    animations; // Animations dictionary
    currentAnimation;   // Current animation playing
    playbackSpeed;  // How fast to play the animation
    finishAnimation;    // Does the current animation have to finish before the next animation runs?
    nextAnimation;  // What animation is played next?

    /**
     * Make the renderer.
     */
    constructor(parent) {
        this.parent = parent;
        this.color = "#000";
        this.animations = {};
        this.playbackSpeed = 1;
        this.finishAnimation = false;
    }

    /**
     * Add an animation to the renderer
     * If another animation with the name exists it will replace it.
     * @param {string} name - identifier for animation
     * @param {Animation} animation - Animation object to attach
     */
    addAnimation(name, animation) {
        this.animations[name] = animation;
    }

    /**
     * Run the renderer
     * ADD MORE 
     */
    run() {
        this.drawRect();
        this.updateAnimation();
        this.runAnimation();
    }

    /**
     * If a current animation is set, draw it
     */
    runAnimation() {
        if (this.currentAnimation) {
            this.animations[this.currentAnimation].run(this.parent.getComponent("Transform"), this.playbackSpeed);
        }
    }

    /**
     * Update the curent animation
     * if nextAnimation is defined, set the current animation to it unless finishAnimation is true,
     * if this is the case, wait until the current is finished
     */
    updateAnimation() {
        if (this.nextAnimation) {
            if (this.finishAnimation && this.currentAnimation != undefined) {
                if (this.animations[this.currentAnimation].isFinished()) {
                    this.currentAnimation = this.nextAnimation;
                    this.nextAnimation = undefined;
                }
            } else {
                this.currentAnimation = this.nextAnimation;
                this.nextAnimation = undefined;
            }
        }
    }

    /**
     * Set the animation to play
     * @param {string} name - name of an already created animation
     */
    setNextAnimation(name) {
        this.nextAnimation = name;
    }

    /**
     * Get the name of the animation playing
     * @returns {string} animation name
     */
    getCurrentAnimationName() {
        return this.currentAnimation;

    }

    /**
     * Draw a solid rect
     */
    drawRect() {
        let transform = this.parent.getComponent("Transform");
        Draw.drawGameRect(transform.position, transform.size, this.color);
    }
}


export {SpriteRenderer}