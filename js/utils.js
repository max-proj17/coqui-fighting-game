function rectCol({rect1, rect2}){ //rect1 symbolizes player and rect2 the enemy
	return(
		rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x
		&& rect1.attackBox.position.x <= rect2.position.x + rect2.width
		&& rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y
		&& rect1.attackBox.position.y <= rect2.position.y + rect2.height
		)
}


function determineWinner({player, enemy, timerId})
{
	clearTimeout(timerId) //clear timeout stops the timer
	document.querySelector('#displayText').style.display = 'flex'
	document.querySelector('#displayText').style.fontSize = '60px'
	c.fillStyle = 'rgba(0, 0, 0)' 
	c.fillRect(600, 400, 900, 200)

	if(player.health == enemy.health)
	{
		document.querySelector('#displayText').innerHTML = 'Tie'	

	} else if (player.health > enemy.health)
	{
		document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
	
	}else if (player.health < enemy.health)
	{
		document.querySelector('#displayText').innerHTML = 'Enemy Wins'
	
	}
}
let timer = 60
let timerId

function decreaseTimer()
{
	
	if(timer>0) {
		timerId = setTimeout(decreaseTimer, 1000)
		timer--
		document.querySelector('#timer').style.fontSize = '40px'
		document.querySelector('#timer').innerHTML = timer
	}
	if(timer == 0){
		//determine who won
		determineWinner({player, enemy, timerId})
	}

}
function prepCanvas()
{
	canvas = document.getElementById('canvas') //gets canvas from html file
	c = canvas.getContext('2d')
}
function renderCanvas(){
	canvas.width = 2120
	canvas.height = 1000

	c.fillRect(20, 0, canvas.width, canvas.height) //Creates differentiation from canvas and site background
}


function animate() //recurses infinitely
{

	window.requestAnimationFrame(animate)
	c.fillStyle = 'black'
	c.fillRect(20, 0, canvas.width, canvas.height) //so every frame isn't displayed
	background.update()
	car.bckMOT()
	car.update()
	c.fillStyle = 'rgba(255, 255, 255, 0.15)' //rgb and OPACITY
	c.fillRect(0, 0, canvas.width, canvas.height)
	player.update()
	enemy.update()

	player.velocity.x = 0
	enemy.velocity.x = 0

	
	//movement of player
	if(keys.a.pressed && player.lastKey == 'a' && player.position.x + player.velocity.x >=10)
	{
		player.velocity.x = -10
		player.switchSprite('runLeft')
	}else if(keys.d.pressed && player.lastKey == 'd' && player.position.x + player.velocity.x + player.width <= canvas.width){
		player.switchSprite('runRight')
		player.velocity.x = 10
	}else{
		player.switchSprite('idle')
	}



	//PLAYER: switches to jump animation while in the air
	if(player.velocity.y < 0 && player.position.x + player.velocity.x < player.position.x){
		player.switchSprite('jumpLeft')
	}
	else if(player.velocity.y < 0 && player.position.x + player.velocity.x > player.position.x){
		player.switchSprite('jumpRight')
	}else if(player.velocity.y < 0 ){
		player.switchSprite('fallRight')
	} else if (player.velocity.y > 0 && player.position.x + player.velocity.x > player.position.x){
		player.switchSprite('fallRight')

	}else if(player.velocity.y > 0 && player.position.x + player.velocity.x < player.position.x)
	{
		player.switchSprite('fallLeft')
	}



	//movement of enemy
	if(keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft' && enemy.position.x + enemy.velocity.x >=10)
	{
		enemy.velocity.x = -10
		enemy.switchSprite('runLeft')
	}else if(keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight' && enemy.position.x + enemy.velocity.x + enemy.width <= canvas.width){
		enemy.velocity.x = 10
		enemy.switchSprite('runRight')
	}else{
		enemy.switchSprite('idle')
	}

	//Enemy: switches to jump animation while in the air
	if(enemy.velocity.y < 0 && enemy.position.x + enemy.velocity.x < enemy.position.x){
		enemy.switchSprite('jumpLeft')
	}
	else if(enemy.velocity.y < 0 && enemy.position.x + enemy.velocity.x > enemy.position.x){
		enemy.switchSprite('jumpRight')
	}else if(enemy.velocity.y < 0 ){
		enemy.switchSprite('fallRight')
	} else if (enemy.velocity.y > 0 && enemy.position.x + enemy.velocity.x > enemy.position.x){
		enemy.switchSprite('fallRight')

	}else if(enemy.velocity.y > 0 && enemy.position.x + enemy.velocity.x < enemy.position.x)
	{
		enemy.switchSprite('fallLeft')
	}

	//detect collision
	if(rectCol({rect1: player, rect2: enemy})&& player.isAttacking && player.frameCurr === 4)	
	{

			player.isAttacking = false
			enemy.health -= 20
			//document.querySelector('#enemyHealth').style.width = enemy.health + '%' //communicates with html file to change health bar width
			gsap.to('#enemyHealth', {width: enemy.health + '%'})
			
	}
	if(rectCol({rect1: enemy, rect2: player})&& enemy.isAttacking && enemy.frameCurr === 4)	
	{
			enemy.isAttacking = false
			player.health -= 20
			//document.querySelector('#playerHealth').style.width = player.health + '%'
			gsap.to('#playerHealth', {width: player.health + '%'})
			
	}

	//if player or enemy misses
	if(player.isAttacking && player.frameCurr ===4)
	{
		player.isAttacking = false
	}
	if(enemy.isAttacking && enemy.frameCurr ===4)
	{
		enemy.isAttacking = false
	}

	//end game based on health

	if(enemy.health<=0 || player.health<=0)
	{
		
		determineWinner({player, enemy, timerId})
	}
}