from matplotlib.font_manager import json_dump
import requests
from dotenv import load_dotenv
import os
import json
from pathlib import Path


def get_album_ids(filepath):
    with open (filepath) as album_picks:
        album_data = json.load(album_picks)
        album_ids = [i['albumId'] for i in album_data['albums']]
    
    return album_ids

def main():

    load_dotenv()
    BASE_URL = "https://api.spotify.com/v1/"
    CLIENT_ID = os.environ.get("CLIENT_ID")
    CLIENT_SECRET = os.environ.get("CLIENT_SECRET")

    AUTH_URL = 'https://accounts.spotify.com/api/token'

    # POST
    auth_response = requests.post(AUTH_URL, {
        'grant_type': 'client_credentials',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    })

    # convert the response to JSON
    auth_response_data = auth_response.json()

    # save the access token
    access_token = auth_response_data['access_token']

    headers = {
        'Authorization': 'Bearer {token}'.format(token=access_token)
    }


    album_id = '4i2Cb9v7g9ieShCgf1gakk'

    Path('../src/album-data').mkdir(exist_ok=True)

    album_ids = get_album_ids('albumData.json')

    all_data = []

    for album_id in album_ids:
        r = requests.get(BASE_URL + 'albums/' + album_id, headers=headers)
        all_data.append(r.json())

    with open(f'../src/data.json', 'w+') as f:
        json.dump(all_data, f)




if __name__ == "__main__":
    main()

