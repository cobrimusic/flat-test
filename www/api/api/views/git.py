# django
from django.http import JsonResponse

# rest framework
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle
from rest_framework.decorators import api_view

from tool.Git import Git

git = Git(owner = "FlatDigital", repo = "fullstack-interview-test")

@api_view(['GET'])
def get_branches(request):
    branches = git.branches()

    return JsonResponse({"results": branches}, status = 200)


@api_view(['GET'])
def get_branch(request, branch):
    branch = git.branch(branch)

    return JsonResponse({"results": branch}, status = 200)


@api_view(['GET'])
def get_commit(request, commit):
    commit = git.commit(commit)

    return JsonResponse({"results": commit}, status = 200)

