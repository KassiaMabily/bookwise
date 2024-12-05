import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=254, unique=True)
    avatar = models.URLField(default="https://images.unsplash.com/photo-1424115087662-5845efc6b366")
    github_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []
