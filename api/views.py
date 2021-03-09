from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.utils import timezone
from django.forms.models import model_to_dict
from datetime import datetime
from .serializers import *
from .models import Notes, Account


class GetAccount(APIView):

    permission_classes = (IsAuthenticated,)
    serializer_class = AccountSerializer

    def get(self, request):

        user = Account.objects.get(id=request.user.id)
        data = AccountSerializer(user).data

        return Response(data, status=status.HTTP_200_OK)


class UpdateLastNoteSelected(APIView):

    permission_classes = (IsAuthenticated,)
    serializer_class = NoteSerializer

    def post(self, request):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():

            user_object = Account.objects.get(id=serializer.data.get('note_user_id'))

            if serializer.data.get('id') == user_object.last_note_selected_id:
                """
                if the above it true it means the note that is to be deleted is matches the current note that is 
                selected. The below then changes the selected note to the most recently edited note to the deleted one.
                """
                all_notes = Notes.objects.filter(user=user_object).order_by('-date_and_time_of_last_edit')

                index = 0
                for note in all_notes:
                    if note.id == serializer.data.get('id'):
                        break
                    index += 1

                user_object.last_note_selected_id = all_notes[index - 1].id
                user_object.save()

                return Response('Update Last Note Selected Due to Deletion', status=status.HTTP_200_OK)

            else:
                user_object.last_note_selected_id = serializer.data.get('id')
                user_object.save()

                return Response('Updated Last Note Selected', status=status.HTTP_200_OK)
        else:
            return Response('Error When Updating Last Note Selected', status=status.HTTP_304_NOT_MODIFIED)


class GetNotes(APIView):

    permission_classes = (IsAuthenticated,)
    serializer_class = NoteSerializer

    def get(self, request):

        user_object = Account.objects.get(id=request.user.id)
        notes = Notes.objects.filter(user=user_object).order_by('-date_and_time_of_last_edit')

        if user_object.last_note_selected_id:
            """ 
            Tries to get the last note selected but if that query is 'None' due to a new 
            account it sets the last note as the most recent note object 
            """
            last_note_selected = Notes.objects.get(id=user_object.last_note_selected_id)
        else:
            try:
                last_note_selected = notes[0]
            except IndexError:
                # If all the notes have been deleted/no notes exist
                return Response("No Notes to show", status=status.HTTP_204_NO_CONTENT)

        data = {'notes': notes.values(), 'last_note_selected': model_to_dict(last_note_selected)}

        return Response(data, status=status.HTTP_200_OK)


class CreateNote(APIView):

    permission_classes = (IsAuthenticated,)
    serializer_class = NoteTitleSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():

            user_object = Account.objects.get(id=request.user.id)

            new_note = Notes.objects.create(title=serializer.data.get('title'), user=user_object)

            new_note.date_and_time_of_last_edit = datetime.now(tz=timezone.utc)
            new_note.save()

            data = {'new_note_id': new_note.id}

            return Response(data, status=status.HTTP_201_CREATED)
        else:

            return Response('Error When Creating Note', status=status.HTTP_406_NOT_ACCEPTABLE)


class UpdateNote(APIView):

    permission_classes = (IsAuthenticated,)
    serializer_class = NoteSerializer

    def post(self, request):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():

            note_object = Notes.objects.get(id=serializer.data.get('id'))

            if note_object.content == serializer.data.get('content'):
                # If no change has been made to the note but this API has been called
                return Response('No data has been Changed', status=status.HTTP_304_NOT_MODIFIED)

            note_object.content = serializer.data.get('content')
            note_object.date_and_time_of_last_edit = datetime.now(tz=timezone.utc)
            note_object.save()

            return Response('Updated Note Successfully', status=status.HTTP_200_OK)

        return Response('Error When Updating Note', status=status.HTTP_304_NOT_MODIFIED)


class DeleteNote(APIView):

    permission_classes = (IsAuthenticated,)
    serializer_class = NoteSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():

            Notes.objects.get(id=serializer.data.get('id')).delete()

            return Response('Note Deleted Successfully', status=status.HTTP_200_OK)
        else:
            return Response('Error Deleting Note', status=status.HTTP_304_NOT_MODIFIED)


class SearchNotes(APIView):

    permission_classes = (IsAuthenticated,)
    serializer_class = NoteTitleSerializer

    def post(self, request):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():

            user_object = Account.objects.get(id=request.user.id)

            all_of_the_users_notes = Notes.objects.filter(user=user_object)

            search_result = all_of_the_users_notes.filter(title__icontains=serializer.data.get('title'))

            data = search_result.values()

            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response('Error Searching Notes', status=status.HTTP_204_NO_CONTENT)
