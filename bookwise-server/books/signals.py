import os
from django.db.models.signals import pre_delete, pre_save
from django.dispatch import receiver
from .models import Book
from django.utils.text import slugify

def delete_cover(instance):
    try:
        os.remove(instance.cover.path)
    except (ValueError, FileNotFoundError):
        ...

@receiver(pre_delete, sender=Book)
def book_cover_delete(sender, instance, created, *args, **kwargs):
    old_instance = Book.objects.filter(pk=instance.pk).first()
    if not old_instance:
        return

    delete_cover(old_instance)

@receiver(pre_save, sender=Book)
def book_cover_update(sender, instance, *args, **kwargs):
    old_instance = Book.objects.filter(pk=instance.pk).first()

    if not old_instance:
        instance.slug = slugify(instance.name)
        return

    is_new_cover = old_instance.cover != instance.cover
    if is_new_cover:
        delete_cover(old_instance)
