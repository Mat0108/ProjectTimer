db.createUser ({
    user : "timer",
    pwd : "timerpass",
    roles : [{
        role : "readWrite", db : "timerdb"
    }]
});

db.auth('timer', 'timerpass');