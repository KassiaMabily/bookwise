from django.db.models import Count, Sum
from django.db.models.functions import Coalesce
from rest_framework import serializers

from ratings.models import Rating
from .models import User


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField(source='get_full_name')

    class Meta:
        model = User
        fields = ["id", "username", "email", "avatar", "full_name"]


class UserSerializerDetail(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField(source='get_full_name')
    stats = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', "username", 'full_name', 'avatar', 'date_joined', 'full_name', 'stats')

    def get_stats(self, instance):
        stats = instance.rating_set.aggregate(
            total_pages=Coalesce(Sum("book__total_pages"), 0),
            total_books=Count("book"),
            total_authors=Count("book__author", distinct=True)
        )

        trending_category = Rating.objects \
            .values_list('book__categories__name') \
            .annotate(occurrences=Count('book__categories__name')) \
            .order_by('-occurrences') \
            .first()

        trending_category_name, trending_category_occurrences = trending_category

        return {
            "total_pages": stats["total_pages"],
            "total_books": stats["total_books"],
            "total_authors": stats["total_authors"],
            "trending_category": trending_category_name
        }
