#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QLineEdit>
#include <QFile>
#include <QJsonDocument>
#include <QGroupBox>
#include <QLCDNumber>





MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    server = new QTcpServer(this);
    connect(server, SIGNAL(newConnection()), this, SLOT(connection_tcp()));


    if(!server->listen(QHostAddress::Any, default_port))
    {
        qDebug() << "Le serveur n'a pas pu démarré";
    }
    else
    {
        qDebug() << "Le serveur a démarré avec succès!";
    }

}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::connection_tcp()
{

    socket = server->nextPendingConnection();
    socket->setReadBufferSize(512);

    connect(socket, SIGNAL(readyRead()), SLOT(lecture_donnees_socket()));

}

void MainWindow::lecture_donnees_socket()
{
    QByteArray data;

    if (socket->bytesAvailable())
    {



        data = socket->readAll();

        QLineEdit *lineEdit_l = new QLineEdit(this);
      //  ui->lineEdit_l->setText(data);

               QFile donnees("/home/thompson/Serveur/Json.txt");
               if(!donnees.open(QIODevice::WriteOnly | QIODevice::Text));
               QTextStream ecriture(&donnees);
               ecriture << data;
               donnees.close();




        QFile fileNew;
                  fileNew.setFileName("/home/thompson/Serveur/Json.txt");
                  fileNew.open(QIODevice::ReadOnly | QIODevice::Text);
                   QJsonParseError jsonError;
                             QJsonDocument flowerJson = QJsonDocument::fromJson(fileNew.readAll(),&jsonError);
                             if (jsonError.error != QJsonParseError::NoError){
                             qDebug() << jsonError.errorString();
                             }
                             QList<QVariant> list = flowerJson.toVariant().toList();
                             QMap<QString, QVariant> map = list[0].toMap();
                             qDebug() << map["sensor"].toString();
                            /* qDebug() << map["humidity"].toString();
                             qDebug() << map["pressure"].toString();
                             qDebug() << map["temperature"].toString();
                             qDebug() << map["altitude"].toString();
                             qDebug() << map[ "timestamp"].toString();*/

                             ui->lineEdit_1->setText(map["humidity"].toString());
                             ui->lineEdit_2->setText(map["pressure"].toString());
                             ui->lineEdit_3->setText(map["temperature"].toString());
                           //  ui->lineEdit_4->setText(map["altitude"].toString());










        socket->write("Données reçues");
        socket->flush();
        socket->waitForBytesWritten(50);
        socket->close();


    }
    else
    {
        socket->write("Données non reçues");
        socket->flush();
        socket->waitForBytesWritten(50);
        socket->close();
    }
}


