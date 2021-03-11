# rest framework
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle

import requests

class Rates(APIView):
    permission_classes = (IsAuthenticated,)
    throttle_classes = [UserRateThrottle]

    def get(self, request, format = None):
        json_providers = {
            "rates": {
                "fixer":{
                    "last_updated": None,
                    "value": 0,
                    "message": "El cambio es de EUR a MXN. EL plan free de fixer no permite como base USD."
                },
                "banxico":{
                    "last_updated": None,
                    "value": 0,
                    "message": "El cambio es de USD a MXN."
                }
            }
        }

        response = self.get_from_fixer()

        if 'success' in response and response['success']:
            json_providers['rates']['fixer']['last_updated'] = response['timestamp']
            json_providers['rates']['fixer']['value'] = response['rates']['MXN']

        response = self.get_from_banxico()

        if response:
            json_providers['rates']['banxico']['last_updated'] = response['bmx']['series'][0]['datos'][0]['fecha']
            json_providers['rates']['banxico']['value'] = response['bmx']['series'][0]['datos'][0]['dato']

        return Response({'results': json_providers}, status = 200)

    def get_from_fixer(self):
        try:
            return requests.get('http://data.fixer.io/api/latest?access_key=5aa39a85fd3dfcb919d9b88e9acc4752&symbols=MXN&format=1').json()
        except Exception as e:
            return e

    def get_from_banxico(self):
        try:
            return requests.get('https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno?token=34baa8f0508473e4c6b139abb7cb1ff2f877e57eaee951ee37d5eca250ea0068').json()
        except Exception as e:
            return e
