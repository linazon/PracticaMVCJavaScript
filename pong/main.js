//creo mi tablero 
(function(){
     self.Board = function(width,height){
        this.width = width;
        this.height = height; //tamaño tablero
        this.playing = false; // var bool, si esta jugando
        this.game_over = false; // var bool, si perdio
        this.bars = [];
        this.ball = null;
        this.playing = false;
    }

    // modificar el prototipo para agregar los metodos
    self.Board.prototype = {
        //agregar objeto json
        get elements(){
            // me trae los elementos (bars)
            var elements = this.bars.map(function(bar){return bar;}); // barras laterales del juego
            elements.push(this.ball);
            return elements;
        }
    }
})();

//clase pelota
(function(){
    self.Ball = function(x,y,radius,board){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;
        this.direction = 1;

        board.ball = this;
        this.kind = "circle";
    }
    self.Ball.prototype ={
        move: function(){
            this.x += (this.speed_x * this.direction);
            this.y += (this.speed_y);
        }
    }
})();

//dibujar las barras
(function(){
    self.Bar = function(x,y,width,height,board){
        this.x= x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        //traigo el objeto board, luego el arreglo bars y con push le agrego el objeto bar (misma funcion)
        this.board.bars.push(this);
        //le aviso al canvas que voy a dibujar un rectangulo
        this.kind ="rectangle";
        this.speed = 10; //define el atributo para la velocidad de las barras
    }

    self.Bar.prototype ={
        // funciones para mover la barra
        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: " +this.x+ "y: " +this.y;
        }
    }
})();

// clase para dibujar el tablero
(function(){
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width; //le asigno el tamaño al canva
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");// usa el getcontext propio del canvas y se lo asigna al objet ctx
    }

    self.BoardView.prototype = {
        clean: function(){
            //console.log(":p")
            this.ctx.clearRect(0,0,this.board.width,this.board.height);
        },
        draw: function(){
            for (var i = this.board.elements.length -1; i>= 0; i--){
                var el = this.board.elements[i];
                draw(this.ctx,el);
            };
        },
        play: function(){
            if(this.board.playing){
                this.clean();
                this.draw();  
                this.board.ball.move();
            }
        }
    }

    //dibuja las barras y la pelota en el tablero
    function draw(ctx,element){
        //if(element !== null && element.hasOwnProperty("kind")){
            switch(element.kind){
                case "rectangle":
                    ctx.fillRect(element.x, element.y, element.width, element.height);
                break;
                case "circle":
                    ctx.beginPath();
                    ctx.arc(element.x,element.y,element.radius,0,7);
                    ctx.fill();
                    ctx.closePath();
                break;
            }
        //}
        
    }
})();

var board = new Board(800,400);
var bar_2 = new Bar(20,150,40,100,board);
var bar = new Bar(740,150,40,100,board);
var limite = new Bar(50,10,700,10,board);
var limite = new Bar(50,380,700,10,board);
var canvas = document.getElementById('canvas');
var board_View = new BoardView(canvas,board);
var ball = new Ball(350,150,10,board);

//ejecuto las funciones up y down, según se oprima las teclas
document.addEventListener("keydown",function(ev){
    
    if(ev.keyCode == 38){
        ev.preventDefault();
        bar.up();
    }else if(ev.keyCode ==40){
        ev.preventDefault();
        bar.down();
    }else if(ev.keyCode === 87){
        ev.preventDefault();
        bar_2.up();
        //w
    }else if(ev.keyCode === 83){
        ev.preventDefault();
        bar_2.down();
        //s
    }else if(ev.keyCode === 32){
        ev.preventDefault();
        board.playing = !board.playing;
    }

    console.log(""+bar_2);
});

// ejecutar cuando sale la ventana
//self.addEventListener("load",main);

board_View.draw();

window.requestAnimationFrame(controller);
//setTimeout(function(){
   // ball.direction = -1;
//},4000);

function controller(){
    //board_View.clean();
    //board_View.draw();
    board_View.play();
    window.requestAnimationFrame(controller);
}