import requests
import csv
from bs4 import BeautifulSoup

def buscarTime(url):
    nomesCamisas = []
    linksCamisas = []
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        camisa = soup.find_all(class_="product-image-photo")
        for x in camisa:
            if('Home Shirt' in x.get('alt','')):
                nomesCamisas.append(x.get('alt', ''))
                linksCamisas.append(x.get('src', ''))
            elif('Away Shirt' in x.get('alt','')):
                nomesCamisas.append(x.get('alt', ''))
                linksCamisas.append(x.get('src', ''))
            elif('3rd Shirt' in x.get('alt','')):
                nomesCamisas.append(x.get('alt', ''))
                linksCamisas.append(x.get('src', ''))
        return nomesCamisas, linksCamisas
    else:
        print(f"A solicitação falhou com o código de status {response.status_code}")

def buscarUrl(url):
    links = []
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        times = soup.find_all(class_="pmcatblock ic_")
        for time in times:
            links.append(time.a.get('href',''))
        return links
    else:
        print(f"A solicitação falhou com o código de status {response.status_code}")

    
url = "https://www.subsidesports.com/uk/team/premier-league"
addUrl = "/l/player:not-player-related/product-group-code:shirts"
# vetor1, vetor2 = buscarTime(url)
urls = buscarUrl(url)
for x in urls:
    print(x)
    nomes, links = buscarTime(x + addUrl)
    # Nome do arquivo CSV
    nome_arquivo = 'camisasPaisesSA.csv'

    # Abre o arquivo CSV em modo de escrita
    with open(nome_arquivo, 'a', newline='', encoding='utf-8') as arquivo_csv:
        # Cria um objeto de escrita CSV
        escritor_csv = csv.writer(arquivo_csv)
        # Escreve os arrays nas colunas
        escritor_csv.writerows(zip(nomes, links))  # Escreve dados