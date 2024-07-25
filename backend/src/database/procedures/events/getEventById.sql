CREATE PROCEDURE GetEventById
    @Id NVARCHAR(36)
AS
BEGIN
    SET NOCOUNT ON;

    -- Select the event by Id
    SELECT Id, Image, EventDate, EventTime, Location, Price, Description, IsBooked
    FROM Events
    WHERE Id = @Id;
END



drop procedure GetEventById
