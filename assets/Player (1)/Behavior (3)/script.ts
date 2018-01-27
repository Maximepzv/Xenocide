Sup.ArcadePhysics2D.setGravity(0, -0.02);

class PlayerBehavior extends Sup.Behavior {
  speed = 0.2;
  jumpSpeed = 0.30;
  flagjump = 0;
  flagdirect = 0;
  time = Date.now();

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    // As explained above, we get the current velocity
    let velocity = this.actor.arcadeBody2D.getVelocity();
    Sup.setTimeout;
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
      this.flagjump = 0;
      if (Sup.Input.wasKeyJustPressed("UP")) {
        velocity.y = this.jumpSpeed;
        this.actor.spriteRenderer.setAnimation("Jump");
      } // Dash
      else if (Sup.Input.isKeyDown("A")) {
        if (this.flagdirect == 1) velocity.x = -0.60;
        else velocity.x = 0.60;
        this.actor.spriteRenderer.setAnimation("Roll");    
      } // Attack
      else if (Sup.Input.isKeyDown("E")) {
        this.actor.spriteRenderer.setAnimation("Attack");
      }
      else {
        // Here, we should play either "Idle" or "Run" depending on the horizontal speed
        //a rajouter si probleme en animation (&& this.actor.spriteRenderer.isAnimationPlaying() == false)
        if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Idle");
        else this.actor.spriteRenderer.setAnimation("Run");
      }
    } else {
        //Dash en l'air
        if (this.flagjump < 4)
          if (Sup.Input.isKeyDown("A")) {
            if (this.flagdirect == 1) velocity.x = -0.60;
            else velocity.x = 0.60;
            this.flagjump++;
            this.actor.spriteRenderer.setAnimation("Roll");
        }
      // Doublejump
      if (this.flagjump < 4)
        if (Sup.Input.wasKeyJustPressed("UP")) {
          this.flagjump++;
          velocity.y = 0.45;
          this.actor.spriteRenderer.setAnimation("Jump");
      }
      // Here, we should play either "Jump" or "Fall" depending on the vertical speed
      if (velocity.y >= 0) this.actor.spriteRenderer.setAnimation("Jump");
      else this.actor.spriteRenderer.setAnimation("Fall");
    }
    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBehavior);