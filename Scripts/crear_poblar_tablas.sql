/*tabla jugador*/
create table jugador(
  id int not null,
  nombre char(20) not null,
  puntos int not null,
  estado int not null,
  primary key(id)
 );
/*tabla cartas*/
create table tabla(
  id int not null,
  casta char(20) not null,
  puntos int not null,
  letra char(2) not null,
  estado int not null,
  primary key(id)
 );
/*poblar jugador*/
insert into jugador values(1, '', 0, 0);
insert into jugador values(2, '', 0, 0);
/*poblar jugador*/
INSERT INTO carta VALUES(1,'Coraz�n',20,'A',0);
INSERT INTO carta VALUES(2,'Coraz�n',2,'2',0);
INSERT INTO carta VALUES(3,'Coraz�n',3,'3',0);
INSERT INTO carta VALUES(4,'Coraz�n',4,'4',0);
INSERT INTO carta VALUES(5,'Coraz�n',5,'5',0);
INSERT INTO carta VALUES(6,'Coraz�n',6,'6',0);
INSERT INTO carta VALUES(7,'Coraz�n',7,'7',0);
INSERT INTO carta VALUES(8,'Coraz�n',8,'8',0);
INSERT INTO carta VALUES(9,'Coraz�n',9,'9',0);
INSERT INTO carta VALUES(10,'Coraz�n',10,'10',0);
INSERT INTO carta VALUES(11,'Coraz�n',10,'J',0);
INSERT INTO carta VALUES(12,'Coraz�n',10,'Q',0);
INSERT INTO carta VALUES(13,'Coraz�n',10,'K',0);
INSERT INTO carta VALUES(14,'Diamante',20,'A',0);
INSERT INTO carta VALUES(15,'Diamante',2,'2',0);
INSERT INTO carta VALUES(16,'Diamante',3,'3',0);
INSERT INTO carta VALUES(17,'Diamante',4,'4',0);
INSERT INTO carta VALUES(18,'Diamante',5,'5',0);
INSERT INTO carta VALUES(19,'Diamante',6,'6',0);
INSERT INTO carta VALUES(20,'Diamante',7,'7',0);
INSERT INTO carta VALUES(21,'Diamante',8,'8',0);
INSERT INTO carta VALUES(22,'Diamante',9,'9',0);
INSERT INTO carta VALUES(23,'Diamante',10,'10',0);
INSERT INTO carta VALUES(24,'Diamante',10,'J',0);
INSERT INTO carta VALUES(25,'Diamante',10,'Q',0);
INSERT INTO carta VALUES(26,'Diamante',10,'K',0);
INSERT INTO carta VALUES(27,'Pica',20,'A',0);
INSERT INTO carta VALUES(28,'Pica',2,'2',0);
INSERT INTO carta VALUES(29,'Pica',3,'3',0);
INSERT INTO carta VALUES(30,'Pica',4,'4',0);
INSERT INTO carta VALUES(31,'Pica',5,'5',0);
INSERT INTO carta VALUES(32,'Pica',6,'6',0);
INSERT INTO carta VALUES(33,'Pica',7,'7',0);
INSERT INTO carta VALUES(34,'Pica',8,'8',0);
INSERT INTO carta VALUES(35,'Pica',9,'9',0);
INSERT INTO carta VALUES(36,'Pica',10,'10',0);
INSERT INTO carta VALUES(37,'Pica',10,'J',0);
INSERT INTO carta VALUES(38,'Pica',10,'Q',0);
INSERT INTO carta VALUES(39,'Pica',10,'K',0);
INSERT INTO carta VALUES(40,'Trebol',20,'A',0);
INSERT INTO carta VALUES(41,'Trebol',2,'2',0);
INSERT INTO carta VALUES(42,'Trebol',3,'3',0);
INSERT INTO carta VALUES(43,'Trebol',4,'4',0);
INSERT INTO carta VALUES(44,'Trebol',5,'5',0);
INSERT INTO carta VALUES(45,'Trebol',6,'6',0);
INSERT INTO carta VALUES(46,'Trebol',7,'7',0);
INSERT INTO carta VALUES(47,'Trebol',8,'8',0);
INSERT INTO carta VALUES(48,'Trebol',9,'9',0);
INSERT INTO carta VALUES(49,'Trebol',10,'10',0);
INSERT INTO carta VALUES(50,'Trebol',10,'J',0);
INSERT INTO carta VALUES(51,'Trebol',10,'Q',0);
INSERT INTO carta VALUES(52,'Trebol',10,'K',0);

