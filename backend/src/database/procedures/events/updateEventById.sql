CREATE PROCEDURE UpdateEventById
    @Id NVARCHAR(36),
    @Image NVARCHAR(MAX),
    @EventDate DATE,
    @EventTime TIME,
    @Location NVARCHAR(255),
    @Price DECIMAL(10,2),
    @Description NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Update the event by Id
    UPDATE Events
    SET 
        Image = @Image,
        EventDate = @EventDate,
        EventTime = @EventTime,
        Location = @Location,
        Price = @Price,
        Description = @Description
    WHERE Id = @Id;

    -- Check if the update operation was successful
    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR('No event found with the specified Id.', 16, 1);
    END
END



-- drop PROCEDURE UpdateEventById