Sup.loadScene("Level 1/Level 1 Explo");
    const larva = Sup.appendScene("Enemy/p_larve")[0];
    //const larva2 = Sup.appendScene("Enemy/p_larve", Sup.getActor("Player"))[0]
    larva.setPosition(Sup.getActor("Player").getX() + 4, Sup.getActor("Player").getY(), Sup.getActor("Player").getZ())
    //larva2.setPosition(Sup.getActor("Player").getX() + 4, Sup.getActor("Player").getY(), Sup.getActor("Player").getZ())
    Sup.log(larva.getPosition())