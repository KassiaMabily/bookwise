from django.urls import include, path

from .views import AccountDetail, GitHubCallbackView

urlpatterns = [
    path('<uuid:pk>/', AccountDetail.as_view(), name="account_detail"),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/github/callback/', GitHubCallbackView.as_view(), name='github_callback'),
]
