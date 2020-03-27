from page import Page


vector = Page("Vector", "geometry/vector.js", [])
geometry = Page("Geometry", "geometry/index.js", [vector])
slowEngine = Page("SlowEngine", "index.js", [geometry])


slowEngine.makePage()