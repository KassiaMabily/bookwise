from ratings.serializers import RatingSerializer
from rest_framework import serializers

from .models import Book, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]

class BookSerializer(serializers.ModelSerializer):
    average_rating = serializers.ReadOnlyField()
    categories = CategorySerializer(many=True)

    class Meta:
        model = Book
        fields = "__all__"

class BookDetailSerializer(serializers.ModelSerializer):
    average_rating = serializers.ReadOnlyField()
    ratings = RatingSerializer(many=True, source='rating_set')
    categories = CategorySerializer(many=True)

    class Meta:
        model = Book
        fields = "__all__"




class CategoryDetailSerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True)

    class Meta:
        model = Category
        fields = ["id", "name", "books"]
