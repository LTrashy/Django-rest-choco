from urllib import request
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from .models import CompraChocolate
import json

# Create your views here.


def choco(ini, c, w):
    numberChoc = ini // c
    wraps = numberChoc

    while wraps >= w:
        numberChoc += wraps // w
        wraps = wraps // w + wraps % w

    return numberChoc


class ComprasView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if id > 0:
            compras = list(CompraChocolate.objects.filter(id=id).values())
            if len(compras) > 0:
                compra = compras[0]
                datos = {"message": "Success", "compra": compra}
            else:
                datos = {"message": "Compras no encontradas"}
            return JsonResponse(datos)
        else:
            compras = list(CompraChocolate.objects.values())
            if len(compras) > 0:
                datos = {"message": "Success", "compras": compras}
            else:
                datos = {"message": "Compras no encontradas"}
            return JsonResponse(datos)

    def post(self, request):
        jd = json.loads(request.body)
        initial_amount = jd["initial_amount"]
        cost_chocolate_bar = jd["cost_chocolate_bar"]
        wrappers_free = jd["wrappers_free"]
        chocolate_eaten = choco(initial_amount, cost_chocolate_bar, wrappers_free)

        CompraChocolate.objects.create(
            initial_amount=initial_amount,
            cost_chocolate_bar=cost_chocolate_bar,
            wrappers_free=wrappers_free,
            chocolate_eaten=chocolate_eaten,
        )

        datos = {"message": "Success"}

        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        compras = list(CompraChocolate.objects.filter(id=id).values())

        if len(compras) > 0:
            compra = CompraChocolate.objects.get(id=id)
            initial_amount = jd["initial_amount"]
            cost_chocolate_bar = jd["cost_chocolate_bar"]
            wrappers_free = jd["wrappers_free"]
            chocolate_eaten = choco(initial_amount, cost_chocolate_bar, wrappers_free)

            compra.initial_amount = initial_amount
            compra.cost_chocolate_bar = cost_chocolate_bar
            compra.wrappers_free = wrappers_free
            compra.chocolate_eaten = chocolate_eaten

            compra.save()
            datos = {"message": "Success"}
        else:
            datos = {"message": "Compra no encontrada"}

        return JsonResponse(datos)

    def delete(self, request, id):
        compras = list(CompraChocolate.objects.filter(id=id).values())

        if len(compras) > 0:
            CompraChocolate.objects.filter(id=id).delete()
            datos = {"message": "Success"}
        else:
            datos = {"message": "compra not found"}

        return JsonResponse(datos)
