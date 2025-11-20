from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


def index(request):
    """Vista principal que renderiza la calculadora (opcional, para demostración)"""
    return render(request, 'calculadora/index.html')


@api_view(['POST'])
def calcular(request):
    """API endpoint que procesa las operaciones matemáticas"""
    try:
        num1 = float(request.data.get('num1', 0))
        num2 = float(request.data.get('num2', 0))
        operacion = request.data.get('operacion', '')
        
        resultado = None
        error_msg = None
        
        if operacion == 'sumar':
            resultado = num1 + num2
        elif operacion == 'restar':
            resultado = num1 - num2
        elif operacion == 'multiplicar':
            resultado = num1 * num2
        elif operacion == 'dividir':
            if num2 == 0:
                error_msg = 'No se puede dividir por cero'
            else:
                resultado = num1 / num2
        else:
            error_msg = 'Operación no válida'
        
        if error_msg:
            return Response({'error': error_msg}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
            'resultado': resultado,
            'operacion': operacion,
            'num1': num1,
            'num2': num2
        }, status=status.HTTP_200_OK)
        
    except ValueError:
        return Response(
            {'error': 'Valores numéricos inválidos'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
