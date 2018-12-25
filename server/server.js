var io = require('socket.io')(1337);
var socketNames = [];
io.on('connection',(socket)=>{
	let nickname='';
	socket.on('nickname',(nick)=>{
		if(socketNames.includes(nick)){
			console.log('Bu kullanıcı zaten bağlı');
			socket.emit('checkNickname','Bu kullanıcı zaten bağlı');
		}else{
			nickname=nick;
			socketNames.push(nick);
			console.log(nick+' bağlandı');
			socket.emit('checkNickname','Bağlandınız');
		}
	})
	socket.on('disconnect',()=>{
		for ( var i = 0 ; i < socketNames.length; i++ ){
			if(socketNames[i]==nickname) socketNames.splice(i,1);
		}
		if(nickname!==''){ console.log(nickname+' ayrıldı') }
	});
	socket.on('message',(msg)=>{
		if(nickname!==''){
			console.log(nickname+': '+msg);
			io.send(nickname+': '+msg);
		}
	})
})
