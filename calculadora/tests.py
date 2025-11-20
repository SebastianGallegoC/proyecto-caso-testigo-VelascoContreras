from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status


class CalculadoraAPITestCase(TestCase):
    """Tests para la API de calculadora"""
    
    def setUp(self):
        """Configuración inicial para cada test"""
        self.client = APIClient()
        self.url = '/api/calcular/'
    
    def test_suma_correcta(self):
        """Test 1: Verificar que la suma funciona correctamente"""
        data = {
            'num1': 10,
            'num2': 5,
            'operacion': 'sumar'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['resultado'], 15)
        self.assertEqual(response.data['operacion'], 'sumar')
    
    def test_resta_correcta(self):
        """Test 2: Verificar que la resta funciona correctamente"""
        data = {
            'num1': 10,
            'num2': 5,
            'operacion': 'restar'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['resultado'], 5)
    
    def test_multiplicacion_correcta(self):
        """Test 3: Verificar que la multiplicación funciona correctamente"""
        data = {
            'num1': 10,
            'num2': 5,
            'operacion': 'multiplicar'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['resultado'], 50)
    
    def test_division_correcta(self):
        """Test 4: Verificar que la división funciona correctamente"""
        data = {
            'num1': 10,
            'num2': 5,
            'operacion': 'dividir'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['resultado'], 2)
    
    def test_division_por_cero(self):
        """Test 5: Verificar que la división por cero retorna error"""
        data = {
            'num1': 10,
            'num2': 0,
            'operacion': 'dividir'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'No se puede dividir por cero')
    
    def test_operacion_invalida(self):
        """Test 6: Verificar que una operación inválida retorna error"""
        data = {
            'num1': 10,
            'num2': 5,
            'operacion': 'potencia'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
    
    def test_numeros_negativos(self):
        """Test 7: Verificar operaciones con números negativos"""
        data = {
            'num1': -10,
            'num2': 5,
            'operacion': 'sumar'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['resultado'], -5)
    
    def test_numeros_decimales(self):
        """Test 8: Verificar operaciones con números decimales"""
        data = {
            'num1': 10.5,
            'num2': 2.5,
            'operacion': 'multiplicar'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertAlmostEqual(response.data['resultado'], 26.25, places=2)
    
    def test_datos_faltantes(self):
        """Test 9: Verificar comportamiento con datos faltantes"""
        data = {
            'operacion': 'sumar'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['resultado'], 0)
    
    def test_respuesta_estructura_correcta(self):
        """Test 10: Verificar que la respuesta tiene la estructura correcta"""
        data = {
            'num1': 7,
            'num2': 3,
            'operacion': 'dividir'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('resultado', response.data)
        self.assertIn('operacion', response.data)
        self.assertIn('num1', response.data)
        self.assertIn('num2', response.data)
        self.assertEqual(response.data['num1'], 7)
        self.assertEqual(response.data['num2'], 3)

