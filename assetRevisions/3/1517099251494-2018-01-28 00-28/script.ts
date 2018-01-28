Sup.ArcadePhysics2D.setGravity(0, -0.52);

class PlayerBehavior extends Sup.Behavior {

  speed = 0.2;
  jumpSpeed = 0.30;
  flagjump = 80;
  flagdirect = 0;
  stocktime = 0;
  flagrand = 0;
  hp = 5;
  tabX = [0, 0, 0, 0, 0]    
  tabY = [0, 0, 0, 0, 0]
  
  update() {
    if (this.flagjump < 0)
      this.flagjump = 0    
    let time = Math.round(Date.now() / 1000);
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    // As explained above, we get the current velocity
    let velocity = this.actor.arcadeBody2D.getVelocity();
    //recharge nrj
    if (time - this.stocktime >= 2 && this.flagrand == 1) {
      if (this.flagjump <= 60) this.flagjump += 20;
      else this.flagjump = 80;
      this.flagrand = 0;
    }
    if (this.flagjump < 80 && this.flagrand == 0) {
        this.stocktime = time;
      this.flagrand = 1;
    }
    // We override the `.x` component based on the player's input
    if (Sup.Input.isKeyDown("LEFT")) {
      this.flagdirect = 1;
      velocity.x = -this.speed;
      // When going left, we flip the sprite
      this.actor.spriteRenderer.setHorizontalFlip(true);
    } else if (Sup.Input.isKeyDown("RIGHT")) {
      this.flagdirect = 0;
      velocity.x = this.speed;
      // When going right, we clear the flip
      this.actor.spriteRenderer.setHorizontalFlip(false);
    } else velocity.x = 0;
    // If the player is on the ground and wants to jump,
    // we update the `.y` component accordingly
    let touchBottom = this.actor.arcadeBody2D.getTouches().bottom;
    if (touchBottom) {
      //this.flagjump = 60;
      if (Sup.Input.wasKeyJustPressed("UP")) {
        velocity.y = this.jumpSpeed;
        this.actor.spriteRenderer.setAnimation("Jump");
      } // Dash
      else if (Sup.Input.isKeyDown("A") && this.flagjump >= 20) {
        if (this.flagdirect == 1) velocity.x = -0.60;
        else velocity.x = 0.60;
        this.flagjump--;
        this.actor.spriteRenderer.setAnimation("Roll");    
      } // Attack
      else if (Sup.Input.isKeyDown("E")) {
        this.actor.spriteRenderer.setAnimation("Attack");
        //var bullet = new Sup.Actor("BulletBehavior");
        //Sup.log("là")
        /*const bullet = Sup.appendScene("Bullet/p_bullet")[0];
        bullet.setPosition(this.actor.getPosition());
        Sup.ArcadePhysics2D.collides(bullet.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies())
        let velo = bullet.arcadeBody2D.getVelocity();
        if (this.flagdirect == 0)
            velo.x = 0.4;
        else
            velo.x  = -0.4;
        bullet.arcadeBody2D.setVelocity(velo);*/
      }
      else {
        // Here, we should play either "Idle" or "Run" depending on the horizontal speed
        //a rajouter si probleme en animation (&& this.actor.spriteRenderer.isAnimationPlaying() == false)
        if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Idle");
        else this.actor.spriteRenderer.setAnimation("Run");
      }
    }
    if (this.flagjump > 0) {
      //Dash en l'air
      if (Sup.Input.isKeyDown("A")) {
        if (this.flagdirect == 1) velocity.x = -0.65;
        else velocity.x = 0.65;
        this.flagjump--;
        this.actor.spriteRenderer.setAnimation("Roll");
      }
      // Doublejump
      if (Sup.Input.wasKeyJustPressed("UP")) {
        this.flagjump -= 20;
        velocity.y = 0.45;
        this.actor.spriteRenderer.setAnimation("Jump");
        // Here, we should play either "Jump" or "Fall" depending on the vertical speed
        if (velocity.y >= 0) this.actor.spriteRenderer.setAnimation("Jump");
        else this.actor.spriteRenderer.setAnimation("Fall");
      }
    }
    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
    if (this.flagjump == 80)
      Sup.getActor("Charge").spriteRenderer.setAnimation("Three")
    if (this.flagjump <= 60)
      Sup.getActor("Charge").spriteRenderer.setAnimation("Two")
    if (this.flagjump <= 40)
      Sup.getActor("Charge").spriteRenderer.setAnimation("One")
    if (this.flagjump <= 20)
      Sup.getActor("Charge").spriteRenderer.setAnimation("Zero")
    
  }
    public getHp() : Number {
      return this.hp
    }
}
Sup.registerBehavior(PlayerBehavior);