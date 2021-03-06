-- logger database schema: database for logging dirty computers, memories, and whether the computer has been cleaned

-- drop logger database if exists
drop database if exists logger_db;

-- create logger database
create database logger_db;

-- use logger database
use logger_db;

-- create dirty computer table
-- fields: id int not null; dc_name not null; dc_memory_1 not null, cleaned 
create table dirty_computers (
    id int not null auto_increment,
    dc_name varchar(30) not null,
    dc_memory_1 varchar(300) not null,
    cleaned boolean default false,
    clean_name varchar(30),
    primary key (id)
);

