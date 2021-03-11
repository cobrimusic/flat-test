from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination
from rest_framework.response import Response


class CustomResultsSetPagination(LimitOffsetPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    
    def get_paginated_response(self, data):
        return Response({
            'count': self.count,
            'limit': self.limit,
            'offset': self.offset,
            'results': data
        })