/**
 * We record all sprites so the areSpritesLoaded function can exist.
 */


 // Array to store all the game sprites
 // sprite sheets add themselves to this list
let allSprites = [];


/**
 * Are all the sprites in allSprites loaded?
 * @returns {Boolean} whether all sprites are loaded
 */
 function areSpritesLoaded(){
    let loaded = true;
    for (let sheet of allSprites) {
        if (!sheet.isLoaded()) {
            loaded = false;
            break
        }
    }
    return loaded;
 }


export {allSprites, areSpritesLoaded};
