






----DROP TABLE DEPARTMENTS

--CREATE TABLE dbo.DEPARTMENTS 
--(
--    DepartmentID           uniqueidentifier NOT NULL Default(newsequentialid())
--   ,Departmentname         nvarchar(50)     NOT NULL Default('')
--   ,DepartmentDescription  nvarchar(50)     NOT NULL DEfault('')
--   ,CONSTRAINT PK_DEPARTMENTS Primary KEY CLUSTERED ([DepartmentID])
--)
--SELECT * FROM DEPARTMENTS

----DROP TABLE CATEGORIES

--CREATE TABLE dbo.CATEGORIES 
--(
--    CategoryID           uniqueidentifier    NOT NULL Primary Key Default(newsequentialid())
--   ,CategoryName         nvarchar(50)         NOT NULL Default('')
--   ,CategoryDescription  nvarchar(50)         NOT NULL Default('')
--   ,DepartmentID         uniqueidentifier     NULL
--)
--ALTER TABLE dbo.CATEGORIES ADD CONSTRAINT FK_CATEGORIES FOREIGN KEY (DepartmentID) REFERENCES dbo.DEPARTMENTS (DepartmentID)
--SELECT * FROM CATEGORIES


----DROP TABLE PAYMENTTYPES

--CREATE TABLE dbo.PAYMENTTYPES
--(
--    PaymentID    uniqueidentifier NOT NULL Primary Key Default(newsequentialid())
--   ,PaymentType  nvarchar(50)     NOT NULL Default('')
--)
--SELECT * FROM PAYMENTTYPES

----DROP TABLE USERS

--CREATE TABLE dbo.USERS 
--(
--    UserID        uniqueidentifier NOT NULL Primary Key Default(newsequentialid())
--   ,UserFirst     nvarchar(50)     NOT NULL Default('')
--   ,UserLast      nvarchar(50)     NOT NULL Default('')
--   ,UserAddress1  nvarchar(300)        NULL Default('')
--   ,UserAddress2  nvarchar(300)        NULL Default('')
--   ,UserCity      varchar(50)          NULL Default('')
--   ,UserZip       int              NOT NULL Default(0)
--   ,UserState     varchar(30)      NOT NULL Default('')
--   ,PaymentID     uniqueidentifier     NULL
--   ,UserUID       varchar(50)          NULL
--   ,UserRole      varchar(50)      NOT NULL Default('CUSTOMER')
--)
--ALTER TABLE dbo.USERS ADD CONSTRAINT FK_USERS FOREIGN KEY (PaymentID) REFERENCES dbo.PAYMENTTYPES (PaymentID)
--SELECT * FROM USERS

----DROP TABLE ITEMS

--CREATE TABLE dbo.ITEMS 
--(
--    ItemID           uniqueidentifier NOT NULL Primary Key Default(newsequentialid())
--   ,ItemName         nvarchar(50)     NOT NULL Default('')
--   ,ItemDescription  nvarchar(50)     NOT NULL Default('')
--   ,ItemPrice        decimal(8, 2)    NOT NULL Default(0.0)         
--   ,CategoryID       uniqueidentifier NOT NULL
--   ,SellerID         uniqueidentifier NOT NULL
--   ,CreatedDate      smalldatetime    NOT NULL Default(CAST(GETDATE() AS SMALLDATETIME))
--)
--ALTER TABLE dbo.ITEMS ADD CONSTRAINT FK_ITEMS FOREIGN KEY (CategoryID) REFERENCES dbo.CATEGORIES (CategoryID)
--ALTER TABLE dbo.ITEMS ADD CONSTRAINT FK_ITEMSSellerID FOREIGN KEY (SellerID)   REFERENCES dbo.USERS (UserID)
--SELECT * FROM ITEMS

----DROP TABLE ORDERS

--CREATE TABLE dbo.ORDERS 
--(
--    OrderID     uniqueidentifier NOT NULL Primary Key Default(newsequentialid())
--   ,UserID      uniqueidentifier NOT NULL Default('')
--   ,PaymentID   uniqueidentifier NOT NULL Default('')
--   ,OrderAmount decimal(10, 2)   NOT NULL Default(0.0)
--   ,OrderDate   smalldatetime    NOT NULL Default(CAST(GETDATE() AS SMALLDATETIME))
--   ,ShipDate    smalldatetime        NULL 
--   ,Completed   bit                  NULL Default(0)  
--)
--ALTER TABLE dbo.ORDERS ADD FOREIGN KEY (UserID) REFERENCES dbo.USERS (UserID)
--ALTER TABLE dbo.ORDERS ADD  FOREIGN KEY (PaymentID) REFERENCES dbo.PAYMENTTYPES (PaymentID)
--SELECT * FROM ORDERS

----DROP TABLE CART

--CREATE TABLE dbo.CARTS
--(
--    CartID      uniqueidentifier NOT NULL Primary Key Default(newsequentialid())
--   ,UserID      uniqueidentifier NOT NULL Default('')
--   ,OrderAmount decimal(10, 2)   NOT NULL Default(0.0)
--   ,Completed   bit                  NULL Default(0)  
--)
--ALTER TABLE dbo.CARTS ADD FOREIGN KEY (UserID) REFERENCES dbo.USERS (UserID)
--SELECT * FROM ORDERS

----DROP TABLE ORDERDETAILS

--CREATE TABLE dbo.ORDERDETAILS 
--(
--    OrderID       uniqueidentifier NOT NULL
--   ,ItemID        uniqueidentifier NOT NULL
--   ,ItemQuantity  int              NOT NULL Default(0)
--   ,ItemPrice     decimal(8, 2)    NOT NULL Default(0.0)
--)
--ALTER TABLE dbo.ORDERDETAILS 
--  ADD FOREIGN KEY (OrderID) REFERENCES dbo.ORDERS (OrderID)
--     ,FOREIGN KEY (ItemID) REFERENCES dbo.ITEMS (ItemID)
--     ,PRIMARY KEY CLUSTERED ([OrderID], [ItemID])
--SELECT * FROM ORDERDETAILS

--DROP TABLE CARTDETAILS

CREATE TABLE dbo.CARTDETAILS 
(
    CartID       uniqueidentifier NOT NULL
   ,ItemID        uniqueidentifier NOT NULL
   ,ItemQuantity  int              NOT NULL Default(0)
   ,ItemPrice     decimal(8, 2)    NOT NULL Default(0.0)
   ,Completed     bit              NOT NULL Default(0)
)
ALTER TABLE dbo.CARTDETAILS 
  ADD FOREIGN KEY (CartID) REFERENCES dbo.CARTS (CartID)
     ,FOREIGN KEY (ItemID) REFERENCES dbo.ITEMS (ItemID)
     ,PRIMARY KEY CLUSTERED ([CartID], [ItemID])
SELECT * FROM CARTDETAILS





























































