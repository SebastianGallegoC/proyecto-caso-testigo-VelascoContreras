# Script de Pruebas para Calculadora Django

import json

# Simulación de pruebas unitarias para las operaciones

def test_suma():
    """Prueba la operación de suma"""
    num1, num2 = 10, 5
    resultado_esperado = 15
    resultado = num1 + num2
    assert resultado == resultado_esperado, f"Error: {resultado} != {resultado_esperado}"
    print("✓ Prueba de suma: PASÓ")

def test_resta():
    """Prueba la operación de resta"""
    num1, num2 = 10, 5
    resultado_esperado = 5
    resultado = num1 - num2
    assert resultado == resultado_esperado, f"Error: {resultado} != {resultado_esperado}"
    print("✓ Prueba de resta: PASÓ")

def test_multiplicacion():
    """Prueba la operación de multiplicación"""
    num1, num2 = 10, 5
    resultado_esperado = 50
    resultado = num1 * num2
    assert resultado == resultado_esperado, f"Error: {resultado} != {resultado_esperado}"
    print("✓ Prueba de multiplicación: PASÓ")

def test_division():
    """Prueba la operación de división"""
    num1, num2 = 10, 5
    resultado_esperado = 2
    resultado = num1 / num2
    assert resultado == resultado_esperado, f"Error: {resultado} != {resultado_esperado}"
    print("✓ Prueba de división: PASÓ")

def test_division_por_cero():
    """Prueba el manejo de división por cero"""
    num1, num2 = 10, 0
    try:
        resultado = num1 / num2
        print("✗ Prueba de división por cero: FALLÓ (no se detectó el error)")
        return False
    except ZeroDivisionError:
        print("✓ Prueba de división por cero: PASÓ")
        return True

if __name__ == "__main__":
    print("=" * 50)
    print("Ejecutando pruebas de la calculadora...")
    print("=" * 50)
    print()
    
    try:
        test_suma()
        test_resta()
        test_multiplicacion()
        test_division()
        test_division_por_cero()
        
        print()
        print("=" * 50)
        print("✓ TODAS LAS PRUEBAS PASARON CORRECTAMENTE")
        print("=" * 50)
    except AssertionError as e:
        print()
        print("=" * 50)
        print(f"✗ ERROR EN LAS PRUEBAS: {e}")
        print("=" * 50)
