from django.http import HttpResponse, JsonResponse
from .models import *
from django.shortcuts import get_object_or_404
import json

def create_pet(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        pet = Pets.objects.create(
            name = data['name'],
            species = data.get('species'), # This will return null if none is provided
            age = data.get('age'), # This will return null if none is provided
            owner_id = data.get('owner_id')
        )

        return HttpResponse({
            'id': pet.id,
            'name': pet.name,
            'species': pet.species,
            'age': pet.age,
            'owner_id': pet.owner_id
        })
    else:
        return HttpResponse('This is a POST only endpoint!', status=405)

def delete_pet(request, pet_id):
    if request.method == 'DELETE':
        pet = get_object_or_404(Pets, pk=pet_id)

        pet.delete()
        return HttpResponse(f'Pet with id {pet_id} was deleted!', status=200)
    else:
        return HttpResponse('This is a DELETE only endpoint!', status=405)

def update_pet(request, pet_id):
    if request.method == 'PATCH':
        pet = get_object_or_404(Pets, pk=pet_id)
        data = json.loads(request.body)

        if 'name' in data:
            pet.name = data['name']

        if 'species' in data:
            pet.species = data['species']

        if 'age' in data:
            pet.age = data['age']

        if 'owner_id' in data:
            pet.owner_id = data['owner_id']

        pet.save()

        return JsonResponse({
            'id': pet.id,
            'name': pet.name,
            'species': pet.species,
            'age': pet.age,
            'owner_id': pet.owner_id
        })
    else:
        return HttpResponse('This is a PATCH only endpoint!', status=405)


def update_owner(request, owner_id):
    if request.method == 'PATCH':
        owner = get_object_or_404(Owners, pk=owner_id)
        data = json.loads(request.body)

        if 'name' in data:
            owner.name = data['name']

        if 'phone' in data:
            owner.phone = data['phone']

        owner.save()

        
        return JsonResponse({
            'id': owner.id,
            'name': owner.name,
            'phone': owner.phone
        })
    else:
        return HttpResponse('This is a PATCH only endpoint!', status=405)


def delete_owner(request, owner_id):
    if request.method == 'DELETE':
        owner = get_object_or_404(Owners, pk=owner_id)

        owner.delete()
        return HttpResponse(f'Owner with id {owner_id} was deleted!', status=200)
    else:
        return HttpResponse('This is a DELETE only endpoint!', status=405)


def create_owner(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        owner = Owners.objects.create(
            name = data['name'],
            phone = data['phone']
        )

        return HttpResponse({
            'id': owner.id,
            'name': owner.name,
            'phone': owner.phone
        })
    else:
        return HttpResponse('This is a POST only endpoint!', status=405)


def return_all_owners(request):
    owners = Owners.objects.all()
 
    owners_serialized = []

    for owner in owners:
        owners_serialized.append(
           {
        'id': owner.id,    
        'name': owner.name,
        'phone': owner.phone
        }
    )
        print(owners_serialized)

    return JsonResponse(owners_serialized, safe=False)

def return_all_pets_by_owner(request, owner_id):
    owner = get_object_or_404(Owners, pk=owner_id)

    pets = Pets.objects.filter(owner=owner)

    pets_serialized = []

    for pet in pets:
        pets_serialized.append(
            {
                'id': pet.id,    
                'name': pet.name,
                'species': pet.species,
                'age': pet.age
            }
        )
    return JsonResponse({
        'owner_id': owner_id,
        'owner_name': owner.name,
        'owner_phone': owner.phone,
        'pets': pets_serialized
    })


def simple_test(request):
    return HttpResponse('Hello, this is the test page for my Application')

def simple_test_post(request):
    if request.method == 'POST':
        decoded_data = request.body.decode('utf-8')
        print(decoded_data)
        return HttpResponse('Data was recieved!')
    else:
        return HttpResponse('This is a POTS only page!', status=405)