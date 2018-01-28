class BulletBehavior extends Sup.Behavior {
  update() { 
    Sup.log("x == " + Sup.getActor("Bullet").getX() + " y == " + Sup.getActor("Bullet").getY())
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    let velocity = this.actor.arcadeBody2D.getVelocity();
    if (Sup.getActor("Player").getBehavior(PlayerBehavior).flagdirect == 0)
      velocity.x = 0.4
    else
      velocity.x = -0.4
    velocity.y = 0.0201;
    this.actor.arcadeBody2D.setVelocity(velocity);
    /*Sup.getAllActors().forEach(a => {
      if (a.arcadeBody2D) {
        
      }
    })*/
    //this.destroy();
  }
}
Sup.registerBehavior(BulletBehavior);
