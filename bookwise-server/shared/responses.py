from rest_framework import renderers
from rest_framework.response import Response
from rest_framework.views import exception_handler


class CustomResponse(Response):
    def __init__(self, data=None, message=None, success=True, **kwargs):
        response = {'success': success}
        if (data is not None):
            response["data"] = data

        if (message is not None):
            response["message"] = message

        super().__init__(response, **kwargs)


class CustomRenderer(renderers.JSONRenderer):

    def render(self, data, accepted_media_type=None, renderer_context=None):
        if renderer_context and renderer_context['response'].status_code < 400:
            if data and 'data' in data:
                response_data = {'success': True, **data}
            else:
                response_data = {'success': True, 'data': data}
        else:
            response_data = {'success': False, 'error': data}
        return super().render(response_data, accepted_media_type, renderer_context)


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    return response
