CREATE OR ALTER PROCEDURE InsertEvent
    @Id NVARCHAR(36),
    @Image NVARCHAR(MAX),
    @EventDate DATE,
    @EventTime TIME,
    @Location NVARCHAR(255),
    @Price DECIMAL(10,2),
    @Description NVARCHAR(255)
AS
BEGIN

    INSERT INTO Events (Id, Image, EventDate, EventTime, Location, Price, Description)
    VALUES (@Id, @Image, @EventDate, @EventTime, @Location, @Price, @Description);
END


drop PROCEDURE InsertEvent