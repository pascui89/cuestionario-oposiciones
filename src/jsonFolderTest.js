"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
// Clase de prueba
var JSONFolderTest = /** @class */ (function () {
    function JSONFolderTest(folderPath) {
        this.folderPath = folderPath;
    }
    JSONFolderTest.prototype.runTests = function () {
        var fileNames = fs.readdirSync(this.folderPath);
        for (var _i = 0, fileNames_1 = fileNames; _i < fileNames_1.length; _i++) {
            var fileName = fileNames_1[_i];
            var filePath = path.join(this.folderPath, fileName);
            var jsonData = this.readJSONFile(filePath);
            if (jsonData) {
                this.validateJSONStructure(jsonData, fileName);
            }
            else {
                console.error("Error: Unable to read JSON file \"".concat(fileName, "\"."));
            }
        }
    };
    JSONFolderTest.prototype.readJSONFile = function (filePath) {
        try {
            var fileData = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(fileData);
        }
        catch (error) {
            console.error("Error: Unable to read JSON file \"".concat(filePath, "\"."));
            return null;
        }
    };
    JSONFolderTest.prototype.validateJSONStructure = function (jsonData, fileName) {
        var questions = jsonData.questions;
        if (questions.length !== 25) {
            console.error("Error: Invalid number of questions in \"".concat(fileName, "\". Expected 25 questions, found ").concat(questions.length, "."));
        }
        else {
            for (var _i = 0, questions_1 = questions; _i < questions_1.length; _i++) {
                var question = questions_1[_i];
                if (!question.question || question.question.trim() === '') {
                    console.error("Error: Invalid question in ".concat(question.question.split('.-')[0], " - \"").concat(fileName, "\". Question text is null or empty."));
                }
                if (question.options.length !== 4) {
                    console.error("Error: Invalid number of options in ".concat(question.question.split('.-')[0], " - \"").concat(fileName, "\". Expected 4 options, found ").concat(question.options.length, "."));
                }
            }
        }
    };
    return JSONFolderTest;
}());
// Uso de la clase de prueba
var folderPath = '../public/data'; // Reemplaza con la ruta de la carpeta que contiene los archivos JSON
var test = new JSONFolderTest(folderPath);
test.runTests();
