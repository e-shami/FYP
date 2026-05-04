# FYP Project - Tankerwala

Multi-component water tank monitoring system with mobile app, admin dashboard, Django backend, and ESP8266 IoT integration.

## Project Structure

```
/Admin        - React admin portal (CRA)
/Application  - Expo React Native mobile app
/Backend      - Django REST API (Python)
/Arduino      - ESP8266 water tank firmware
```

## Run Commands

- **Admin**: `cd Admin && npm start` → http://localhost:3000
- **Mobile**: `cd Application && expo start` → Metro bundler
- **Backend**: `cd Backend/Tankerwala && python manage.py runserver`

## Important Notes

- Backend uses Django with Channel (WebSockets) for real-time features
- Mobile app uses Expo - requires running `expo start` rather than `react-native run`
- Backend requires `.venv` virtual environment (not committed to git)
- SQLite database (`db.sqlite3`) exists in Backend/Tankerwala
- `sec.py` in Backend/Tankerwala contains secret keys (never commit)
- Mobile app connects to Google Maps APIs and requires location permissions

## Dependencies

- Admin: React 18, Material UI, ApexCharts, Tailwind
- Application: Expo SDK 49, React Native, React Navigation
- Backend: Django 4.x, Django Channels, djangorestframework