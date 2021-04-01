from django.contrib.auth.models import User
from django.db import models


class PullRequest(models.Model):
    """
        Table collection flags crons
    """
    title = models.CharField(max_length=250)
    description = models.CharField(max_length=250)
    user = models.CharField(max_length=250, blank=True, null=True)
    status = models.CharField(max_length=128)
    updated_on = models.DateTimeField(auto_now=True, blank=True, null=True)
    created_on = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        db_table = 'pull_request'