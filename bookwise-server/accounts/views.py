from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView

from accounts.serializers import UserSerializerDetail
from shared.responses import CustomResponse
from .github import authenticate_with_github, get_access_token
from .models import User


class AccountDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializerDetail
    lookup_fields = ['pk']

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return CustomResponse(data=serializer.data, message="Detalhes do usuário recuperados com sucesso",
                              status=status.HTTP_200_OK)


@method_decorator(csrf_exempt, name='dispatch')
class GitHubCallbackView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        code = data.get('code')

        if not code:
            return CustomResponse(success=False, message='Code not provided', status=status.HTTP_400_BAD_REQUEST)

        success, result = get_access_token(code)

        if success:
            user = authenticate_with_github(result)
            if user:
                token, created = Token.objects.get_or_create(user=user)
                serializer = UserSerializerDetail(instance=user)
                return CustomResponse(data={'key': token.key, 'user': serializer.data}, status=status.HTTP_200_OK)
        else:
            return CustomResponse(success=False, message=result, status=status.HTTP_400_BAD_REQUEST)
