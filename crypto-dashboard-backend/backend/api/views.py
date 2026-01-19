# backend/api/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

BTC_API_URL = "https://blockstream.info/api/address/{}"

@api_view(["GET"])
def wallet_list(request):
    """
    Если указан ?address=<btc_address>, возвращаем реальные данные кошелька через Blockstream API.
    Иначе возвращаем пример watchlist.
    """
    address = request.GET.get("address")

    if address:
        try:
            # Получаем баланс адреса
            res_balance = requests.get(f"{BTC_API_URL}")
            res_balance.raise_for_status()
            balance_satoshi = res_balance.json().get("chain_stats", {}).get("funded_txo_sum", 0) - \
                              res_balance.json().get("chain_stats", {}).get("spent_txo_sum", 0)
            balance_btc = balance_satoshi / 1e8

            # Получаем последние транзакции (10 шт)
            res_txs = requests.get(f"https://blockstream.info/api/address/{address}/txs")
            res_txs.raise_for_status()
            txs = res_txs.json()[:10]
            transactions = []
            for tx in txs:
                txid = tx["txid"]
                amount = 0
                # считаем входы/выходы конкретного адреса
                for vout in tx["vout"]:
                    if address in [addr.get("scriptpubkey_address") for addr in [vout]]:
                        amount += vout["value"]
                transactions.append({
                    "hash": txid,
                    "amount": amount / 1e8,
                    "date": tx.get("status", {}).get("block_time", "N/A")
                })

            return Response({
                "address": address,
                "balance": balance_btc,
                "transactions": transactions
            })

        except Exception as e:
            return Response({"error": f"Не удалось получить данные: {str(e)}"}, status=400)

    example_wallets = [
        {"address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", "balance": 50, "transactions": []},
    ]
    return Response(example_wallets)
