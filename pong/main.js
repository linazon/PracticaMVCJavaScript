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
        this.bounce_angle = 0;
        this.max_bounce_angle = Math.PI / 12;
        this.speed = 3;

        board.ball = this;
        this.kind = "circle";
    }
    self.Ball.prototype ={
        move: function(){
            this.x += (this.speed_x * this.direction);
            this.y += (this.speed_y);
        },
        get width(){
            return this.radius * 2;
        },
        get height(){
            return this.radius * 2;
        },
        collision: function(bar){
            //Reacciona a la colision con una barra que recibe como paramtro
            var relative_intersect_y = ( bar.y + (bar.height / 2) ) - this.y;

            var normalized_intersect_y = relative_intersect_y / (bar.height / 2);

            this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;

            this.speed_y = this.speed * -Math.sin(this.bounce_angle);
            this.speed_x = this.speed * Math.cos(this.bounce_angle);

            if(this.x > (this.board.width / 2)) this.direction = -1;
            else this.direction = 1;
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
        check_collisions:function(){
            for (var i =this.board.bars.length -1; i>= 0; i--){
                var bar = this.board.bars[i];
                if(hit(bar, this.board.ball)){
                    console.log("prueba a");
                    this.board.ball.collision(bar);
                }
            };
        },
        play: function(){
            if(this.board.playing){
                this.clean();
                this.draw();
                this.check_collisions();  
                this.board.ball.move();
            }
        }
    }

    function hit(a,b){
        //revisa si a colisiona con b
        var hit =false;
        //Colisiones horizontales
        if(b.x + b.width >= a.x && b.x < a.x + a.width){
            //Colisiones verticales
            if(b.y +b.height >= a.y && b.y < a.y +a.height)
            hit = true;
        }
        //Colision de a con b
        if(b.x <= a.x && b.x + b.width >= a.x + a.width){
            if(b.y <= a.y && b.y + b.height >= a.y + a.height)
            hit = true;
        }
        //Colision de b con a
        if(a.x <= b.x && a.x + a.width >= b.x + b.width){
            if(a.y <= b.y && a.y + a.height >= b.y + b.height)
            hit = true;
        }
        return hit;
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