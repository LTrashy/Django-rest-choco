from django.urls import path
from .views import ComprasView

urlpatterns = [
    path("compras/", ComprasView.as_view(), name="compras_list"),
    path("compras/<int:id>", ComprasView.as_view(), name="compras_process"),
]
