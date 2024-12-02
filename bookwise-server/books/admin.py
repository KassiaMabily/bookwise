from django.contrib import admin

from .models import Book, Category

admin.site.register(Category)

@admin.register(Book)
class RecipeAdmin(admin.ModelAdmin):
    prepopulated_fields = {
        "slug": ('name',)
    }
