import requests
from dotenv import load_dotenv
import os
import json
from pathlib import Path


def get_album_data(filepath):
    with open (filepath) as album_picks:
        album_data = json.load(album_picks)
        album_data = album_data["albums"]
        # album_ids = [i['albumId'] for i in album_data['albums']]
    
    return album_data

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


    album_ref_data = get_album_data('albumData.json')

    all_data = []

    for album in album_ref_data:
        r = requests.get(BASE_URL + 'albums/' + album["albumId"], headers=headers)
        album_data = r.json()
        album_data['suggestedBy'] = album["suggestedBy"]
        album_data['rating'] = album["rating"]
        album_data['order'] = album["order"]
        all_data.append(album_data)

    with open(f'./src/data.json', 'w+') as f:
        json.dump(all_data, f)


if __name__ == "__main__":
    main()

