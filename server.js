let app = require('express')()
let server = require('http').createServer(app)
let io = require('socket.io')(server, { cors: { origin: '*' } })
// const Filter = require('bad-words');


io.on('connection', (socket) => {
    socket.on('disconnect', function () {
        io.emit('usersActivity', {
            user: socket.username,
            event: 'chatLeft'
        });
    });

    socket.on('join', (chatRoomId) => {
        console.log('joined chatrom ' + chatRoomId)
        socket.join(chatRoomId)
    })

    socket.on('sendMessage', (message) => {
        // console.log(message)

        // ----------Bad Words----------
        // const filter = new Filter()
        // if (filter.isProfane(message.text)) {
        //   return 'Profanity is not allowed'
        // }

        io.to(message.chatRoom).emit('message', {
            msg: message.text,
            user: message.userId,
        })
    });
});

let port = process.env.PORT || 3001
server.listen(port, () => {
    console.log('Server Started')
});