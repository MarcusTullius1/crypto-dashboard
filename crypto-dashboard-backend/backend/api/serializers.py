from rest_framework import serializers

class TransactionSerializer(serializers.Serializer):
    hash = serializers.CharField()
    amount = serializers.CharField()
    date = serializers.CharField()

class WalletSerializer(serializers.Serializer):
    address = serializers.CharField()
    balance = serializers.FloatField()
    transactions = TransactionSerializer(many=True)
