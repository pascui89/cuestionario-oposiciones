import os
from PyPDF2 import PdfReader

def write_file(fileName, text):
    try:
        with open(fileName, 'w', encoding='utf-8') as archivo:
            archivo.write(text)
        print("Archivo '{}' creado exitosamente.".format(fileName))
    except IOError:
        print("No se pudo escribir el archivo.")

files = [filename for filename in os.listdir('.') if filename.endswith('.pdf')]

# Iterar sobre el array e imprimir cada elemento
for fileName in files:
    try:
        text = ""  # Reiniciar la variable text a una cadena vacía
        reader = PdfReader(fileName)
        for page in reader.pages:
            text += page.extract_text()
    except Exception as exc:
        text = "Error"

    # Llamada a la función para escribir el archivo
    write_file(fileName + ".txt", text)
