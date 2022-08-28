
let canvas;
let c;
const gravity = 0.7

const background = new Sprite({
	position:
	{
		x:0,
		y:0
	},
	scale: 1,
	srcIMG: './assets/tmp/Background-Outer-Drive-Bridge.png'})
const car = new Sprite({
	position:
	{
		x:-2800,
		y:470
	},
	srcIMG: './assets/tmp/ArmanCarFunny.png',
	scale: 0.8,
	framesMAX: 6})
const player = new Fighter({
	position:{
		x:100, 
		y:0
	},
	velocity:{
		x:0, 
		y:0
	},
	offset:{
		x: 0,
		y: 0
	},
	srcIMG: './assets/tmp/AlexIDLEFINAL.png',
	framesMAX: 8,
	scale: 0.7,
	offset : {x:150, y:50},
	sprites:{
		idle:{
			srcIMG: './assets/tmp/AlexIDLEFINAL.png',
			framesMAX:8
		},
		runRight:{
			srcIMG: './assets/tmp/AlexRunR.png',
			framesMAX:8,
			scale: 0.4
		},
		runLeft:{
			srcIMG: './assets/tmp/Alex RunL.png',
			framesMAX:8,
			scale: 0.4
		},
		jumpLeft:{
			srcIMG: './assets/tmp/AlexJumpL.png',
			framesMAX:2,
			scale: 0.4
		},
		jumpRight:{
			srcIMG: './assets/tmp/AlexJumpR.png',
			framesMAX:2,
			scale: 0.4
		},
		fallLeft:{
			srcIMG: './assets/tmp/AlexFallL.png',
			framesMAX:2,
			scale: 0.4
		},
		fallRight:{
			srcIMG: './assets/tmp/AlexFallR.png',
			framesMAX:2,
			scale: 0.4
		},
		attackLeft:{
			srcIMG: './assets/tmp/AAlexAttack1.png',
			framesMAX: 6,
			scale: 0.07,
			offset:{
				x: -300,
				y: 0
			}

		},
		attackRight:{
			srcIMG: './assets/tmp/AlexAttack1R.png',
			framesMAX: 6,
			scale: 0.07,
			offset:{
				x: 100,
				y: 0
			}

		}
	},
	attackBox: {
		offset: {
			x: -120,
			y: 100
		},
		width: 280,
		height:150
	}})
const enemy = new Fighter({
	position:{
		x:1800,
		y:100
	},
	velocity:{
		x:0, 
		y:0
	},
	offset:{
		x: 0,
		y: 0
	},
	srcIMG: './assets/tmp/AlexIDLEFINAL.png',
	framesMAX: 8,
	scale: 0.7,
	offset : {x:150, y:50},
	sprites:{
		idle:{
			srcIMG: './assets/tmp/AlexIDLEFINAL.png',
			framesMAX:8
		},
		runRight:{
			srcIMG: './assets/tmp/AlexRunR.png',
			framesMAX:8,
			scale: 0.4
		},
		runLeft:{
			srcIMG: './assets/tmp/Alex RunL.png',
			framesMAX:8,
			scale: 0.4
		},
		jumpLeft:{
			srcIMG: './assets/tmp/AlexJumpL.png',
			framesMAX:2,
			scale: 0.4
		},
		jumpRight:{
			srcIMG: './assets/tmp/AlexJumpR.png',
			framesMAX:2,
			scale: 0.4
		},
		fallLeft:{
			srcIMG: './assets/tmp/AlexFallL.png',
			framesMAX:2,
			scale: 0.4
		},
		fallRight:{
			srcIMG: './assets/tmp/AlexFallR.png',
			framesMAX:2,
			scale: 0.4
		},
		attackLeft:{
			srcIMG: './assets/tmp/AAlexAttack1.png',
			framesMAX: 6,
			scale: 0.07,
			
		},
		attackRight:{
			srcIMG: './assets/tmp/AlexAttack1R.png',
			framesMAX: 6,
			scale: 0.07

		}
	},
	attackBox: {
		offset: {
			x: 120,
			y: 100
		},
		width: 280,
		height:150
	}})
const keys = {
		a:{
			pressed: false
		},

		d:{
			pressed: false
		},
		w:{

			pressed: false
		},
		ArrowLeft:{
			pressed: false
		},
		ArrowRight:{
			pressed: false
		},
		ArrowUp:{
			pressed: false
		}}
window.onload = function(){
	prepCanvas()
	renderCanvas()
	
	decreaseTimer()
	animate()
	window.addEventListener('keydown', (event) => //checks for keypresses after each frame
	{
		switch(event.key)
		{
			case 'd':
			 if(player.lastKey != 'd')
				{
					player.attackBox.offset.x *= (-1)
				}
			  keys.d.pressed = true
			  player.lastKey = 'd'
			  break
			case 'a':
			  if(player.lastKey != 'a')
				{
					player.attackBox.offset.x *= (-1)
				}
			  keys.a.pressed = true
			  player.lastKey = 'a' 
			  break
			case 'w':
			   if(player.jumpCount >= 2){
			   	player.velocity.y = 0
			   }else{
			   	player.velocity.y = -20
			   	player.jumpCount+=1
			   }
			  break
			case ' ':
			  player.attack()
			  player.isAttacking = true
			  break    
			case 'ArrowRight':
			  if(enemy.lastKey != 'ArrowRight')
				{
					enemy.attackBox.offset.x *= (-1)
				}
			  keys.ArrowRight.pressed = true
			  enemy.lastKey = 'ArrowRight'
			  break
			case 'ArrowLeft':
			  if(enemy.lastKey != 'ArrowLeft')
				{
					enemy.attackBox.offset.x *= (-1)

				}
			  keys.ArrowLeft.pressed = true
			  enemy.lastKey = 'ArrowLeft'
			  break
			case 'ArrowUp':
			  if(enemy.jumpCount < 2){
					enemy.velocity.y = -22.5
			  }
			  break    
			case 'ArrowDown':
				enemy.attack()
				enemy.isAttacking = true
				break

		}
		
	})
	window.addEventListener('keyup', (event) => //checks for keyups after each frame
	{
		switch(event.key)
		{
			case 'd':
			  keys.d.pressed = false
			  break
			case 'a':
			  keys.a.pressed = false
			  break
			case 'w':
			  keys.w.pressed = false
			  break
		}
		//the enemy keys
		switch(event.key)
		{
			case 'ArrowRight':
			  keys.ArrowRight.pressed = false
			  break
			case 'ArrowLeft':
			  keys.ArrowLeft.pressed = false
			  break
			case 'ArrowUp':
			  keys.ArrowUp.pressed = false
			  enemy.jumpCount+=1
			  break
		}

	})

}








