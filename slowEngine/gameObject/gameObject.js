import GameObjects from "./main.js";
import allObjects from "./gameObjectList.js";


/** Game object
 * Used as a container for all game object components.
 * Useless alone, cool with components
 */
export default class GameObject {
    constructor() {
        this.components = {};
        this.setComponent(GameObjects.Components.Transform);
        allObjects.push(this);
    }

    /** Add a component to the game object.
     * @param {Component} Component - Uninitalized component class
     */
    setComponent(Component) {
        this.components[Component.name] = new Component(this);
    }

    /** Return the component attached to this object if it exists.
     * if it does not exist, return null.
     * @param {string} name - name of component to get.
     * @returns {GameObjects.Component} component - component requested.
     */
    getComponent(name) {
        if (name in this.components) {
            return this.components[name];
        } else {
            return null;
        }
    }

    /** Return a string in the form "GameObject([components])" 
     * where [components] is all the names of the components attached to this.
     * @returns {string} string representation of the game object.
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