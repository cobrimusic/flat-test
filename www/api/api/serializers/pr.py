# Django
from rest_framework import serializers

# Models
from api.models.pr import PullRequest

class PullRequestSerializer(serializers.ModelSerializer):
    """Class for serialize main table

    Args:
        serializers (serializer): Serializer model from django
    """
    created_on = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)
    updated_on = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)

    class Meta:
        model = PullRequest
        fields = '__all__'