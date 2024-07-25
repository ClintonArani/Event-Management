CREATE PROCEDURE insertBooking
    @BookingId VARCHAR(36), -- Changed to VARCHAR for UUID
    @UserId VARCHAR(255),
    @EventId NVARCHAR(36),
    @Type NVARCHAR(10),
    @NumberOfPeople INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @EventPrice DECIMAL(10, 2);

    -- Fetch event price
    SELECT @EventPrice = Price
    FROM Events
    WHERE Id = @EventId;

    IF @EventPrice IS NULL
    BEGIN
        RAISERROR('Event not found with Id: %s', 16, 1, @EventId);
        RETURN;
    END

    DECLARE @TotalPrice DECIMAL(10, 2);

    -- Calculate total price based on type and number of people
    IF @Type = 'single'
    BEGIN
        SET @TotalPrice = @EventPrice * @NumberOfPeople;
    END
    ELSE IF @Type = 'group'
    BEGIN
        IF @NumberOfPeople >= 8
        BEGIN
            SET @TotalPrice = @EventPrice * @NumberOfPeople * 0.6; -- 40% discount for 8 or more people
        END
        ELSE IF @NumberOfPeople >= 4
        BEGIN
            SET @TotalPrice = @EventPrice * @NumberOfPeople * 0.8; -- 20% discount for 4 to 7 people
        END
        ELSE IF @NumberOfPeople >= 2
        BEGIN
            SET @TotalPrice = @EventPrice * @NumberOfPeople * 0.9; -- 10% discount for 2 to 3 people
        END
        ELSE
        BEGIN
            SET @TotalPrice = @EventPrice * @NumberOfPeople; -- No discount for 1 person
        END
    END
    ELSE
    BEGIN
        RAISERROR('Invalid booking type: %s', 16, 1, @Type);
        RETURN;
    END

    -- Insert the booking into the Bookings table
    INSERT INTO Bookings (Id, UserId, EventId, Type, BookingDate, NumberOfPeople, TotalPrice)
    VALUES (@BookingId, @UserId, @EventId, @Type, GETDATE(), @NumberOfPeople, @TotalPrice);

    SELECT @BookingId AS BookingId; -- Return the ID of the newly inserted booking
END






-- drop PROCEDURE insertBooking
