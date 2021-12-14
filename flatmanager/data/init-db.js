db.createUser(
    {
        user: "flatmanager",
        password: "flatmanagerpwd",
        roles: {
            role: "readWrite",
            db: "flatmanager"
        }
    }
)