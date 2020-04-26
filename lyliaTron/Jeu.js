function Coordonnee(x, y) {
    this.x = x;
    this.y = y;
    this.copy = function () {
        return new Coordonnee(this.x, this.y);
    };
}

function Joueur(nom) {
    this.nom = nom;
    this.direction = null;
    this.position = {};
    this.trace = [];
    
    this.setPos = function(position) {
		this.position = position;
		this.trace.push(this.position.copy());
	}
    
    this.changeDirection = function (direction) {
        if (direction === "right" || direction === "left") {
            if (this.direction === "38" || this.direction === "40") {
                this.direction = direction;
			//	console.log("direction changed in player");
            }
        } else if (direction === "38" || direction === "40") {
            if (this.direction === "right" || this.direction === "left") {
                this.direction = direction;
			//	console.log("direction changed in player")
			}
        }
        return this;
    };
    
    this.avancer = function () {
        if(this.direction === "right") {
            this.position.x++;
            this.trace.push(this.position.copy());
        } else if (this.direction === "left") {
            this.position.x--;
            this.trace.push(this.position.copy());
        } else if (this.direction === "38") {
            this.position.y--;
            this.trace.push(this.position.copy());
        } else if (this.direction === "40") {
            this.position.y++;
            this.trace.push(this.position.copy());
        }
        return this;
    };
}

//var Joueur = require('./Joueur.js');

var joueurs = [];
var morts = [];
var HAUTEUR = 40;
var LARGEUR = 70;
var active = false;
var start = function () {	//
	this.active = true;
	//console.log("active: " + active);
};



var addJoueur = function (joueur) {	 
    var nJoueur = joueur;
    var jo = new Joueur(nJoueur);
    if (joueurs.length==0){
         jo.setPos(new Coordonnee(50,10));
        jo.direction = "left";}
   
    else if(joueurs.length==1){
        jo.setPos(new Coordonnee(20,30));
        jo.direction = "right";
    }
    joueurs.push(jo);
	return nJoueur;
};
		
var changeDirections = function (nom, direction) {
    for (i = 0; i < joueurs.length; i++) {
        if (joueurs[i].nom === nom) {
            joueurs[i].changeDirection(direction);
            break;
        }
    }
};

var next = function () {	 //fais avancer tous les joueur et met a jour les trace
    for (i = 0; i < joueurs.length; i++) {
        joueurs[i].avancer();
       if(!(joueurs[i].position.x >= LARGEUR || joueurs[i].position.x < 0 || joueurs[i].position.y >= HAUTEUR || joueurs[i].position.y < 0)) {
      //  canvas[joueurs[i].position.x][joueurs[i].position.y] = case_occuper;
    }
    }
};
		
var curState = function () { //renvois le fichier JSON a donner au client
    var table = [];
    for (i = 0; i < joueurs.length; i++) {
        var object = {};
        object.nom = joueurs[i].nom;
        object.trace = joueurs[i].trace;
        table.push(object);
    }
            
    return JSON.stringify(table);
};

var collisionJ = function(joueur) {
	for(var i = 0; i < joueurs.length; i++) {
		for(var j = 0; j < joueurs[i].trace.length; j++) {
			if(!(joueur===joueurs[i] && j+1 === joueurs[i].trace.length)) { //ignore if j and i is same player and if trace is current position
              if(joueur.position.x === joueurs[i].trace[j].x && joueur.position.y === joueurs[i].trace[j].y){
                return true;
            }
			}
		
		}
	}
	return false;
}


var kill = function(victime) {
	for(var i = 0; i<joueurs.length; i++) {
		if(victime === joueurs[i].nom) {
			morts = morts.concat(joueurs.splice(i, 1));
			
			break;
		}
	}
}
    
var collision = function () {	//renvois les joueurs qui on fait une collision
    var res = [];
    var found = false;
    var mort;
    
    for (i = 0; i < joueurs.length; i++) { //On vérifie pour chaque joueur qu'il n'y a pas de collision
        if(joueurs[i].position.x >= LARGEUR || joueurs[i].position.x < 0 || joueurs[i].position.y >= HAUTEUR || joueurs[i].position.y < 0) {
            res.push(joueurs[i].nom);
			
		//	console.log("out-of-canvas");
			//console.log(joueurs[i].nom);
        } else if(collisionJ(joueurs[i])) {
			res.push(joueurs[i].nom);
		} 
	}
	
	for(var i = 0; i<res.length; i++) {
		kill(res[i]);
	}
	
	return res;
};
		
var end = function () {	//renvois true si il y a 1 joueur ou moins
    return (joueurs.length < 2);
};
		
var winner = function () {	//renvois le gagnant
    if (joueurs.length === 1) {
        return joueurs[0].nom;
    }
    return null;
};	    
var reset = function () {
    this.active = false;
    joueurs.splice(0);
    morts.splice(0);
};

module.exports.start = start;
module.exports.active = active;
module.exports.joueurs = joueurs;
module.exports.addJoueur = addJoueur;
module.exports.changeDirection = changeDirections;
module.exports.next = next;
module.exports.curState = curState;
module.exports.collision = collision;
module.exports.end = end;
module.exports.winner = winner;
module.exports.reset = reset;