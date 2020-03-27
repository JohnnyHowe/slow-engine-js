
class Page:
    def __init__(self, name, filename, subPages):
        self.name = name
        self.filename = filename
        self.subPages = subPages
        self.parent = None
        self.setSubPageParents()

    def setSubPageParents(self):
        for subPage in self.subPages:
            subPage.parent = self

    def getParents(self):
        parents = []
        next = self.parent
        while next:
            parents.append(next)
            next = next.parent
        return list(reversed(parents))

    def getLink(self):
        return """<a href="{}">{}</a>""".format(self.getDocFilename(), self.name)

    def getDocFilename(self):
        filename = ""
        for parent in self.getParents():
            filename += parent.name + "."
        return filename + self.name + ".html"

    def makeParentChain(self):
        htmlStr = ""
        for parent in self.getParents() + [self, ]:
            htmlStr += parent.getLink() + "\n.\n"
        return htmlStr

    def makePage(self):
        pageStr = self.getMainTemplate()
        pageStr = pageStr.replace("<!-- TOPPAGELINKS -->", self.makeParentChain())
        pageStr = pageStr.replace("<!-- BODYHTML -->", self.getBody())
        self.savePage(pageStr)
        self.makeSubPages()

    def getBody(self):
        bodyHTML = ""
        for subPage in self.subPages:
            bodyHTML += subPage.getDescriptionHTML()
        return bodyHTML

    def getDescriptionHTML(self):
        parameters = []
        returns = []
        descHTML = self.getDescriptionTemplate()
        descHTML = descHTML.replace("LINK", self.getLink())
        descHTML = descHTML.replace("NAME", self.name)
        descHTML = descHTML.replace("DESCRIPTION", self.getDescriptionText())
        return descHTML

    def getDescriptionText(self):
        fileText = self.getFileContents("../slowEngine/" + self.filename)
        startIndex = fileText.find("/**")
        endIndex = fileText.find("*/")
        if startIndex > 0 and endIndex > 0:
            return fileText[startIndex + 3: endIndex]
        else: 
            return "No description found."


    def makeSubPages(self):
        for subPage in self.subPages:
            subPage.makePage()

    def savePage(self, pageStr):
        file = open(self.getDocFilename(), "w")
        file.write(pageStr)
        file.close()

    def getFileContents(self, filename):
        file = open(filename, "r")
        contents = file.read()
        file.close()
        return contents

    def getMainTemplate(self):
        return self.getFileContents("templates/index.html")

    def getDescriptionTemplate(self):
        return self.getFileContents("templates/body.html")

    def __str__(self):
        return "Page({})".format(self.name)

    def __repr__(self):
        return self.__str__()
        