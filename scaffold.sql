CREATE TABLE members (
  member_id serial NOT NULL,
  member_name varchar(255) NOT NULL,
  member_descript varchar(255) NOT NULL,
  last_message_id int NOT NULL
);

INSERT INTO members (member_id,member_name,member_descript,last_message_id) VALUES
(1,'<@U0V1ZHGJ3>','Edmund Korley, CODE 2040 Safety & Justice Intern',1),
(2,'<@U039XHJAA>','Tomas Apocada, Senior Safety & Justice Engineer',2),
(3,'<@U02S61FF2>','Tiffany Andrews, Safety & Justice Product Manager, 2015 Fellow',3);

CREATE TABLE messages (
  msg_id serial NOT NULL,
  msg_text varchar(255) NOT NULL,
  receiver_id int NOT NULL,
  receiver_name varchar(255) NOT NULL,
  time_to_post varchar(255) NOT NULL,
  sender_id int NOT NULL,
  sender_name varchar(255) NOT NULL
);

INSERT INTO messages (msg_id,msg_text,receiver_id,receiver_name,time_to_post,sender_id,sender_name) VALUES
(1,'Hey, you, <@U02S61FF2>, and <@U039XHJAA> are starting the Wayne county police dashboard project soon, time 4 a kick-off potluck 🍲🍰',1,'<@U0V1ZHGJ3>','2016-06-24 09:30:50',1,'<@U0V1ZHGJ3>'),
(2,'Hey, you, <@U02S61FF2>, and <@U0V1ZHGJ3> are starting the Wayne county police dashboard project soon, time 4 a kick-off potluck 🍲🍰',2,'<@U039XHJAA>','2016-06-24 09:30:50',1,'<@U0V1ZHGJ3>'),
(3,'Hey, you, <@U039XHJAA>, and <@U0V1ZHGJ3> are starting the Wayne county police dashboard project soon, time 4 a kick-off potluck 🍲🍰',3,'<@U02S61FF2>','2016-06-24 09:30:50',1,'<@U0V1ZHGJ3>');

CREATE TABLE resources (
  resource_id serial NOT NULL,
  resource_title varchar(255) NOT NULL,
  resource_keywords varchar(255) NOT NULL,
  resource_link varchar(255) NOT NULL
);

INSERT INTO resources (resource_id,resource_title,resource_keywords,resource_link) VALUES
(1,'List of Code of America staff contact info','The contact info for all Code for America staff','https://docs.google.com/spreadsheets/d/18kj03DeHBSN4wIWxGk8xMrZz95tR7-HQtIc3cneMRDw/edit?ts=575ee783#gid=6');
