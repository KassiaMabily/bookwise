from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics, status

from shared.pagination import CustomPageNumberPagination
from shared.responses import CustomResponse
from .models import Book, Category
from .serializers import (BookDetailSerializer, BookSerializer,
                          CategoryDetailSerializer, CategorySerializer)


# region Category
class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            serializer = self.get_paginated_response(serializer.data)
        else:
            serializer = self.get_serializer(queryset, many=True)

        return CustomResponse(serializer.data, message="Lista de categorias recuperada com sucesso",
                              status=status.HTTP_200_OK)


class CategoryDetail(generics.RetrieveAPIView):
    queryset = Category.objects.all().prefetch_related('books')
    serializer_class = CategoryDetailSerializer

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return CustomResponse(data=serializer.data, message="Detalhes da categoria recuperados com sucesso",
                              status=status.HTTP_200_OK)


# endregion

# region Book
class BookList(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["categories"]
    search_fields = ['name', 'author']
    pagination_class = CustomPageNumberPagination

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            serializer = self.get_paginated_response(serializer.data)
        else:
            serializer = self.get_serializer(queryset, many=True)

        return CustomResponse(serializer.data, message="Lista de livros recuperada com sucesso",
                              status=status.HTTP_200_OK)


class BookTrendingList(generics.ListAPIView):
    queryset = Book.objects.get_trending()[:6]
    serializer_class = BookSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            serializer = self.get_paginated_response(serializer.data)
        else:
            serializer = self.get_serializer(queryset, many=True)

        return CustomResponse(serializer.data, message="Avaliações mais recentes", status=status.HTTP_200_OK)


class BookDetail(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookDetailSerializer
    lookup_fields = ['pk']

    def get_object(self):
        try:
            book = super().get_queryset().get(pk=self.kwargs['pk'])
            print(book)
        except Book.DoesNotExist:
            book = None
        return book

# endregion
