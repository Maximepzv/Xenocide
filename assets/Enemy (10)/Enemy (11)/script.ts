Sup.ArcadePhysics2D.setGravity(0, -0.02);

class EnemyBehavior extends Sup.Behavior {
  speed = 0.15;
  jumpSpeed = 0.30;
  flagdirect = 0;
  RangeDetection = 7
  attackDommage = 2
  hp = 5
  startPosX = this.actor.getX();
  StartPosY = this.actor.getY();  
  
   
  
   update() {
    
      Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies())
      let velocity = this.actor.arcadeBody2D.getVelocity()

      if (Sup.getActor("Player").getX() >= this.actor.getX() - this.RangeDetection && Sup.getActor("Player").getX() <= this.actor.getX() + this.RangeDetection
          && Sup.getActor("Player").getY() <= this.actor.getY() + this.RangeDetection) {
          this.actor.spriteRenderer.setAnimation("Attack")

          if (this.actor.getX() < Sup.getActor("Player").getX()) {
            velocity.x = this.speed
            if (Sup.getActor("Player").getX() >= this.actor.getX() - 1 && Sup.getActor("Player").getX() <= this.actor.getX() + 1
            && Sup.getActor("Player").getY() <= this.actor.getY() + 1) {
              this.actor.spriteRenderer.setAnimation("Attack")
              let playerVelocity = Sup.getActor("Player").arcadeBody2D.getVelocity()
            //playerVelocity.x = 4
              Sup.getActor("Player").arcadeBody2D.setVelocity(playerVelocity)
              //this.actor.destroy()
              Sup.getActor("Player").getBehavior(PlayerBehavior).hp -= this.attackDommage
              Sup.getActor("Player").spriteRenderer.setAnimation("Die")
              
            }
          }
        
          if (this.actor.getX() > Sup.getActor("Player").getX()) {
            velocity.x = -this.speed
            if (Sup.getActor("Player").getX() >= this.actor.getX() - 3 && Sup.getActor("Player").getX() <= this.actor.getX() + 3
            && Sup.getActor("Player").getY() <= this.actor.getY() + 3) {
              this.actor.spriteRenderer.setAnimation("Attack")
              let playerVelocity = Sup.getActor("Player").arcadeBody2D.getVelocity()
             // playerVelocity.x = -4
              Sup.getActor("Player").arcadeBody2D.setVelocity(playerVelocity)
              //this.actor.destroy()
              Sup.getActor("Player").getBehavior(PlayerBehavior).hp -= this.attackDommage
              Sup.getActor("Player").spriteRenderer.setAnimation("Die")
            }
          }
        
      }
      else {
            /* Sup.log("StartPosX = " + this.startPosX)
            Sup.log("ActualPosition = " + this.actor.getX())
            if (this.actor.getX() >= this.startPosX + 2) {
              velocity.x = -0.10
            }
            if (this.actor.getX() >= this.startPosX - 2) {
              velocity.x = 0.10
            } */
            velocity.x = 0
            this.actor.spriteRenderer.setAnimation("walk")
      }
     //Sup.log("HP = " + Sup.getActor("Player").getBehavior(PlayerBehavior).hp)
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
  
}

Sup.registerBehavior(EnemyBehavior);