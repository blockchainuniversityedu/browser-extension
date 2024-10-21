const socket = new WebSocket('ws://localhost:3000'); // Connect to the backend WebSocket server
socket.onmessage = function(event) {
    const post = JSON.parse(event.data);

    // Create a notification for the published post
    chrome.notifications.create({
        type: "basic",
        iconUrl: 'icon.png',
        title: post.title,
        message: post.body,
        priority: 2
    });
};



                