# Tankerwala - Water Tank Monitoring System

A multi-component water tank monitoring system with mobile app, admin dashboard, Django backend, and ESP8266 IoT integration.

## Project Overview

This is a Final Year Project (FYP) that provides real-time water tank level monitoring and management. The system consists of:

- **Mobile App**: Expo React Native application for end users to track water levels, order water tankers, and view tank locations
- **Admin Portal**: React-based dashboard for administrators to manage orders, users, and view analytics
- **Backend**: Django REST API with Django Channels for real-time WebSocket communication
- **IoT Firmware**: ESP8266-based firmware for ultrasonic water level sensing

## Technology Stack

### Frontend
- **Mobile App**: Expo SDK 49, React Native 0.72, React Navigation
- **Admin Portal**: React 18, Material UI, Tailwind CSS, ApexCharts

### Backend
- **Framework**: Django 4.x with Django Channels (WebSockets)
- **API**: Django REST Framework
- **Database**: SQLite (development)
- **Python Version**: 3.9.18 (required)

### IoT
- **Hardware**: ESP8266 NodeMCU
- **Sensors**: Ultrasonic distance sensor (HC-SR04)

## Prerequisites

### Python Version (Important)
The backend requires **Python 3.9.18**. Do not use Python 3.10 or higher as Django Channels may have compatibility issues.

```bash
# Create virtual environment with specific Python version
python3.9 -m venv .venv
source .venv/bin/activate  # Linux/Mac
# or
.venv\Scripts\activate     # Windows
```

### Google Maps API Configuration

The mobile and admin apps use Google Maps APIs. You need to:

1. Create a Google Cloud Platform project
2. Enable the following APIs:
   - Maps SDK for Android
   - Maps SDK for iOS
   - Places API
   - Directions API
3. Create an API key and update it in:
   - `Application/.env` (mobile app)
   - Admin dashboard environment variables

### Mobile App Permissions
The mobile app requires:
- Location permissions (for tracking tanker location and pickup/drop-off)
- Camera access (for image uploads)
- Push notifications

## Project Structure

```
/Admin           - React admin portal (CRA)
/Application     - Expo React Native mobile app
/Backend         - Django REST API
  /Tankerwala    - Django project
    /REST_API    - Main API application
/Arduino         - ESP8266 water tank firmware
```

## Running the Project

### Backend
```bash
cd Backend/Tankerwala
python manage.py runserver
```
Runs on http://localhost:8000

### Admin Portal
```bash
cd Admin
npm start
```
Runs on http://localhost:3000

### Mobile App
```bash
cd Application
expo start
```
Opens Metro bundler (use Expo Go app on device or emulator)

## Important Notes

- Backend requires `.venv` virtual environment (not committed to git)
- `sec.py` in Backend/Tankerwala contains secret keys (never commit to version control)
- SQLite database (`db.sqlite3`) exists in Backend/Tankerwala
- Mobile app connects to Google Maps APIs and requires location permissions on device