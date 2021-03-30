from django.urls import path

from api.views import git
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'api'

urlpatterns = [
    # api routes
    path('api/v1/branches', git.get_branches, name='get_branches'),
    path('api/v1/branch/<branch>', git.get_branch, name='get_branch'),
    path('api/v1/commit/<commit>', git.get_commit, name='get_commit'),
    path('api/token/', obtain_auth_token, name='token_obtain_pair')
]