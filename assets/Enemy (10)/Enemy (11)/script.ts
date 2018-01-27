Sup.ArcadePhysics2D.setGravity(0, -0.02);

class EnemyBehavior extends Sup.Behavior {
  speed = 0.2;
  flagdirect = 0;
 
  
   update() {
      Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies())
     
      Sup.log("Player X == " + Sup.getActor("Player").getX())
      Sup.log("Player Y == " + Sup.getActor("Player").getY())
      Sup.log("Enemy X == " + this.actor.getX())
      Sup.log("Enemy Y == " + this.actor.getY())
      if (Sup.getActor("Player").getX() >= this.actor.getX() - 5 && Sup.getActor("Player").getX() <= this.actor.getX() + 5) {
        Sup.log("It's possible to attack")
        this.actor.spriteRenderer.setAnimation("Attack")
      }
      else {
        this.actor.spriteRenderer.setAnimation("Stand")
      }
  }
}

Sup.registerBehavior(EnemyBehavior);