import os
import codecs

# Ruta al directorio que contiene los archivos
ruta_directorio = './'  # Ejemplo: 'C:\\ruta\\directorio'

# Obtén la lista de archivos en el directorio
archivos = [archivo for archivo in os.listdir(ruta_directorio) if archivo.endswith('.txt')]

# Itera sobre cada archivo en la lista
for archivo in archivos:
    ruta_archivo = os.path.join(ruta_directorio, archivo)
    
    # Lee el contenido del archivo con el encoding original
    with codecs.open(ruta_archivo, 'r') as archivo_original:
        contenido = archivo_original.read()
    
    # Escribe el contenido del archivo con el nuevo encoding (UTF-8)
    with codecs.open(ruta_archivo, 'w', encoding='utf-8') as archivo_utf8:
        archivo_utf8.write(contenido)
    
    print(f'Se ha cambiado el encoding del archivo "{ruta_archivo}" a UTF-8.')

print('Proceso completo.')
