CREATE PROCEDURE DeleteEventById
    @Id NVARCHAR(36)
AS
BEGIN
    SET NOCOUNT ON;

    -- Delete the event by Id
    DELETE FROM Events
    WHERE Id = @Id;

    -- Check if the delete operation was successful
    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR('No event found with the specified Id.', 16, 1);
    END
END




