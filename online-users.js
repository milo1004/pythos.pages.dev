// Initialize Firebase Realtime Database
const database = firebase.database();

// Reference to the online users node
const onlineUsersRef = database.ref('online_users');

// Function to update user's online status
function updateOnlineStatus() {
    // Get the current user
    const user = firebase.auth().currentUser;
    
    if (user) {
        // Create a reference to this user's online status
        const userStatusRef = database.ref(`online_users/${user.uid}`);
        
        // Create references for online/offline status
        const isOfflineForDatabase = {
            status: 'offline',
            lastSeen: firebase.database.ServerValue.TIMESTAMP,
        };

        const isOnlineForDatabase = {
            status: 'online',
            lastSeen: firebase.database.ServerValue.TIMESTAMP,
            email: user.email,
            displayName: user.displayName || user.email.split('@')[0],
            photoURL: user.photoURL || null
        };

        // When the client's connection state changes, update the user's online status
        database.ref('.info/connected').on('value', (snapshot) => {
            if (snapshot.val() === false) {
                return;
            }

            // If the client is connected, set up the online status
            userStatusRef.onDisconnect().set(isOfflineForDatabase).then(() => {
                userStatusRef.set(isOnlineForDatabase);
            });
        });
    }
}

// Function to get the count of online users
function getOnlineUsersCount(callback) {
    onlineUsersRef.on('value', (snapshot) => {
        let count = 0;
        snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().status === 'online') {
                count++;
            }
        });
        callback(count);
    });
}

// Function to get the list of online users
function getOnlineUsersList(callback) {
    onlineUsersRef.on('value', (snapshot) => {
        const onlineUsers = [];
        snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            if (userData.status === 'online') {
                onlineUsers.push({
                    uid: childSnapshot.key,
                    ...userData
                });
            }
        });
        callback(onlineUsers);
    });
}

// Export the functions
window.onlineUsers = {
    updateOnlineStatus,
    getOnlineUsersCount,
    getOnlineUsersList
}; 
