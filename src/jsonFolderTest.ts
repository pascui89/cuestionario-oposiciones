import * as fs from 'fs';
import * as path from 'path';
import { IQuestions } from './interfaces/IQuestions';

// Clase de prueba
class JSONFolderTest {
  private folderPath: string;

  constructor(folderPath: string) {
    this.folderPath = folderPath;
  }

  public runTests(): void {
    const fileNames = fs.readdirSync(this.folderPath);

    for (const fileName of fileNames) {
      const filePath = path.join(this.folderPath, fileName);
      const jsonData = this.readJSONFile(filePath);

      if (jsonData) {
        this.validateJSONStructure(jsonData, fileName);
      } else {
        console.error(`Error: Unable to read JSON file "${fileName}".`);
      }
    }
  }

  private readJSONFile(filePath: string): IQuestions | null {
    try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileData) as IQuestions;
    } catch (error) {
      console.error(`Error: Unable to read JSON file "${filePath}".`);
      return null;
    }
  }

  private validateJSONStructure(jsonData: IQuestions, fileName: string): void {
    const questions = jsonData.questions;

    if (questions.length !== 25) {
      console.error(`Error: Invalid number of questions in "${fileName}". Expected 25 questions, found ${questions.length}.`);
    } else {
      for (const question of questions) {
        if (!question.question || question.question.trim() === '') {
          console.error(`Error: Invalid question in ${question.question.split('.-')[0]} - "${fileName}". Question text is null or empty.`);
        }

        if (question.options.length !== 4) {
          console.error(`Error: Invalid number of options in ${question.question.split('.-')[0]} - "${fileName}". Expected 4 options, found ${question.options.length}.`);
        }
      }
    }
  }
}

// Uso de la clase de prueba
const folderPath = '../public/data'; // Reemplaza con la ruta de la carpeta que contiene los archivos JSON
const test = new JSONFolderTest(folderPath);
test.runTests();
