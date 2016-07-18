CREATE TABLE members (
  members_id serial NOT NULL,
  members_name varchar(255) NOT NULL,
  members_descript varchar(255) NOT NULL,
  last_message_id int NOT NULL
);

INSERT INTO members (members_id,members_name,members_descript,last_message_id) VALUES
(1,'<@U0V1ZHGJ3>','Edmund Korley, CODE 2040 Safety & Justice Intern',1),
(2,'<@U039XHJAA>','Tomas Apocada, Senior Safety & Justice Engineer',2),
(3,'<@U02S61FF2>','Tiffany Andrews, Safety & Justice Product Manager, 2015 Fellow',3);

CREATE TABLE messages (
  messages_id serial NOT NULL,
  messages_text varchar(255) NOT NULL,
  receivers_id int NOT NULL,
  receivers_name varchar(255) NOT NULL,
  time_to_post varchar(255) NOT NULL,
  senders_id int NOT NULL,
  senders_name varchar(255) NOT NULL
);

INSERT INTO messages (messages_id,messages_text,receivers_id,receivers_name,time_to_post,senders_id,senders_name) VALUES
(1,'Hey, you, <@U02S61FF2>, and <@U039XHJAA> are starting the Wayne county police dashboard project soon, time 4 a kick-off potluck 🍲🍰',1,'<@U0V1ZHGJ3>','2016-06-24 09:30:50',1,'<@U0V1ZHGJ3>'),
(2,'Hey, you, <@U02S61FF2>, and <@U0V1ZHGJ3> are starting the Wayne county police dashboard project soon, time 4 a kick-off potluck 🍲🍰',2,'<@U039XHJAA>','2016-06-24 09:30:50',1,'<@U0V1ZHGJ3>'),
(3,'Hey, you, <@U039XHJAA>, and <@U0V1ZHGJ3> are starting the Wayne county police dashboard project soon, time 4 a kick-off potluck 🍲🍰',3,'<@U02S61FF2>','2016-06-24 09:30:50',1,'<@U0V1ZHGJ3>');

CREATE TABLE resources (
  resources_id serial NOT NULL,
  resources_title varchar(255) NOT NULL,
  resources_keywords varchar(255) NOT NULL,
  resources_link varchar(255) NOT NULL
);

INSERT INTO resources (resources_id,resources_title,resources_keywords,resources_link) VALUES
(1,'List of Code of America staff contact info','The contact info for all Code for America staff','https://docs.google.com/spreadsheets/d/18kj03DeHBSN4wIWxGk8xMrZz95tR7-HQtIc3cneMRDw/edit?ts=575ee783#gid=6');
