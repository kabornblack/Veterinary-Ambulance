from django.urls import path
from .views import *


urlpatterns = [
    path('test/', simple_test ),
    path('test-post/', simple_test_post ),

    # Owners
    path('owners/', return_all_owners),
    path('owners/<int:owner_id>/pets/', return_all_pets_by_owner),
    path('owners/create', create_owner),
    path('owners/delete/<int:owner_id>', delete_owner),
    path('owners/update/<int:owner_id>', update_owner),

    # Pets
    path('pets/create', create_pet),
    path('pets/delete/<int:pet_id>', delete_pet),
    path('pets/update/<int:pet_id>', update_pet),
]