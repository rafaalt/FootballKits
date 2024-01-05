import requests
import csv

from urllib.parse import urlparse

def download_image(url, save_path):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        with open(save_path, 'wb') as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        
        print(f"Imagem baixada com sucesso: {save_path}")
    except requests.exceptions.RequestException as e:
        print(f"Erro ao baixar a imagem: {e}")

def get_filename_from_url(url):
    # Extrai o nome do arquivo da URL
    return urlparse(url).path.split("/")[-1]

with open('camisasPaisesSA.csv', 'r') as arquivo_csv:
    leitor_csv = csv.reader(arquivo_csv)
    for linha in leitor_csv:
        if(linha[0] != ''):
            dados = linha[0].split(' ')
            if(len(dados) == 5):
                nome_do_arquivo = f"pl/{dados[0]}/{dados[1]}{dados[2]}-{dados[3]}.jpg"
                download_image(linha[1], nome_do_arquivo)
            elif(len(dados) == 4):
                nome_do_arquivo = f"pl/{dados[0]}/{dados[1]}-{dados[2]}.jpg"
                download_image(linha[1], nome_do_arquivo)


