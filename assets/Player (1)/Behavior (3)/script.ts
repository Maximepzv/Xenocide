Sup.ArcadePhysics2D.setGravity(0, -0.52);

class PlayerBehavior extends Sup.Behavior {

  speed = 0.2;
  jumpSpeed = 0.30;
  flagjump = 80;
  flagdirect = 0;
  stocktime = 0;
  rewindtime = 0;
  saveTime = 0;
  flagrand = 0;
  rewind = 5;
  tTime = 0;
  flagT = 0;
  hp = 5;
  it = 0;
  startLoop = 0;
  tabX = [this.actor.getX(), this.actor.getX(), this.actor.getX(), this.actor.getX(), this.actor.getX()]    
  tabY = [this.actor.getY(), this.actor.getY(), this.actor.getY(), this.actor.getY(), this.actor.getY()]
  loopSound = new Sup.Audio.SoundPlayer("Sound/Loop", 1, {loop: true});
  SoundAfter = new Sup.Audio.SoundPlayer("Sound/After", 1, {loop: true});
  
  update() {
    if (this.flagjump < 0)
      this.flagjump = 0;
    let time = Date.now() / 1000;
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
    if (this.startLoop == 0) {
      this.startLoop = 1;
      this.loopSound.play();
      this.saveTime = time;
      this.it = 0;
    }
    if (time - this.saveTime >= 1) {
      this.tabX[this.it] = this.actor.getX();
      this.tabY[this.it] = this.actor.getY();
      this.it = (this.it + 1) % 5;
      this.saveTime = time;
    }
    //
    if (time - this.tTime >= 0.5 && this.flagT == 1)
      this.flagT = 0;
    // Rewind
    if (time - this.rewindtime >= 5 && this.rewind < 5)
      this.rewind += 1;
    // We override the `.x` component based on the player's input
    //if (Sup.Input.isKeyDown("LEFT") || Sup.Input.getGamepadAxisValue(1, 0) < -0,80) {
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
      else if (Sup.Input.isKeyDown("E") && this.flagT == 0) {
        this.flagT = 1;
        this.tTime = time;
         this.actor.spriteRenderer.setAnimation("Attack");
        //const bullet = Sup.appendScene("Bullet/p_bullet", Sup.getActor("Player"))[0];
        if (this.flagdirect == 0) {
          const bullet = Sup.appendScene("Bullet/p_bullet", Sup.getActor("droite"))[0];
                  bullet.addBehavior(BulletBehavior)

        }
        else {
          const bullet = Sup.appendScene("Bullet/p_bullet", Sup.getActor("gauche"))[0];
                  bullet.addBehavior(BulletBehavior)

        }
        //bullet.setPosition(Sup.getActor("Player").getX(), Sup.getActor("Player").getY(), Sup.getActor("Player").getZ())
        //bullet.setPosition(this.actor.getX(), this.actor.getY(), this.actor.getZ());    
        //bullet.addBehavior(BulletBehavior)
      } else if(Sup.Input.wasKeyJustPressed("Z") && this.rewind == 5) {
          this.rewind = 0;
          Sup.getActor("Rewind").spriteRenderer.setAnimation("Recharge");
          this.rewindtime = time;
          this.actor.spriteRenderer.setAnimation("Rewind_launch");
          let BackX = this.tabX[this.it] - this.actor.getX()
          let BackY = this.tabY[this.it] - this.actor.getY()
          velocity.x = BackX
          velocity.y = BackY
          this.actor.arcadeBody2D.setVelocity(velocity);
        this.actor.spriteRenderer.setAnimation("Rewind_land");
      } else if (Sup.Input.wasKeyJustPressed("S")) {
          if ((this.actor.getX() >= 206 && this.actor.getX() <= 211) && (this.actor.getY() >= 55 && this.actor.getY() <= 59)) {
              this.loopSound.stop();
              this.SoundAfter.play();
              Sup.log("checkpoint here");
          }
      } else {
        // Here, we should play either "Idle" or "Run" depending on the horizontal speed
        //a rajouter si probleme en animation (&& this.actor.spriteRenderer.isAnimationPlaying() == false)
        if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Idle");
        else this.actor.spriteRenderer.setAnimation("Run");
      }
    } else if (this.flagjump > 0) {
      //Dash en l'air
      if (Sup.Input.isKeyDown("A")) {
        if (this.flagdirect == 1) velocity.x = -0.65;
        else velocity.x = 0.65;
        this.flagjump--;
        this.actor.spriteRenderer.setAnimation("Roll");
      } else
      // Doublejump
      if (Sup.Input.wasKeyJustPressed("UP")) {
        this.flagjump -= 20;
        velocity.y = 0.45;
        this.actor.spriteRenderer.setAnimation("DashUp");
      } else  // Here, we should play either "Jump" or "Fall" depending on the vertical speed
        if (velocity.y >= 0) this.actor.spriteRenderer.setAnimation("Jump");
        else this.actor.spriteRenderer.setAnimation("Fall");
    }
    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
    //UI Charge
    if (this.flagjump == 80)
      Sup.getActor("Charge").spriteRenderer.setAnimation("Three")
    if (this.flagjump <= 60)
      Sup.getActor("Charge").spriteRenderer.setAnimation("Two")
    if (this.flagjump <= 40)
      Sup.getActor("Charge").spriteRenderer.setAnimation("One")
    if (this.flagjump <= 20)
      Sup.getActor("Charge").spriteRenderer.setAnimation("Zero")
    //UI Life
    if (this.hp == 5)
      Sup.getActor("Life").spriteRenderer.setAnimation("5points")
    if (this.hp == 4)
      Sup.getActor("Life").spriteRenderer.setAnimation("4points")
    if (this.hp == 3)
      Sup.getActor("Life").spriteRenderer.setAnimation("3points")
    if (this.hp == 2)
      Sup.getActor("Life").spriteRenderer.setAnimation("2points")
    if (this.hp == 1)
      Sup.getActor("Life").spriteRenderer.setAnimation("1point")
     if (this.hp <= 0) {
      Sup.getActor("Life").spriteRenderer.setAnimation("0point")
     }
    //UI Rewind
    if (this.rewind == 5)
      Sup.getActor("Rewind").spriteRenderer.setAnimation("Full");
    }
    public getHp() : Number {
      return this.hp
    }
}
Sup.registerBehavior(PlayerBehavior);