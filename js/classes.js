class Sprite { 
	constructor({position, srcIMG, scale = 1, framesMAX = 1, offset = {x:0, y:0}}) //wrapping allows variables to be entered in any order "{}"
	{
		this.position = position
		this.width = 50
		this.height = 150
		this.image = new Image() 
		this.image.src = srcIMG
		this.scale = scale
		this.framesMAX = framesMAX
		this.frameCurr = 0
		this.frameselap = 0
		this.framesHold = 10
		this.offset = offset

	}

	draw() //Creates Sprite image
	{
		c.drawImage(
			this.image,
			this.frameCurr * (this.image.width / this.framesMAX), //when frameCurr = 0 there is no crop
			0,
			this.image.width / this.framesMAX, 
			this.image.height,
			this.position.x - this.offset.x, 
			this.position.y - this.offset.y, 
			(this.image.width / this.framesMAX) * this.scale, 
			this.image.height * this.scale
		) //"c." calls functions for html canvas
		
	}
	animateFrames(){
		this.frameselap++
		if(this.frameselap % this.framesHold === 0){
			if(this.frameCurr < this.framesMAX-1){
				this.frameCurr++	
			}else{
				this.frameCurr = 0
			}
		}
	}
	update(){
		this.draw()
		this.animateFrames()
		
	}
	bckMOT()
	{

		if(this.position.x === canvas.width){
			this.position.x = -2800
		}else{
			this.position.x+=3 
		}
	}
	
}
class Fighter extends Sprite { 
	constructor({
	position, 
	velocity, 
	color = 'red', 
	srcIMG, scale = 1, 
	framesMAX = 1, 
	offset = {x:0, y:0}, 
	sprites, 
	attackBox = {offset: {}, width: undefined, height: undefined },
	
	}) //wrapping allows variables to be entered in any order "{}"
	{

		super({srcIMG, scale, framesMAX, position, offset})
		this.velocity = velocity
		this.width = 80
		this.height = 300
		this.lastKey
		this.jumpCount = 0
	
		this.attackBox = 
		{
			position: {
				x:this.position.x,
				y:this.position.y
			},
			offset: attackBox.offset, 
			width: attackBox.width,
			height: attackBox.height
		}
		this.color = color
		this.isAttacking
		this.health = 100
		this.frameCurr = 0
		this.frameselap = 0
		this.framesHold = 10
		this.sprites = sprites

		for (const sprite in this.sprites){
			sprites[sprite].image = new Image()
			sprites[sprite].image.src = sprites[sprite].srcIMG
		}
	}

	update(){
		this.draw()
		
		this.animateFrames()
		
		this.attackBox.position.x = this.position.x + this.attackBox.offset.x
		this.attackBox.position.y = this.position.y + this.attackBox.offset.y
		//c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
		//c.fillRect(this.position.x, this.position.y, this.width, this.height)


		
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		//c.fillRect(this.position.x, this.position.y, this.width, this.height)

		if(this.position.x + this.width + this.velocity.x >= canvas.width+200)
		{
			this.velocity.x = 0
		}
		if(this.position.y + this.height + this.velocity.y >= -90){
			this.jumpCount = 0
			this.velocity.y = 0
		}else{
			this.velocity.y += gravity
		}
		
		
	}
	attack(){

		this.isAttacking = true
		if(this.lastKey == 'ArrowLeft' || this.lastKey == 'a' )
		{
			this.switchSprite('attackLeft')
			
		}else if(this.lastKey == 'ArrowRight' || this.lastKey == 'd' )
		{
			this.switchSprite('attackRight')
			
		}
		
	}

	switchSprite(sprite)
	{	
		if(this.image === this.sprites.attackLeft.image 
			&& this.frameCurr < this.sprites.attackLeft.framesMAX-1) 
		{
			return
		}else if(this.image === this.sprites.attackRight.image 
			&& this.frameCurr < this.sprites.attackRight.framesMAX-1)
		{
			return
		}

		switch(sprite)
		{
			case 'idle':
				if(this.image !== this.sprites.idle.image){
					this.image = this.sprites.idle.image
				    this.framesMAX = this.sprites.idle.framesMAX
				    this.frameCurr = 0
				}
			break
			case 'runLeft':
				if(this.image !== this.sprites.runLeft.image)
				{
					this.image = this.sprites.runLeft.image
				    this.framesMAX = this.sprites.runLeft.framesMAX
				    this.frameCurr = 0
				}
			break
			case 'runRight':
				if(this.image !== this.sprites.runRight.image)
				{
					this.image = this.sprites.runRight.image
				    this.framesMAX = this.sprites.runRight.framesMAX
				    this.frameCurr = 0
				}
			break
			case 'jumpLeft':
				if(this.image !== this.sprites.jumpLeft.image)
				{
					this.image = this.sprites.jumpLeft.image
					this.framesMAX = this.sprites.jumpLeft.framesMAX
					this.frameCurr = 0
				}
			break
			case 'jumpRight':
				if(this.image !== this.sprites.jumpRight.image)
				{
					this.image = this.sprites.jumpRight.image
					this.framesMAX = this.sprites.jumpRight.framesMAX
					this.frameCurr = 0
				}
			break
			case 'fallRight':
				if(this.image !== this.sprites.fallRight.image)
				{
					this.image = this.sprites.fallRight.image
					this.framesMAX = this.sprites.fallRight.framesMAX
					this.frameCurr = 0
				}
			break
			case 'fallLeft':
				if(this.image !== this.sprites.fallLeft.image)
				{
					this.image = this.sprites.fallLeft.image
					this.framesMAX = this.sprites.fallLeft.framesMAX
					this.frameCurr = 0
				}
			break
			case 'attackLeft':
				if(this.image !== this.sprites.attackLeft.image)
				{
					this.image = this.sprites.attackLeft.image
					this.framesMAX = this.sprites.attackLeft.framesMAX
					this.frameCurr = 0
				}
			break
			case 'attackRight':
				if(this.image !== this.sprites.attackRight.image)
				{
					this.image = this.sprites.attackRight.image
					this.framesMAX = this.sprites.attackRight.framesMAX
					this.frameCurr = 0
				}
			break
		}
	}
}