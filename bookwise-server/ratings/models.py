import uuid

from accounts.models import User
from books.models import Book
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Rating(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rate = models.PositiveIntegerField(null=False, validators=[MinValueValidator(0), MaxValueValidator(5)])
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    book = models.ForeignKey(Book, on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)

    class Meta:
        unique_together = ('book', 'user',)
