from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager


class Account(AbstractUser):

    username = None

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100, null=True)
    last_name = models.CharField(max_length=100, null=True)
    last_note_selected_id = models.IntegerField(null=True, blank=True)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.first_name


class UserAccount(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    last_note_selected_id = models.IntegerField(null=True)

    def __str__(self):
        return self.first_name


class Notes(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    note_user_id = models.CharField(null=True, max_length=1000)

    title = models.CharField(max_length=200, null=True)
    content = models.CharField(max_length=10000, null=True)
    date_and_time_of_creation = models.DateTimeField(auto_now_add=True, null=True)
    date_and_time_of_last_edit = models.DateTimeField(auto_now_add=False, null=True)

    def __str__(self):
        return f"{self.user} {self.title}"

    class Meta:
        verbose_name_plural = "Notes"



