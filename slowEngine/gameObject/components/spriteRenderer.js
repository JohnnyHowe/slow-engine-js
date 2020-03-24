import Draw from "../../draw/main.js";


export default class SpriteRenderer {
    // default attributes.
    name = "SpriteRenderer"
    color = "#000";
    parent;

    constructor(parent) {
        this.parent = parent;
    }

    run() {
        this.showColorBlock();
    }

    /** Show the block as a solid color rectangle. */
    showColorBlock() {
        let parentTransform = this.parent.getComponent("Transform");
        Draw.drawGameRect(parentTransform.position, parentTransform.size, this.color);
    }

    toString() {
        return "SpriteRenderer(color=" + this.color.toString() + ")";
    }
}