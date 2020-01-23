
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QString>
#include <QTcpServer>
#include <QTcpSocket>

using namespace std;


const int default_port = 4242;



namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private:
    QTcpServer *server;
    QTcpSocket *socket;

private slots:
void connection_tcp();
void lecture_donnees_socket();

private:
    Ui::MainWindow *ui;
};

#endif // MAINWINDOW_H
