from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueTogetherValidator

from accounts.serializers import UserSerializer
from books.models import Book
from .models import Rating


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ["id", "name", "cover", "author"]


class RatingSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    user = UserSerializer(read_only=True, default=serializers.CurrentUserDefault())
    book_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = Rating
        fields = ["id", "created_at", "rate", "description", "book_id", "user", "book"]
        read_only_fields = ["id", "created_at", "user", "book"]
        validators = [
            UniqueTogetherValidator(
                queryset=Rating.objects.all(),
                fields=['user', 'book_id'],
                message=("Já existe uma avaliação para este livro")
            )
        ]
        extra_kwargs = {'user': {'required': False}}

    def validate_book_id(self, value):
        try:
            book = Book.objects.get(pk=value)
        except Book.DoesNotExist:
            raise ValidationError("Livro com este ID não existe.")
        return value
