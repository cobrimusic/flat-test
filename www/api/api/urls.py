from django.urls import path

from api.views.rates import Rates
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'api'

urlpatterns = [
    # api routes
    path('api/rates', Rates.as_view(), name='rates'),
    path('api/token/', obtain_auth_token, name='token_obtain_pair')
]