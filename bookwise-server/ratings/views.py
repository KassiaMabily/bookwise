from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from shared.pagination import CustomPageNumberPagination
from shared.responses import CustomResponse
from .models import Rating
from .serializers import RatingSerializer


# region Rating
class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all().order_by('-created_at')
    serializer_class = RatingSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ["book__name"]
    pagination_class = CustomPageNumberPagination
    permission_classes_by_action = {
        'create': [IsAuthenticated],
        'retrieve': [AllowAny],
        'list': [AllowAny],
        'default': [IsAdminUser]
    }

    def get_permissions(self):
        try:
            # return permission_classes depending on `action`
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            # action is not set return default permission_classes
            # return [permission() for permission in self.permission_classes]
            return [permission() for permission in self.permission_classes_by_action['default']]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        user = request.query_params.get('user')
        if (user):
            queryset = queryset.filter(user__id=user)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            serializer = self.get_paginated_response(serializer.data)
        else:
            serializer = self.get_serializer(queryset, many=True)

        return CustomResponse(serializer.data, message=f'Avaliações do usuário {self.request.user.username}',
                              status=status.HTTP_200_OK)

# endregion
