import * as Components from "./components/index.js";

/** 
 * SlowEngine.GameObjects.GameObject - Container for game object components.
 * By default the transform object is attached.
 */
class GameObject {

    // Attributes
    components = {};     // Attached game object components.

    /**
     * Create the game object and attach the transform component to it.
     * @hideconstructor
     */
    constructor() {
        this.addComponent(Components.Transform);
    }

    /**
     * Run all the components attached
     * calls the "run" method
     */
    runComponents() {
        for (let componentName in this.components) {
            this.getComponentByName(componentName).run();
        }
    }

    /**
     * Add a component to the object.
     * Component is initalized with the default values.
     * @param {Component} component - uninitialized component to add.
     * @returns {Component} Initalized component.
     */
    addComponent(component) {
        let initalizedComponent = new component(this);
        this.components[initalizedComponent.name] = initalizedComponent;
        return initalizedComponent;
    }

    /**
     * Get the component of type component attached to this. 
     * If the component isnt attached, return null.
     * @param {Component} component - name of component to get
     * @returns {Component} initialized component of type component attached to this.
     */
    getComponentByName(componentName) {
        if (componentName in this.components) {
            return this.components[componentName];
        } else {
            return null
        }
    }

    /**
     * Get the string representation of the object.
     * In the form "GameObject([component names])".
     * @returns {string} string represenation of object.
     */
    toString() {
        let objStr = "GameObject("
        let first = true;
        for (let key of Object.keys(this.components)) {
            if (!first) {
                objStr += ", ";
            }
            first = false;
            objStr += this.components[key].name;
        }
        return objStr + ")";
    }
}


export {GameObject};