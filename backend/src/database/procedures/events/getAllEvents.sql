CREATE PROCEDURE GetAllEvents
AS
BEGIN
    SET NOCOUNT ON;

    -- Select all events
    SELECT Id, Image, EventDate, EventTime, Location, Price, Description, IsBooked
    FROM Events;
END


drop procedure GetAllEvents