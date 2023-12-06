#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>


const String DATA_POST_URL = "http://192.168.0.119:8000/api/update-tank-level/";

const char *ssid = "Apni Auqat";
const char *password = "gulugulu123";

const int API_REQUEST_DELAY_IN_MICROSECONDS = 1000 * 5 * 1 ;

//user details
const String USER_ID = "17";

const int trigPin = 12;
const int echoPin = 14;

// define sound velocity in cm/uS
#define SOUND_VELOCITY 0.034
#define CM_TO_INCH 0.393701

// defining tank height in meters
const int tankHeight = 2;

WiFiClient client;
HTTPClient http;

long duration;
float distanceCm;

void connectToWiFi()
{
  // Connect to WiFi Network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to WiFi");
  Serial.println("...");
  WiFi.begin(ssid, password);
  int retries = 0;
  while ((WiFi.status() != WL_CONNECTED) && (retries < 15))
  {
    retries++;
    delay(500);
    Serial.print(".");
  }
  if (WiFi.status() == WL_CONNECTED)
  {
    Serial.println(F("WiFi connected!"));
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
  }
  Serial.println(F("Setup ready"));
}

void setup()
{
  Serial.begin(115200);     // Starts the serial communication
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT);  // Sets the echoPin as an Input
  connectToWiFi();
}

void loop()
{
  
  while (WiFi.status() != WL_CONNECTED)
  {
    connectToWiFi();
    delayMicroseconds(1000);
  }
  
  // ============================= Distance Calculation =============================
  
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);

  // Calculate the distance
  distanceCm = duration * SOUND_VELOCITY / 2;
  float distanceInMeters = distanceCm/100;

  // =================================================================================


  // ============================= API Request ========================================

    String serverPath = DATA_POST_URL + "?distanceInMeters=" + String(distanceInMeters) +"&tankHeight="+String(tankHeight) + "&userId="+USER_ID;
    http.begin(client, serverPath.c_str());
    
    int httpResponseCode = http.GET();

    if (httpResponseCode > 0){

      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      String payload = http.getString();
      Serial.println(payload);
    
    }else{

      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    
    }
  
    http.end();

  // =================================================================================

  delay(API_REQUEST_DELAY_IN_MICROSECONDS);


}