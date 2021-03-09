from rest_framework import serializers
from .models import Notes, Account


class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ('id', 'first_name', 'last_name')


class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notes
        fields = ('id', 'title', 'content', 'note_user_id')
        extra_kwargs = {'id': {'read_only': False}}


class NoteTitleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notes
        fields = ('title',)
