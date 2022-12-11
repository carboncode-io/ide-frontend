


const socket = new WebSocket("ws://localhost:6060");

var term = new window.Terminal({
			cursorBlink: "block",
     theme: {
    foreground: '#eff0eb',
    background: '#191919',
    selection: '#97979b33',
    black: '#282a36',
    brightBlack: '#686868',
    red: '#ff5c57',
    brightRed: '#ff5c57',
    green: '#5af78e',
    brightGreen: '#5af78e',
    yellow: '#f3f99d',
    brightYellow: '#f3f99d',
    blue: '#57c7ff',
    brightBlue: '#57c7ff',
    magenta: '#ff6ac1',
    brightMagenta: '#ff6ac1',
    cyan: '#9aedfe',
    brightCyan: '#9aedfe',
    white: '#f1f1f0',
    brightWhite: '#eff0eb'
  }
		});
term.open(document.getElementById('terminal'));

function init_terminal() {
    if (term._initialized) {
        return;
    }

    term._initialized = true;

    term.prompt = () => {
        term.write('\r\n$ ');
    };
    prompt(term);

    term.onData(e => {
        switch (e) {
            case '\u0003': // Ctrl+C
                term.write('^C');
                prompt(term);
                break;
            case '\r': // Enter
                runCommand(term, command);
                command = '';
                break;
            case '\u007F': // Backspace (DEL)
                // Do not delete the prompt
                if (term._core.buffer.x > 2) {
                    term.write('\b \b');
                    if (command.length > 0) {
                        command = command.substr(0, command.length - 1);
                    }
                }
                break;
            case '\u0009':
                console.log('tabbed', output, ["dd", "ls"]);
                break;
            default:
                if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E) || e >= '\u00a0') {
                    command += e;
                    term.write(e);
                }
        }
    });
}

function clearInput(command) {
    var inputLengh = command.length;
    for (var i = 0; i < inputLengh; i++) {
        term.write('\b \b');
    }
}
function prompt(term) {
    command = '';
    term.write('\r\n$ ');
}
socket.onmessage = (event) => {
    term.write(event.data);
}

function runCommand(term, command) {
    if (command.length > 0) {
        clearInput(command);
        socket.send(command + '\n');
        return;
    }
}

init_terminal();
// 		var curr_line = '';
// 		var entries = [];
// 		var currPos = 0;
// 		var pos = 0;

// 		term.open(document.getElementById('terminal'));
// 		term.prompt = () => {
// 			term.write('\n\r' + curr_line + '\r\n\u001b[32mlog> \u001b[37m');
// 		};
// term.write("CarbonCode Bash compiler (V0.0.1)")
// 		term.prompt();
// function h(m){
//   	term.prompt();
//   term.write(m)

// }
// 		term.on('key', function(key, ev) {
// 			const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey &&
// 				!(ev.keyCode === 37 && term.buffer.cursorX < 6);

// 			if (ev.keyCode === 13) { // Enter key
// 				if (curr_line.replace(/^\s+|\s+$/g, '').length != 0) { // Check if string is all whitespace
// 					entries.push(curr_line);
// 					currPos = entries.length - 1;
// 					term.prompt();
// 				} else {
// 					term.write('\n\33[2K\r\u001b[32mlog> \u001b[37m');
// 				}
// 				curr_line = '';
// 			} 
//  else if (ev.keyCode === 8) { // Backspace
// 				if (term.buffer.cursorX > 5) {
// 					curr_line = curr_line.slice(0, term.buffer.cursorX - 6) + curr_line.slice(term.buffer.cursorX - 5);
// 					pos = curr_line.length - term.buffer.cursorX + 6;
// 					term.write('\33[2K\r\u001b[32mlog> \u001b[37m' + curr_line);
// 					term.write('\033['.concat(pos.toString()).concat('D')); //term.write('\033[<N>D');
// 					if (term.buffer.cursorX == 5 || term.buffer.cursorX == curr_line.length + 6) {
// 						term.write('\033[1C')
// 					}
// 				}
// 			} 
//       else if (ev.keyCode === 38) { // Up arrow
// 				if (entries.length > 0) {
// 					if (currPos > 0) {
// 						currPos -= 1;
// 					}
// 					curr_line = entries[currPos];
// 					term.write('\33[2K\r\u001b[32mlog> \u001b[37m' + curr_line);
// 				}
// 			} else if (ev.keyCode === 40) { // Down arrow
// 				currPos += 1;
// 				if (currPos === entries.length || entries.length === 0) {
// 					currPos -= 1;
// 					curr_line = '';
// 					term.write('\33[2K\r\u001b[32mlog> \u001b[37m');
// 				} else {
// 					curr_line = entries[currPos];
// 					term.write('\33[2K\r\u001b[32mlog> \u001b[37m' + curr_line);

// 				}
// 			} else if (printable && !(ev.keyCode === 39 && term.buffer.cursorX > curr_line.length + 4)) {
// 				if (ev.keyCode != 37 && ev.keyCode != 39) {
// 					var input = ev.key;
// 					if (ev.keyCode == 9) { // Tab
// 						input = "    ";
// 					}
// 					pos = curr_line.length - term.buffer.cursorX + 4;
// 					curr_line = [curr_line.slice(0, term.buffer.cursorX - 5), input, curr_line.slice(term.buffer.cursorX - 5)].join('');
// 					term.write('\33[2K\r\u001b[32mlog> \u001b[37m' + curr_line);
// 					term.write('\033['.concat(pos.toString()).concat('D')); //term.write('\033[<N>D');
// 				} else {
// 					term.write(key);
// 				}
// 			}
// 		});

// 		term.on('paste', function(data) {
// 			curr_line += data;
// 			term.write(curr_line);
// 		});

// function print_log(){
//   console.log
// }