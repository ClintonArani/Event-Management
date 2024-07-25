CREATE TABLE Bookings (
    Id NVARCHAR(36) PRIMARY KEY,
    UserId VARCHAR(255),
    EventId NVARCHAR(36),
    Type NVARCHAR(10) CHECK (Type IN ('single', 'group')),
    BookingDate DATETIME NOT NULL,
    NumberOfPeople INT CHECK (NumberOfPeople > 0),
    TotalPrice DECIMAL(10, 2),
    CONSTRAINT FK_Bookings_Users FOREIGN KEY (UserId) REFERENCES users(Id),
    CONSTRAINT FK_Bookings_Events FOREIGN KEY (EventId) REFERENCES events(Id)
);



drop table bookings