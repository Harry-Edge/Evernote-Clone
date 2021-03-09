from django.urls import path
from .views import *
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('get-user', GetAccount.as_view()),
    path('get-notes', GetNotes.as_view()),
    path('create-note', CreateNote.as_view()),
    path('update-note', UpdateNote.as_view()),
    path('delete-note', DeleteNote.as_view()),
    path('search-notes', SearchNotes.as_view()),
    path('update-last-note-selected', UpdateLastNoteSelected.as_view()),

    path('token-auth', obtain_jwt_token),

]