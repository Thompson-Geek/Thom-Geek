#include "bme280.h"
#include <time.h>
#include <stdint.h>

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>

#define BUFSIZE 1024

void error(char *msg) {
    perror(msg);

}
int main() {

    int socktest, numport, n;
    struct sockaddr_in serveraddr;
    struct hostent *server;
    char *hostname;
    char buf[BUFSIZE];
    struct in_addr ipv4addr;

    hostname = "10.0.2.221";
    numport = 4242;


    while(1){
     int  cont=0;
     delay(1000);
     printf("OK\n");
        //Créeation du socket
    socktest = socket(AF_INET, SOCK_STREAM, 0);
    if (socktest < 0)
    {
        cont=1;
        perror("Socket problem");
     }
    if ( cont )continue;

        unsigned long addr;

        server = gethostbyname(hostname);
        if (server == NULL) {
            addr = inet_addr(hostname);
            server = gethostbyaddr((char *)&addr, sizeof(addr), AF_INET);
            if (server == NULL) {

    }
  }

    if (server == NULL) {

        cont =1 ;
        perror("Serveur null");
    }

    if ( cont ) continue;
    bzero((char *) &serveraddr, sizeof(serveraddr));
    serveraddr.sin_family = AF_INET;
    bcopy((char *)server->h_addr,
      (char *)&serveraddr.sin_addr.s_addr, server->h_length);
    serveraddr.sin_port = htons(numport);


  int fd = wiringPiI2CSetup(BME280_ADDRESS);
  if(fd < 0) {
    perror("Valeur non retrouvée ");
    cont =1;
  }
 if ( cont ) continue;
  bme280_calib_data cal;
  readCalibrationData(fd, &cal);

  wiringPiI2CWriteReg8(fd, 0xf2, 0x01);
  wiringPiI2CWriteReg8(fd, 0xf4, 0x25);

  bme280_raw_data raw;
  getRawData(fd, &raw);

  int32_t t_fine = getTemperatureCalibration(&cal, raw.temperature);
  float t = compensateTemperature(t_fine); // C
  float p = compensatePressure(raw.pressure, &cal, t_fine) / 100;
  float h = compensateHumidity(raw.humidity, &cal, t_fine);
  float a = getAltitude(p);


  //Creation de la connection avec le serveur
  if (connect(socktest, &serveraddr, sizeof(serveraddr)) < 0)
    {
      perror("Erreur de connection");
        cont=1;
    }
    if ( cont ) continue;
  char valeur[2000]={0};

  sprintf(valeur,"[{\"sensor\":\"bme280\", \"humidity\":%.2f, \"pressure\":%.2f,"
    " \"temperature\":%.2f, \"altitude\":%.2f, \"timestamp\":%d}]\n", h, p, t, a, (int)time(NULL));


  //Envoie de du message au serveur

  n = write(socktest, valeur, strlen(valeur));

  if (n < 0)

    perror("Erreur au moment de l'écriture sur le socket");

  close(socktest);


    }

}
