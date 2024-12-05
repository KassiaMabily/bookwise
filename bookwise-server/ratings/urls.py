from rest_framework.routers import DefaultRouter

from .views import RatingViewSet

router = DefaultRouter()

urlpatterns = [
]

router.register(r'', RatingViewSet, basename='ratings')
urlpatterns += router.urls
