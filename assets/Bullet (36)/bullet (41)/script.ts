class BulletBehavior extends Sup.Behavior {
  starter = 0;
  update() {
    this.actor.arcadeBody2D.setCustomGravity(0, 0)
    if (this.starter == 0) {
      var direction = Sup.getActor("Player").getBehavior(PlayerBehavior).flagdirect
      Sup.log("flag direct  == " + Sup.getActor("Player").getBehavior(PlayerBehavior).flagdirect)
      this.starter = 1;
    }    
    let velocity = this.actor.arcadeBody2D.getVelocity();
    if (direction == 0)
      velocity.x = 0.4
    else
      velocity.x = -0.4
    velocity.y = 0;
    this.actor.arcadeBody2D.setVelocity(velocity);
    //Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, [Sup.getActor("Larva1").arcadeBody2D]);
      if (this.actor.arcadeBody2D.getTouches().bottom
         || this.actor.arcadeBody2D.getTouches().left
         || this.actor.arcadeBody2D.getTouches().right
         || this.actor.arcadeBody2D.getTouches().top) {
          Sup.getActor("Larva1").getBehavior(EnemyBehavior).hp -= 2
          Sup.log("DESTROYY")
          this.actor.destroy();
          this.destroy();
      }
    }
  }

Sup.registerBehavior(BulletBehavior);