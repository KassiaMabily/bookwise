import json

import requests
from django.conf import settings
from django.contrib.auth import get_user_model


def authenticate_with_github(access_token):
    User = get_user_model()

    # Obtenha as informações do usuário do GitHub
    user_info_response = requests.get(
        'https://api.github.com/user',
        headers={
            'Authorization': f'Bearer {access_token}',
            'Accept': 'application/json',
        }
    )

    if user_info_response.status_code != 200:
        return None

    user_info = user_info_response.json()
    github_id = user_info.get('id')
    email = user_info.get('email')
    username = user_info.get('login')
    first_name, last_name = user_info.get('name', ' ').split(' ', 1)
    avatar_url = user_info.get('avatar_url')

    if not email:
        email = f'{username}@github.com'  # GitHub nem sempre fornece email, então use um fallback

    # Tente encontrar um usuário existente com o GitHub ID ou email
    user, created = User.objects.get_or_create(
        email=email,
        defaults={
            'username': username,
            'github_id': github_id,
            'first_name': first_name,
            'last_name': last_name,
            'avatar': avatar_url,
        }
    )

    if not created:
        # Atualize o GitHub ID se o usuário já existir
        user.github_id = github_id
        user.avatar = avatar_url
        user.save()

    return user


def get_access_token(code):
    token_response = requests.post(
        'https://github.com/login/oauth/access_token',
        headers={
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        data=json.dumps({
            'client_id': settings.GITHUB_CLIENT_ID,
            'client_secret': settings.GITHUB_CLIENT_SECRET,
            'code': code,
        })
    )

    token_data = token_response.json()
    access_token = token_data.get('access_token')
    if (access_token):
        return True, access_token

    return False, token_data.get('error_description')
