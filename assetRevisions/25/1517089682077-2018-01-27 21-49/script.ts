Sup.loadScene("Level 1");
  
    const larva = Sup.appendScene("Enemy/p_larve")[0];
    larva.setPosition(Sup.getActor("Player").getX() + 7, Sup.getActor("Player").getY())
    Sup.log(larva.getPosition())