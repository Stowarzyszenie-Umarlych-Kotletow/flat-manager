db.createUser(
    {
        user: "flatmanager",
        pwd: "flatmanagerpwd",
        roles: [
            {
                role: "readWrite",
                db: "flatmanager"
            }
        ]
    }
);
