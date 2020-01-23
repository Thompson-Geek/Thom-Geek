TEMPLATE = app
CONFIG += console
CONFIG -= app_bundle
CONFIG -= qt

SOURCES += main.c \
    BmeClass.c


LIBS+=-lwiringPi




HEADERS += \
    bme280.h

qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /root
!isEmpty(target.path): INSTALLS += target
