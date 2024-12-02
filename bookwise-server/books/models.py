import os
import uuid

from django.conf import settings
from django.db import models
from django.db.models import Avg
from django.utils.text import slugify
from PIL import Image


class BookManager(models.Manager):
    def get_trending(self):
        return self.annotate(
            average=Avg("rating__rate")
        ).order_by('-average', '-created_at')


class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)

class Book(models.Model):
    objects = BookManager()

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150, null=False)
    author = models.TextField(default=None)
    slug = models.SlugField(unique=True)
    summary = models.TextField()
    total_pages = models.IntegerField()
    cover = models.ImageField(upload_to='books/covers/', blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    categories = models.ManyToManyField(Category, related_name='books')

    class Meta:
        ordering = ['-name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = f'{slugify(self.name)}'

        saved = super().save(*args, **kwargs)

        if self.cover:
            try:
                self.resize_image(self.cover, 800)
            except FileNotFoundError:
                ...

        return saved

    @staticmethod
    def resize_image(image, new_width: 800):
        image_full_path = os.path.join(settings.MEDIA_ROOT, image.name)
        image_pillow = Image.open(image_full_path)
        original_width, original_height = image_pillow.size

        if original_width <= new_width:
            image_pillow.close()
            return

        new_height = round((new_width * original_height) / original_width)
        new_image = image_pillow.resize((new_width, new_height), Image.LANCZOS)
        new_image.save(image_full_path, optimize=True, quality=50)

    @property
    def average_rating(self):
        return self.rating_set.aggregate(average_rating=Avg('rate', default=0))['average_rating']
