# django
from django.http import JsonResponse

# rest framework
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle
from rest_framework.decorators import api_view
from rest_framework import generics

# project
from api.models.pr import PullRequest
from api.serializers.pr import PullRequestSerializer

# tool
from tool.Git import Git

# utils
import json

git = Git(owner = "FlatDigital", repo = "fullstack-interview-test")

class pulls(generics.ListAPIView):
    """
    Provides a get method handler.
    """
    queryset = PullRequest.objects.order_by('-id').all()
    serializer_class = PullRequestSerializer


@api_view(['POST'])
def create_pr(request):
    body_data = json.loads(request.body)

    if not body_data:
        return JsonResponse({"results": 'Bad request'}, status = 400)

    PullRequest.objects.create(
        title = body_data['title'],
        description = body_data['description'],
        user = body_data['user'],
        status = body_data['status']
    )

    return JsonResponse({"results": 'created'}, status = 200)


@api_view(['PUT'])
def update_pr(request):
    body_data = json.loads(request.body)

    if not body_data:
        return JsonResponse({"results": 'Bad request'}, status = 400)

    PullRequest.objects.update_or_create(
        pk = body_data['id'],
        defaults = {
            "status": body_data['status']
        }
    )

    return JsonResponse({"results": 'updated'}, status = 200)


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


@api_view(['GET'])
def get_compare(request, basehead):
    compare = git.compare_branches(basehead)

    return JsonResponse({"results": compare}, status = 200)

