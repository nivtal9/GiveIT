
    drop table notifications cascade constraints

    drop table images cascade constraints

    drop table categories cascade constraints

    drop table statuses cascade constraints

    drop table subcategories cascade constraints

    drop table locations cascade constraints

    drop table items cascade constraints

    drop table favorites cascade constraints

    drop table users cascade constraints

    drop sequence hibernate_sequence

    create table notifications (
        Id NUMBER(10,0) not null,
       Email VARCHAR2(255),
       SubCategoryId NUMBER(10,0),
       primary key (Id)
    )

    create table images (
        Id NUMBER(10,0) not null,
       ImageUrl VARCHAR2(255),
       ItemId NUMBER(10,0),
       primary key (Id)
    )

    create table categories (
        Id NUMBER(10,0) not null,
       Name VARCHAR2(255),
       primary key (Id)
    )

    create table statuses (
        Id NUMBER(10,0) not null,
       Condition VARCHAR2(255),
       primary key (Id)
    )

    create table subcategories (
        Id NUMBER(10,0) not null,
       Name VARCHAR2(255),
       CategoryId NUMBER(10,0),
       primary key (Id)
    )

    create table locations (
        Id NUMBER(10,0) not null,
       Area VARCHAR2(255),
       primary key (Id)
    )

    create table items (
        Id NUMBER(10,0) not null,
       Name VARCHAR2(255),
       Height NUMBER(10,0),
       Length NUMBER(10,0),
       Width NUMBER(10,0),
       Details VARCHAR2(255),
       CreationDate TIMESTAMP(7),
       SubCategoryId NUMBER(10,0),
       UserId NUMBER(10,0),
       LocationId NUMBER(10,0),
       StatusId NUMBER(10,0),
       primary key (Id)
    )

    create table favorites (
        ItemId NUMBER(10,0) not null,
       UserId NUMBER(10,0) not null,
       primary key (UserId, ItemId)
    )

    create table users (
        Id NUMBER(10,0) not null,
       Username VARCHAR2(255),
       PasswordHash RAW(2000),
       PasswordSalt RAW(2000),
       FullName VARCHAR2(255),
       PhoneNumber VARCHAR2(255),
       Email VARCHAR2(255),
       primary key (Id)
    )

    alter table notifications 
        add constraint FK_B7F40A22 
        foreign key (SubCategoryId) 
        references subcategories

    alter table images 
        add constraint FK_84B507C2 
        foreign key (ItemId) 
        references items

    alter table subcategories 
        add constraint FK_47679758 
        foreign key (CategoryId) 
        references categories

    alter table items 
        add constraint FK_CA0EC3C4 
        foreign key (SubCategoryId) 
        references subcategories

    alter table items 
        add constraint FK_DE94A2CA 
        foreign key (UserId) 
        references users

    alter table items 
        add constraint FK_11407C8C 
        foreign key (LocationId) 
        references locations

    alter table items 
        add constraint FK_BDCB5BE4 
        foreign key (StatusId) 
        references statuses

    alter table favorites 
        add constraint FK_72068DC2 
        foreign key (UserId) 
        references users

    alter table favorites 
        add constraint FK_EA22D38D 
        foreign key (ItemId) 
        references items

    create sequence hibernate_sequence
