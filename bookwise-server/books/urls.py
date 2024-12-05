from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from .views import (BookDetail, BookList, BookTrendingList, CategoryDetail,
                    CategoryList)

urlpatterns = [
    path('', BookList.as_view(), name="book_list"),
    path('<uuid:pk>/', BookDetail.as_view(), name="book_detail"),
    path('trending/', BookTrendingList.as_view(), name="trending_book_list"),
    path('categories/', CategoryList.as_view(), name="categoy_list"),
    path('categories/<uuid:pk>/', CategoryDetail.as_view(), name="categoy_detail"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
