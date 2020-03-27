import * as Draw from "../../draw/index.js";
import {Animation} from "../../sprites/index.js";


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

    /**
     * Make the renderer.
     */
    constructor(parent) {
        this.parent = parent;
        this.color = "#000";
        this.animations = {};
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
        this.runAnimation();
    }

    /**
     * Run the current animation
     */
    runAnimation() {
        if (this.currentAnimation) {
            this.animations[this.currentAnimation].run(this.parent.getComponentByName("Transform"));
        }
    }

    /**
     * Set the animation to play
     * @param {string} name - name of an already created animation
     */
    setCurrentAnimation(name) {
        this.currentAnimation = name;
    }

    /**
     * Draw a solid rect
     */
    drawRect() {
        let transform = this.parent.getComponentByName("Transform");
        Draw.drawGameRect(transform.position, transform.size, this.color);
    }
}


export {SpriteRenderer}