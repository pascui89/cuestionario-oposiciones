import os
import re
import json

def parse_text(text):
    questions = []
    question_blocks = re.findall(r"\d+\.- .*?(?=\d+\.-|\Z)", text, flags=re.DOTALL)
    
    for block in question_blocks:
        question_match = re.match(r"(\d+\.- .*?)(?=\n)", block)
        question_text = question_match.group(1).strip()
        options = re.findall(r"([A-Z]\.- .*?)(?=\n|$)", block)
        
        question = {
            "question": question_text,
            "options": options
        }
        questions.append(question)
    
    return {
        "questions": questions
    }

# Obtiene la lista de archivos en el directorio actual con la extensión .txt
file_list = [filename for filename in os.listdir('.') if filename.endswith('.txt')]

# Recorre cada archivo de la lista
for filename in file_list:
    try:
        lines = ""
        with open(filename, 'r') as file:
            lines = file.readlines()

        parsed_data = parse_text(' '.join(lines))

        # Crea un diccionario para el archivo JSON
        json_data = json.dumps(parsed_data, indent=4)

        # Crea el nombre del archivo JSON
        json_filename = filename[:-4] + '.json'

        # Guarda los datos como un archivo JSON
        with open(json_filename, 'w') as json_file:
            json_file.write(json_data)

        print(f'Se ha creado el archivo JSON: {json_filename}')
    except Exception as e:
        print(f'Error al procesar el archivo {filename}: {str(e)}')
        continue
