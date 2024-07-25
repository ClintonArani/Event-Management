CREATE TABLE Events (
    Id NVARCHAR(36) PRIMARY KEY,
    Image NVARCHAR(MAX),
    EventDate DATE,
    EventTime TIME,
    Location NVARCHAR(255),
    Price DECIMAL(10,2),
    Description NVARCHAR(255),
    IsBooked BIT DEFAULT 0
);


select * from events


drop TABLE Events