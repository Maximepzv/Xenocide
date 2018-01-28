class MenuUiBehavior extends Sup.Behavior {
 
  update()
  {
     if (Sup.Input.wasKeyJustPressed("X"))
       {
         Sup.loadScene("Level 1/Level 1 Explo");
       }
  }
}
Sup.registerBehavior(MenuUiBehavior);
