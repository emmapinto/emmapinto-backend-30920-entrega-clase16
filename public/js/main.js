let socket = io.connect(); 

socket.on('messages', function(data) { 
  console.log(data);
  render(data);
});

const currentDate = () => {
  const today = new Date();
  const date = today.getFullYear()+"/"+ today.getMonth()+"/"+ today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date+" - "+time;
}

function render(data) { 
    let html = data.map(function(elem, index){ 
      return(`<div>
            <span style="color: blue"><strong>${elem.author}</strong>: 
            <span style="color: brown">[${currentDate()}]</span>
            <span style="color: green">: <em>${elem.text}</em>
            </div>`)
    }).join(" "); 
    document.getElementById('messages').innerHTML = html; 
}

function addMessage(e) { 
    let mensaje = { 
      author: document.getElementById('username').value, 
      text: document.getElementById('texto').value
    }; 
    socket.emit('new-message', mensaje); // new-message es el nombre del evento (recordatorio)

    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()

    return false;
}