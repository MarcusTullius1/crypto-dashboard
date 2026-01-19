from django.urls import path
from .views import wallet_list

urlpatterns = [
    path("wallets/", wallet_list),  # GET /api/wallets/?address=<btc_address>
]
